import React, { useState, useMemo } from 'react';
import { AgricultureProduct } from '../types';
import { agricultureProducts } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const MyVegetablesSection: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tutti');
  const [selectedProduct, setSelectedProduct] = useState<AgricultureProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const categories = [
    { value: 'tutti', label: 'Tutti' },
    { value: 'solanacee', label: 'Solanacee' },
    { value: 'cucurbitacee', label: 'Cucurbitacee' },
    { value: 'brassicacee', label: 'Brassicacee' },
    { value: 'leguminose', label: 'Leguminose' },
    { value: 'lamiacee', label: 'Erbe Aromatiche' },
    { value: 'cereali', label: 'Cereali' },
    { value: 'funghi', label: 'Funghi' },
  ];

  // Quick category stats
  const categoryStats = [
    {
      label: 'Ortaggi',
      count: agricultureProducts.filter((p) => p.category === 'solanacee' || p.category === 'cucurbitacee' || p.category === 'brassicacee').length,
      categories: ['solanacee', 'cucurbitacee', 'brassicacee'],
    },
    {
      label: 'Leguminose',
      count: agricultureProducts.filter((p) => p.category === 'leguminose').length,
      categories: ['leguminose'],
    },
    {
      label: 'Aromatiche',
      count: agricultureProducts.filter((p) => p.category === 'lamiacee').length,
      categories: ['lamiacee'],
    },
    {
      label: 'Cereali',
      count: agricultureProducts.filter((p) => p.category === 'cereali').length,
      categories: ['cereali'],
    },
  ];

  // Suggestions for autocomplete (max 5)
  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];

    return agricultureProducts
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return agricultureProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.scientificName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'tutti' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleProductClick = (product: AgricultureProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToGarden = (product: AgricultureProduct, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    // TODO: Implementare logica per aggiungere al proprio orto
    console.log('Aggiunto al tuo orto:', product.name);
    alert(`${product.name} aggiunto al tuo orto!`);
  };

  const handleCategoryQuickFilter = (categories: string[]) => {
    if (categories.length === 1) {
      setSelectedCategory(categories[0]);
    } else {
      // Per categorie multiple (come Ortaggi), mostra tutti e poi filtra manualmente
      setSelectedCategory('tutti');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: AgricultureProduct) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSearchFocus = () => {
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  return (
    <section id="my-vegetables" className="py-20 bg-agro-cream">
      <div className="container mx-auto px-4">
        {/* Section Header with Background */}
        <div
          className="text-center mb-12 relative rounded-2xl overflow-hidden"
          style={{
            backgroundImage: 'url(https://drive.google.com/uc?export=view&id=1PJWxEdqwzc3hSujSei6vWqWXCDjyXzQY)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm py-12 px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-agro-green-dark mb-4">
              I Miei Ortaggi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Esplora il nostro database completo di prodotti agricoli. Trova informazioni
              dettagliate su semina, raccolto, consociazioni e molto altro.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca pomodori, basilico, zucchine, lattuga..."
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
                onFocus={handleSearchFocus}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                autoComplete="off"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Autocomplete Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-3 hover:bg-agro-lime hover:bg-opacity-20 transition flex items-center gap-3 ${
                        index === activeSuggestionIndex ? 'bg-agro-lime bg-opacity-20' : ''
                      } ${index === 0 ? 'rounded-t-xl' : ''} ${
                        index === suggestions.length - 1 ? 'rounded-b-xl' : ''
                      }`}
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{suggestion.name}</div>
                        <div className="text-xs text-gray-500 italic">{suggestion.scientificName}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Category Stats - Now as Filter Buttons */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryStats.map((stat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryQuickFilter(stat.categories)}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-95"
            >
              <div className="text-3xl font-bold text-agro-green-dark mb-1">
                {stat.count}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
              <div className="mt-2 text-xs text-agro-green">
                Clicca per filtrare
              </div>
            </button>
          ))}
        </div>

        {/* Category Filters Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  selectedCategory === category.value
                    ? 'bg-agro-green text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length} prodotti trovati
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                onAddToGarden={handleAddToGarden}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nessun prodotto trovato
            </h3>
            <p className="text-gray-500">
              Prova a modificare i filtri o la ricerca
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default MyVegetablesSection;
