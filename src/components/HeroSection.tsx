import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#9CA88D]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C8A96A]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* Coluna de Texto */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-[#9CA88D] uppercase tracking-[0.2em] text-sm mb-4 font-semibold">
            Com muita alegria, convidamos
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#5A642F] leading-tight mb-6">
            Jessica <br />
            <span className="text-[#C8A96A] text-4xl md:text-6xl italic">&</span> Erick
          </h1>
          <p className="text-lg md:text-xl text-[#5A642F]/80 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
            Sua presença é o nosso maior presente. Venha celebrar o nosso amor e fazer parte desse dia inesquecível!
          </p>
          <p className="text-lg md:text-xl text-[#5A642F]/80 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
            "Para que todos vejam, e saibam, e considerem, e juntamente entendam que a mão do SENHOR fez isso." (Isaías 41:20)
          </p>
          <a 
            href="#rsvp"
            className="inline-flex items-center gap-2 bg-[#BB6249] hover:bg-[#a04e38] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#BB6249]/30 font-medium tracking-wide"
          >
            Confirmar Presença <ArrowRight size={18} />
          </a>
        </div>

        {/* Coluna da Imagem (Placeholder Arch) */}
        <div className="flex-1 w-full max-w-sm md:max-w-md relative">
          {/* Moldura estilo arco */}
          <div className="relative aspect-[3/4] w-full rounded-t-full rounded-b-3xl overflow-hidden border-8 border-white shadow-2xl">
            <img 
              src="./src/assets/Erick_e_Jessica.jpg" 
              alt="Casal apaixonado" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay sutil para manter contraste */}
            <div className="absolute inset-0 bg-[#5A642F]/10 mix-blend-multiply"></div>
          </div>
          
          {/* Badge flutuante da data */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-[#9CA88D]/20 flex flex-col items-center justify-center w-28 h-28 transform rotate-[-5deg]">
             <span className="text-[#BB6249] font-serif text-3xl font-bold">06</span>
             <span className="text-[#5A642F] text-xs uppercase tracking-widest border-t border-[#9CA88D]/30 pt-1 mt-1 w-full text-center">Fev</span>
             <span className="text-[#5A642F] text-sm font-semibold">2027</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;