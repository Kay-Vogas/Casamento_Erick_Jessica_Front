import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0, horas: 0, minutos: 0, segundos: 0
  });

  useEffect(() => {
    // Data do casamento: 06 de Fevereiro de 2027 às 16:00
    const targetDate = new Date('2027-02-06T16:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Dias', value: timeLeft.dias },
    { label: 'Horas', value: timeLeft.horas },
    { label: 'Minutos', value: timeLeft.minutos },
    { label: 'Segundos', value: timeLeft.segundos },
  ];

  return (
    <section className="py-12  text-[#5A642F]  relative ">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="font-serif text-2xl md:text-3xl italic mb-8 text-[#C8A96A]">
          Contagem Regressiva para o Sim
        </h3>
        
        <div className="flex justify-center gap-4 md:gap-8">
          {timeBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-[#F5F0E6]/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-[#9CA88D]/30 shadow-inner mb-2">
                <span className="font-serif text-3xl md:text-5xl font-bold tracking-wider">
                  {block.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#9CA88D] font-semibold">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;