import { MapPin, Calendar, Clock } from 'lucide-react';

const EventDetails = () => {
  const details = [
    {
      icon: <Calendar className="w-8 h-8 text-[#C8A96A]" />,
      title: "Data",
      line1: "Sábado, 06 de Fevereiro",
      line2: "Ano de 2027"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#C8A96A]" />,
      title: "Horário",
      line1: "Cerimônia às 16 horas",
      line2: "Chegue com 30 min de antecedência"
    },
    {
      icon: <a href="https://www.google.com/maps/place/Ch%C3%A1cara+Espa%C3%A7o+Pingo+de+Ouro/@-20.7374537,-49.3286176,13z/data=!4m6!3m5!1s0x94bc53f5ca4ddc85:0x26db2d69e37f0f4e!8m2!3d-20.7326397!4d-49.3140805!16s%2Fg%2F11fhssj9jz?entry=ttu&g_ep=EgoyMDI2MDkyOC4wIKXMDSoASAFQAw%3D%3D" target="_blank"><MapPin className="w-8 h-8 text-[#C8A96A]" /></a>,
      title: "Local",
      line1: "Chácara Pingo de Ouro",
      line2: "Vacinação de Talhado até o KM 45"
    }
  ];

  return (
    <section id="local" className="py-24 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#5A642F] mb-4">Quando & Onde</h2>
          <div className="w-24 h-1 bg-[#C8A96A] mx-auto rounded-full"></div>
          <p className="mt-6 text-[#5A642F]/70 max-w-2xl mx-auto text-lg">
            A cerimônia e a recepção acontecerão no mesmo local. Preparamos tudo com muito carinho para receber vocês.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {details.map((detail, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#F5F0E6] border border-[#9CA88D]/20 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-[#9CA88D]/10">
                {detail.icon}
              </div>
              <h3 className="font-serif text-2xl text-[#5A642F] mb-3">{detail.title}</h3>
              <p className="text-[#5A642F]/80 font-medium">{detail.line1}</p>
              <p className="text-[#9CA88D] text-sm mt-1">{detail.line2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;