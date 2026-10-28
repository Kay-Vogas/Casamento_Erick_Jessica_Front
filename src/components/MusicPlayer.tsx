import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  /** Arquivo dentro de /public. Ex.: public/musica.mp3 */
  src?: string;
  /** 0 a 1 */
  volume?: number;
}

const STORAGE_KEY = 'musica-pausada';

// localStorage pode lançar erro (aba anônima, bloqueio de cookies)
const lerPausada = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
const salvarPausada = (pausada: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, pausada ? '1' : '0');
  } catch {
    /* sem persistência, tudo bem */
  }
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src = `${import.meta.env.BASE_URL}musica.mp3`,
  volume = 0.4,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // Se a pessoa já pausou a música numa visita anterior, respeita.
    if (lerPausada()) return;

    const tocar = () => audio.play().then(() => true, () => false);

    let removido = false;
    const eventos = ['click', 'touchend', 'keydown'] as const;

    const removerOuvintes = () => {
      if (removido) return;
      removido = true;
      eventos.forEach((e) => document.removeEventListener(e, aoInteragir));
    };

    // Navegadores bloqueiam som automático: a música começa na 1ª interação.
    function aoInteragir(e: Event) {
      // clique no próprio botão é tratado pelo botão
      if (botaoRef.current?.contains(e.target as Node)) return;
      void tocar().then((ok) => {
        if (ok) removerOuvintes();
      });
    }

    // Tenta tocar já ao carregar (funciona se o navegador permitir).
    void tocar().then((ok) => {
      if (!ok) eventos.forEach((e) => document.addEventListener(e, aoInteragir));
    });

    return removerOuvintes;
  }, [volume]);

  const alternar = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => salvarPausada(false), () => {});
    } else {
      audio.pause();
      salvarPausada(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
      />

      <button
        ref={botaoRef}
        type="button"
        onClick={alternar}
        aria-label={tocando ? 'Pausar música' : 'Tocar música'}
        aria-pressed={tocando}
        className={`fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#9CA88D]/40 bg-[#F5F0E6] text-[#5A642F] shadow-lg transition-all duration-300 hover:text-[#BB6249] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] ${
          tocando ? '' : 'motion-safe:animate-pulse'
        }`}
      >
        {tocando ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
    </>
  );
};

export default MusicPlayer;
