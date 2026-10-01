import React from 'react';
import { Gift, Sparkles } from 'lucide-react';

const ExtraDetails = () => {
  return (
    <section className="py-20 px-6 bg-[#F5F0E6]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card: Dress Code */}
        <div className="bg-white p-10 rounded-[2rem] border border-[#9CA88D]/20 shadow-sm text-center group hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-[#5A642F]/10 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8 text-[#C8A96A]" />
          </div>
          <h3 className="font-serif text-3xl text-[#5A642F] mb-4">Dress Code</h3>
          <p className="text-[#5A642F]/80 leading-relaxed">
            Sugerimos o traje <strong>Passeio Completo</strong> ou <strong>Esporte Fino</strong>. 
            Queremos que você se sinta elegante e confortável para aproveitar cada momento conosco.
            <br/><br/>
            <span className="italic text-sm text-[#BB6249]">
              * Pedimos gentilmente que evitem as cores Branco e Verde Oliva.
            </span>
          </p>
        </div>

        {/* Card: Lista de Presentes */}
        <div className="bg-white p-10 rounded-[2rem] border border-[#9CA88D]/20 shadow-sm text-center group hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-[#5A642F]/10 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Gift className="w-8 h-8 text-[#C8A96A]" />
          </div>
          <h3 className="font-serif text-3xl text-[#5A642F] mb-4">Lista de Presentes</h3>
          <p className="text-[#5A642F]/80 leading-relaxed mb-6">
            Nossa maior alegria é a sua presença! Mas, se desejar nos presentear para ajudar na construção do nosso novo lar, preparamos uma lista com muito carinho.
          </p>
          <button 
            onClick={() => alert("Redirecionaria para o site de presentes (ex: iCasei, Casar.com)")}
            className="inline-block border-2 border-[#BB6249] text-[#BB6249] hover:bg-[#BB6249] hover:text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 uppercase tracking-wide text-sm"
          >
            Ver Lista de Presentes
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExtraDetails;