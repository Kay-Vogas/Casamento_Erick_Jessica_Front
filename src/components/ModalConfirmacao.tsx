import React, { useState } from 'react';
import { X, Loader2, CheckCircle, Gift } from 'lucide-react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {

  const [tokenConfirmacao , setTokenConfirmacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // SIMULAÇÃO DE REQUISIÇÃO API (Substitua pelo seu fetch real no futuro)
      /* 
      await fetch('https://sua-api.com/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone })
      });
      */
      
      // Simulando o tempo de resposta do servidor (1.5 segundos)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsLoading(false);
      setIsSuccess(true);

      // Aguarda 2 segundos para o usuário ler a mensagem de sucesso e redireciona
      setTimeout(() => {
        // Redirecionamento para a lista de presentes (pode ser link externo ou interno)
        // Exemplo interno se usar React Router: navigate('/lista-presentes')
        // Exemplo externo:
        window.location.href = 'https://lista-casamento-exemplo.com.br'; 
      }, 2000);

    } catch (error) {
      console.error("Erro ao confirmar presença", error);
      setIsLoading(false);
      alert("Ocorreu um erro ao confirmar. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#5A642F]/40 backdrop-blur-sm transition-opacity">
      {/* Caixa do Modal */}
      <div className="bg-[#F5F0E6] rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-fade-in-up border border-[#9CA88D]/30">
        
        {/* Botão de Fechar */}
        {!isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-[#9CA88D] hover:text-[#BB6249] transition-colors"
          >
            <X size={24} />
          </button>
        )}

        {isSuccess ? (
          /* TELA DE SUCESSO */
          <div className="text-center py-8">
            <CheckCircle className="w-20 h-20 text-[#5A642F] mx-auto mb-6 animate-bounce" />
            <h3 className="font-serif text-3xl text-[#5A642F] mb-3">Presença Confirmada!</h3>
            <p className="text-[#5A642F]/80 mb-6">
              Que alegria ter você conosco neste dia especial.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#BB6249] font-medium animate-pulse">
              <Gift size={20} />
              <span>Redirecionando para a lista de presentes...</span>
            </div>
          </div>
        ) : (
          /* TELA DO FORMULÁRIO */
          <>
            <h3 className="font-serif text-3xl text-[#5A642F] mb-2 pr-8">Confirme sua presença</h3>
            <p className="text-[#9CA88D] text-sm mb-6">
              Preencha os dados abaixo para confirmar.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-[#5A642F] mb-1">Insira o Código de Confirmação: </label>
                <input 
                  type="text" 
                  required
                  value={tokenConfirmacao}
                  onChange={(e) => setTokenConfirmacao(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#9CA88D]/40 bg-white text-[#5A642F] focus:outline-none focus:ring-2 focus:ring-[#C8A96A] transition-shadow"
                  placeholder="Ex: 1234"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-[#BB6249] hover:bg-[#a04e38] text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#BB6249]/30 font-bold uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
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