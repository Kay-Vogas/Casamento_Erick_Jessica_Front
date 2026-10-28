import { useState } from "react";
import { Heart } from "lucide-react";
import RSVPModal from "./ModalConfirmacao"; // Importando o modal

const RSVP = () => {
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="rsvp" className="bg-white py-24 px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full flex flex-wrap gap-4 justify-center items-center overflow-hidden font-serif text-4xl text-[#5A642F] whitespace-nowrap">
            {Array(50).fill("J&E  ").join(" ")}
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center justify-center text-center bg-[#F5F0E6] backdrop-blur-md p-5 md:p-8 rounded-2xl border border-white shadow-xl">
          {/* Ícone centralizado */}
          <Heart className="w-12 h-12 text-[#BB6249] mb-6 fill-current opacity-20" />

          {/* Texto principal */}
          <p className="text-lg text-[#5A642F]/80 mb-10 max-w-xl w-full mx-auto leading-relaxed text-center">
            Sua presença é o nosso maior presente. Por favor, confirme se poderá
            comparecer ao nosso casamento até o dia 06 de Fevereiro de 2027.
          </p>

          {/* Botão centralizado */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#BB6249] hover:bg-[#a04e38] text-white px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-[#BB6249]/40 font-medium tracking-wider text-lg uppercase text-center"
          >
            Confirmar Presença Agora
          </button>

          {/* Texto de confirmação */}
          <p className="text-lg text-[#5A642F]/80 mt-6 max-w-xl w-full mx-auto leading-relaxed text-center">
            É obrigatória a confirmação de sua presença até o dia 15 de Dezembro
            de 2026.
          </p>
        </div>
      </section>

      {/* Renderizando o Modal (ele só aparece se isModalOpen for true) */}
      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default RSVP;
