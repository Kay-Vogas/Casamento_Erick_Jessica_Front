import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Loader2, ShoppingBag, Gift } from 'lucide-react';
import GlobalStyles from '../components/GlobalStyles';

// Tipagem dos dados que vamos receber da API
interface Produto {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  permalink: string;
}

const ListaPresentes = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar produtos na API pública do Mercado Livre
    const fetchProdutos = async () => {
      try {
        // Buscando "eletroportáteis" (liquidificadores, batedeiras, air fryers)
        const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=eletroportateis&limit=12');
        const data = await response.json();
        
        // Mapeando apenas os dados necessários e melhorando a qualidade da imagem
        const produtosFormatados = data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          // A API retorna um thumbnail pequeno (-I). Trocamos por (-O) para uma imagem maior
          thumbnail: item.thumbnail.replace('-I.jpg', '-O.jpg'), 
          permalink: item.permalink
        }));
        
        setProdutos(produtosFormatados);
      } catch (error) {
        console.error("Erro ao buscar presentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // Formatador de Moeda para o padrão brasileiro
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex flex-col relative">
      <GlobalStyles />
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#9CA88D]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none fixed"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8A96A]/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none fixed"></div>

      {/* Header */}
      <header className="p-6 md:px-12 w-full max-w-6xl mx-auto flex items-center justify-between relative z-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-[#5A642F] hover:text-[#BB6249] transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Voltar ao Convite
        </Link>
        <div className="font-serif text-xl text-[#5A642F] font-semibold tracking-widest flex items-center gap-1">
          J <Heart className="w-3 h-3 text-[#C8A96A] fill-current" /> E
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-6 relative z-10">
        <div className="text-center mb-12">
          <Gift className="w-12 h-12 text-[#C8A96A] mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-[#5A642F] mb-4">Lista de Presentes</h1>
          <p className="text-[#9CA88D] text-lg max-w-2xl mx-auto">
            Sua presença é o nosso maior presente! Mas se desejar nos ajudar a montar o nosso lar, escolha um dos itens abaixo.
          </p>
        </div>

        {loading ? (
          /* Estado de Carregamento */
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#BB6249] animate-spin mb-4" />
            <p className="text-[#5A642F] font-medium animate-pulse">Carregando sugestões de presentes...</p>
          </div>
        ) : (
          /* Grid de Produtos da API */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <div 
                key={produto.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#9CA88D]/20 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Imagem do Produto */}
                <div className="h-48 w-full bg-white p-4 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={produto.thumbnail} 
                    alt={produto.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#5A642F]/0 group-hover:bg-[#5A642F]/5 transition-colors duration-300"></div>
                </div>

                {/* Detalhes do Produto */}
                <div className="p-5 flex flex-col flex-1 border-t border-[#F5F0E6]">
                  <h3 className="text-[#5A642F] font-semibold text-sm line-clamp-2 mb-2 flex-1">
                    {produto.title}
                  </h3>
                  <div className="mt-auto">
                    <p className="text-[#BB6249] font-bold text-xl mb-4">
                      {formatarPreco(produto.price)}
                    </p>
                    
                    {/* O botão redireciona para a página de compra real no Mercado Livre */}
                    <a 
                      href={produto.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#5A642F] hover:bg-[#485025] text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm tracking-wide"
                    >
                      <ShoppingBag size={16} />
                      Presentear
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListaPresentes;