import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import RSVPModal from './ModalConfirmacao'; // Importando o modal

const RSVP = () => {
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="rsvp" className="py-24 px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full flex flex-wrap gap-4 justify-center items-center overflow-hidden font-serif text-4xl text-[#5A642F] whitespace-nowrap">
            {Array(50).fill("J&E  ").join(" ")}
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-center bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white shadow-xl">
          <Heart className="w-12 h-12 text-[#BB6249] mx-auto mb-6 fill-current opacity-20 absolute top-10 left-1/2 -translate-x-1/2" />
          
          <h2 className="font-serif text-4xl md:text-5xl text-[#5A642F] mb-6 relative z-10">
            Confirme sua Presença
          </h2>
          
          <p className="text-lg text-[#5A642F]/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Sua presença é o nosso maior presente. Por favor, confirme se poderá comparecer ao nosso casamento até o dia 06 de Janeiro de 2027.
          </p>

          <button 
            onClick={() => setIsModalOpen(true)} // Abre o modal ao clicar
            className="inline-flex items-center gap-2 bg-[#BB6249] hover:bg-[#a04e38] text-white px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-[#BB6249]/40 font-medium tracking-wider text-lg uppercase"
          >
            Confirmar Presença Agora
          </button>
        </div>
      </section>

      {/* Renderizando o Modal (ele só aparece se isModalOpen for true) */}
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default RSVP;