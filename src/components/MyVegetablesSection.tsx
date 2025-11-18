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

  const categories = [
    { value: 'tutti', label: 'Tutti', icon: '🌱' },
    { value: 'ortaggi', label: 'Ortaggi', icon: '🥬' },
    { value: 'legumi', label: 'Legumi', icon: '🫘' },
    { value: 'erbe-aromatiche', label: 'Erbe Aromatiche', icon: '🌿' },
    { value: 'frutta', label: 'Frutta', icon: '🍓' },
  ];

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

  return (
    <section id="my-vegetables" className="py-20 bg-agro-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-agro-green-dark mb-4">
            I Miei Ortaggi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Esplora il nostro database completo di prodotti agricoli. Trova informazioni
            dettagliate su semina, raccolto, consociazioni e molto altro.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca prodotti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
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
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-xl font-medium transition flex items-center gap-2 ${
                    selectedCategory === category.value
                      ? 'bg-agro-green text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nessun prodotto trovato
            </h3>
            <p className="text-gray-500">
              Prova a modificare i filtri o la ricerca
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-agro-green-dark mb-1">
              {agricultureProducts.filter((p) => p.category === 'ortaggi').length}
            </div>
            <div className="text-gray-600">Ortaggi</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-agro-green-dark mb-1">
              {agricultureProducts.filter((p) => p.category === 'legumi').length}
            </div>
            <div className="text-gray-600">Legumi</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-agro-green-dark mb-1">
              {agricultureProducts.filter((p) => p.category === 'erbe-aromatiche').length}
            </div>
            <div className="text-gray-600">Erbe Aromatiche</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-agro-green-dark mb-1">
              {agricultureProducts.filter((p) => p.category === 'frutta').length}
            </div>
            <div className="text-gray-600">Frutta</div>
          </div>
        </div>
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
