const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efeito para mudar o fundo do menu ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Casamento', href: '#hero' },
    { name: 'Local & Data', href: '#local' },
    { name: 'Confirmar Presença', href: '#rsvp' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F5F0E6]/95 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        <a href="#hero" className="font-serif text-2xl text-[#5A642F] font-semibold tracking-wider flex items-center gap-1">
          J <Heart className="w-4 h-4 text-[#C8A96A] fill-current" /> E
        </a>

        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${link.name === 'Confirmar Presença' ? 'text-[#BB6249] hover:text-[#9e523d] font-bold' : 'text-[#5A642F] hover:text-[#9CA88D]'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        
        <button 
          className="md:hidden text-[#5A642F]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F5F0E6] shadow-lg py-6 px-6 flex flex-col gap-4 border-t border-[#9CA88D]/30">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[#5A642F] text-lg font-serif border-b border-[#9CA88D]/20 pb-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
