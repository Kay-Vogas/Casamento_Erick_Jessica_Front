import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Loader2,
  CheckCircle,
  Gift,
  AlertCircle,
  Heart,
  ArrowRight,
  Users,
} from 'lucide-react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Candidato {
  nome: string;
  familia: string;
}

interface ErroConfirmacao {
  titulo: string;
  mensagem: string;
}

interface RespostaConfirmacao {
  convidado: { nome: string };
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';
const LISTA_PRESENTES_URL =
  'https://sites.icasei.com.br/erickejessica/pages/38963028';
const REDIRECT_DELAY_MS = 3000;
const REQUEST_TIMEOUT_MS = 15000;

// Erro de resposta da API (status HTTP + detalhes opcionais)
class ApiError extends Error {
  status: number;
  details?: { candidatos?: Candidato[] };

  constructor(message: string, status: number, details?: ApiError['details']) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nomeConfirmado, setNomeConfirmado] = useState<string | null>(null);
  const [erro, setErro] = useState<ErroConfirmacao | null>(null);
  // Preenchido quando existe mais de um convidado com o mesmo nome
  const [candidatos, setCandidatos] = useState<Candidato[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const isSuccess = nomeConfirmado !== null;

  const handleClose = () => {
    if (isSuccess) return; // já está redirecionando
    setErro(null);
    setCandidatos(null);
    onClose();
  };

  // Ao abrir, começa sempre do zero
  useEffect(() => {
    if (!isOpen) return;
    setNome('');
    setIsLoading(false);
    setNomeConfirmado(null);
    setErro(null);
    setCandidatos(null);
  }, [isOpen]);

  // Trava a rolagem da página e fecha com Esc enquanto o modal está aberto
  useEffect(() => {
    if (!isOpen) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isSuccess, onClose]);

  // Foca no campo do nome sempre que o formulário aparece
  useEffect(() => {
    if (isOpen && !erro && !nomeConfirmado && !candidatos) {
      inputRef.current?.focus();
    }
  }, [isOpen, erro, nomeConfirmado, candidatos]);

  // Evita redirecionar depois de desmontar
  useEffect(() => {
  return () => {
    if (redirectTimer.current !== null) {
      clearTimeout(redirectTimer.current);
    }
  };
  }, []);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  const confirmar = async (nomeConvidado: string, familia?: string) => {
    setIsLoading(true);
    setErro(null);
    setCandidatos(null);

    try {
      const response = await fetch(`${API_URL}/convidados/confirmar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeConvidado, familia }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(
          body.message ?? 'Erro ao confirmar.',
          response.status,
          body.details,
        );
      }

      const data: RespostaConfirmacao = await response.json();

      setIsLoading(false);
      setNomeConfirmado(data.convidado.nome);

      redirectTimer.current = setTimeout(() => {
        window.location.href = LISTA_PRESENTES_URL;
      }, REDIRECT_DELAY_MS);
    } catch (error) {
      console.error('Erro ao confirmar presença', error);
      setIsLoading(false);

      // Mais de um convidado com o mesmo nome: a pessoa escolhe a família
      if (
        error instanceof ApiError &&
        error.status === 409 &&
        error.details?.candidatos?.length
      ) {
        setCandidatos(error.details.candidatos);
        return;
      }

      if (error instanceof ApiError && error.status === 404) {
        setErro({
          titulo: 'Nome não encontrado',
          mensagem:
            'Não encontramos esse nome na lista de convidados. Digite seu nome completo, exatamente como está no convite.',
        });
        return;
      }

      if (error instanceof ApiError && error.status === 400) {
        setErro({
          titulo: 'Confira o nome',
          mensagem: 'Digite seu nome completo para confirmar a presença.',
        });
        return;
      }

      // fetch lança TypeError sem conexão; o timeout lança TimeoutError
      const semConexao =
        error instanceof TypeError ||
        (error instanceof DOMException && error.name === 'TimeoutError');

      if (semConexao) {
        setErro({
          titulo: 'Sem conexão',
          mensagem:
            'Não conseguimos falar com o servidor. Verifique sua internet e tente novamente.',
        });
        return;
      }

      setErro({
        titulo: 'Não foi possível confirmar',
        mensagem:
          error instanceof Error && error.message
            ? error.message
            : 'Ocorreu um erro ao confirmar. Tente novamente.',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nomeLimpo = nome.trim();
    if (isLoading || nomeLimpo.length < 2) return;
    void confirmar(nomeLimpo);
  };

  const primeiroNome = nomeConfirmado?.trim().split(/\s+/)[0];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#5A642F]/40 backdrop-blur-sm transition-opacity"
      onMouseDown={(e) => {
        // clique no fundo escurecido fecha (se não estiver enviando)
        if (e.target === e.currentTarget && !isLoading) handleClose();
      }}
    >
      {/* Caixa do Modal */}
      <div
        role={erro ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby="rsvp-titulo"
        className="bg-[#F5F0E6] rounded-3xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl animate-fade-in-up border border-[#9CA88D]/30 max-h-[calc(100dvh-2rem)] overflow-y-auto"
      >
        {/* Botão de Fechar */}
        {!isSuccess && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 rounded-full p-1 text-[#9CA88D] hover:text-[#BB6249] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] transition-colors"
          >
            <X size={24} />
          </button>
        )}

        {isSuccess ? (
          /* TELA DE SUCESSO */
          <div className="text-center py-6" aria-live="polite">
            <CheckCircle className="w-20 h-20 text-[#5A642F] mx-auto mb-6 motion-safe:animate-bounce" />
            <h3
              id="rsvp-titulo"
              className="font-serif text-3xl text-[#5A642F] mb-3"
            >
              Presença Confirmada!
            </h3>
            <p className="text-[#5A642F]/80 mb-6">
              Que alegria ter você conosco, {primeiroNome}, neste dia especial.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#BB6249] font-medium motion-safe:animate-pulse mb-4">
              <Gift size={20} />
              <span>Redirecionando para a lista de presentes...</span>
            </div>
            <a
              href={LISTA_PRESENTES_URL}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#5A642F] underline underline-offset-4 hover:text-[#BB6249] transition-colors"
            >
              Ir agora
              <ArrowRight size={16} />
            </a>
          </div>
        ) : erro ? (
          /* TELA DE ERRO */
          <div className="text-center py-4" aria-live="assertive">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#BB6249]/10">
              <AlertCircle className="w-12 h-12 text-[#BB6249]" />
            </div>
            <h3
              id="rsvp-titulo"
              className="font-serif text-3xl text-[#5A642F] mb-3 px-6"
            >
              {erro.titulo}
            </h3>
            <p className="text-[#5A642F]/80 mb-8">{erro.mensagem}</p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                autoFocus
                onClick={() => setErro(null)}
                className="w-full bg-[#BB6249] hover:bg-[#a04e38] text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#BB6249]/30 font-bold uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6]"
              >
                Tentar novamente
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full px-6 py-3 rounded-xl border border-[#9CA88D]/60 text-[#5A642F] hover:bg-[#9CA88D]/10 transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : candidatos ? (
          /* TELA: MAIS DE UM CONVIDADO COM O MESMO NOME */
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A96A]/20">
              <Users className="w-6 h-6 text-[#BB6249]" />
            </div>
            <h3
              id="rsvp-titulo"
              className="font-serif text-3xl text-[#5A642F] mb-2 pr-8"
            >
              Qual é a sua família?
            </h3>
            <p className="text-[#5A642F]/70 text-sm mb-6">
              Encontramos mais de um convidado com esse nome. Escolha o seu para
              confirmar.
            </p>

            <div className="flex flex-col gap-3">
              {candidatos.map((c) => (
                <button
                  key={`${c.nome}-${c.familia}`}
                  type="button"
                  disabled={isLoading}
                  onClick={() => void confirmar(c.nome, c.familia)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-[#9CA88D]/40 bg-white text-[#5A642F] hover:border-[#BB6249] hover:bg-[#BB6249]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] disabled:opacity-60"
                >
                  <span className="block font-bold">{c.nome}</span>
                  <span className="block text-sm text-[#5A642F]/70">
                    Família {c.familia}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCandidatos(null)}
              className="mt-4 w-full px-6 py-3 rounded-xl border border-[#9CA88D]/60 text-[#5A642F] hover:bg-[#9CA88D]/10 transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
            >
              Voltar
            </button>
          </>
        ) : (
          /* TELA DO FORMULÁRIO */
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A96A]/20">
              <Heart className="w-6 h-6 text-[#BB6249]" />
            </div>
            <h3
              id="rsvp-titulo"
              className="font-serif text-3xl text-[#5A642F] mb-2 pr-8"
            >
              Confirme sua presença
            </h3>
            <p className="text-[#5A642F]/70 text-sm mb-6">
              Digite seu nome completo, como está no convite.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="rsvp-nome"
                  className="block text-sm font-bold text-[#5A642F] mb-2"
                >
                  Nome completo
                </label>
                <input
                  id="rsvp-nome"
                  ref={inputRef}
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  autoCapitalize="words"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#9CA88D]/40 bg-white text-[#5A642F] placeholder:text-[#9CA88D]/70 focus:outline-none focus:ring-2 focus:ring-[#C8A96A] transition-shadow"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || nome.trim().length < 2}
                className="mt-2 flex items-center justify-center gap-2 w-full bg-[#BB6249] hover:bg-[#a04e38] text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#BB6249]/30 font-bold uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  'Confirmar Presença'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RSVPModal;
