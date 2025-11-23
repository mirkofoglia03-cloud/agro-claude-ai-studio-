import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { agricultureProducts } from '../data/products';
import type { SeedlingEntry, AgricultureProduct } from '../types';

const SeedlingPage: React.FC = () => {
  const [seedlings, setSeedlings] = useState<SeedlingEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AgricultureProduct | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    variety: '',
    sowingDate: new Date().toISOString().split('T')[0],
    quantity: 45,
    containerType: 'Vassoio 45 alveoli (55x55cm)',
    temperature: 20,
    humidity: 70,
    lightHours: 12,
    notes: '',
  });

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];

    return agricultureProducts
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm]);

  const handleProductSelect = (product: AgricultureProduct) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setShowSuggestions(false);
    // Set ideal temperature from product data
    const idealTemp = product.temperatureIdeal.split('-')[0];
    setFormData(prev => ({ ...prev, temperature: parseInt(idealTemp) || 20 }));
  };

  const handleAddSeedling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const newSeedling: SeedlingEntry = {
      id: Date.now().toString(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      variety: formData.variety || selectedProduct.name,
      scientificName: selectedProduct.scientificName,
      image: selectedProduct.image,
      sowingDate: formData.sowingDate,
      quantity: formData.quantity,
      containerType: formData.containerType,
      status: 'semina',
      notes: formData.notes,
      temperature: formData.temperature,
      humidity: formData.humidity,
      lightHours: formData.lightHours,
    };

    setSeedlings([...seedlings, newSeedling]);
    setShowAddForm(false);
    setSelectedProduct(null);
    setSearchTerm('');
    setFormData({
      variety: '',
      sowingDate: new Date().toISOString().split('T')[0],
      quantity: 45,
      containerType: 'Vassoio 45 alveoli (55x55cm)',
      temperature: 20,
      humidity: 70,
      lightHours: 12,
      notes: '',
    });
  };

  const getStatusColor = (status: SeedlingEntry['status']) => {
    switch (status) {
      case 'semina': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'germinazione': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sviluppo': return 'bg-green-100 text-green-800 border-green-200';
      case 'pronto-trapianto': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'trapiantato': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: SeedlingEntry['status']) => {
    const labels = {
      'semina': 'Appena Seminato',
      'germinazione': 'In Germinazione',
      'sviluppo': 'In Sviluppo',
      'pronto-trapianto': 'Pronto al Trapianto',
      'trapiantato': 'Trapiantato',
    };
    return labels[status];
  };

  // Calculate stats
  const stats = {
    total: seedlings.length,
    germinating: seedlings.filter(s => s.status === 'germinazione').length,
    developing: seedlings.filter(s => s.status === 'sviluppo').length,
    readyToTransplant: seedlings.filter(s => s.status === 'pronto-trapianto').length,
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Il Semenzaio</h1>
          <p className="text-gray-600">
            Gestisci le tue semine con controllo professionale di temperatura, umidità e sviluppo delle piantine
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-800">Semine Totali</h3>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
            <p className="text-xs text-blue-600 mt-1">Attive nel semenzaio</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-yellow-800">In Germinazione</h3>
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.germinating}</p>
            <p className="text-xs text-yellow-600 mt-1">Prime foglie</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-800">In Sviluppo</h3>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.developing}</p>
            <p className="text-xs text-green-600 mt-1">Crescita attiva</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-purple-800">Pronti al Trapianto</h3>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.readyToTransplant}</p>
            <p className="text-xs text-purple-600 mt-1">Radici sviluppate</p>
          </div>
        </div>

        {/* Technical Requirements Info Panel */}
        <div className="bg-gradient-to-r from-agro-green/10 to-agro-lime/10 rounded-lg p-6 border border-agro-green/20 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Requisiti Tecnici Semenzaio Professionale
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Temperatura</h4>
              <p className="text-gray-600">18-25°C per la maggior parte degli ortaggi. Evitare sbalzi termici tra giorno e notte.</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Illuminazione</h4>
              <p className="text-gray-600">Posizionare a sud o sud-ovest. Indoor: lampade LED specifiche per orticoltura.</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Substrato</h4>
              <p className="text-gray-600">25% torba nera fine, 75% torbe brune/bionde. pH 5.5-6.5 (mediamente acido).</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Ventilazione</h4>
              <p className="text-gray-600">Essenziale per prevenire muffe. Aprire nelle ore calde quando c'è condensa.</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Irrigazione</h4>
              <p className="text-gray-600">Nebulizzatore o pioggia fine. Mantenere umido ma mai saturo d'acqua.</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Contenitori</h4>
              <p className="text-gray-600">Vassoi alveolari 45-104 celle. Riducono stress da trapianto.</p>
            </div>
          </div>
        </div>

        {/* Add Button */}
        {!showAddForm && (
          <div className="mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto px-6 py-3 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition flex items-center justify-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Aggiungi Nuova Semina
            </button>
          </div>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Nuova Semina</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedProduct(null);
                  setSearchTerm('');
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddSeedling} className="space-y-6">
              {/* Product Selection with Autocomplete */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleziona Prodotto *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Cerca per nome o nome scientifico..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                    required
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductSelect(product)}
                          className="w-full text-left px-4 py-3 hover:bg-agro-lime hover:bg-opacity-20 transition flex items-center gap-3"
                        >
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500 italic">{product.scientificName}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              Temp: {product.temperatureIdeal}°C | Germinazione: {product.germinationDays} giorni
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {selectedProduct && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <div className="font-semibold text-green-900">{selectedProduct.name}</div>
                      <div className="text-sm text-green-700 italic">{selectedProduct.scientificName}</div>
                    </div>
                  </div>
                )}
              </div>

              {selectedProduct && (
                <>
                  {/* Product-specific recommendations */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Suggerimenti per {selectedProduct.name}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                      <div>
                        <span className="font-medium">Temperatura ideale:</span> {selectedProduct.temperatureIdeal}°C
                      </div>
                      <div>
                        <span className="font-medium">Giorni germinazione:</span> {selectedProduct.germinationDays}
                      </div>
                      <div>
                        <span className="font-medium">pH terreno:</span> {selectedProduct.soilPH}
                      </div>
                      <div>
                        <span className="font-medium">Esposizione:</span> {selectedProduct.sunExposure}
                      </div>
                      <div>
                        <span className="font-medium">Profondità semina:</span> {selectedProduct.sowingDepth} cm
                      </div>
                      <div>
                        <span className="font-medium">Fabbisogno idrico:</span> {selectedProduct.waterNeeds}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Variety */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Varietà (opzionale)
                      </label>
                      <input
                        type="text"
                        value={formData.variety}
                        onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                        placeholder={`es. ${selectedProduct.name} Gigante`}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                      />
                    </div>

                    {/* Sowing Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data di Semina *
                      </label>
                      <input
                        type="date"
                        value={formData.sowingDate}
                        onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                        required
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantità (alveoli/contenitori) *
                      </label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                        min="1"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                        required
                      />
                    </div>

                    {/* Container Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo di Contenitore *
                      </label>
                      <select
                        value={formData.containerType}
                        onChange={(e) => setFormData({ ...formData, containerType: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                        required
                      >
                        <option value="Vassoio 45 alveoli (55x55cm)">Vassoio 45 alveoli (55x55cm)</option>
                        <option value="Vassoio 104 alveoli">Vassoio 104 alveoli</option>
                        <option value="Vassoio 160 alveoli">Vassoio 160 alveoli</option>
                        <option value="Vasi 8cm">Vasi 8cm</option>
                        <option value="Vasi 10cm">Vasi 10cm</option>
                        <option value="Contenitori biodegradabili">Contenitori biodegradabili</option>
                      </select>
                    </div>

                    {/* Temperature */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperatura Semenzaio (°C) *
                      </label>
                      <input
                        type="number"
                        value={formData.temperature}
                        onChange={(e) => setFormData({ ...formData, temperature: parseInt(e.target.value) })}
                        min="10"
                        max="35"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Temperatura ideale: {selectedProduct.temperatureIdeal}°C
                      </p>
                    </div>

                    {/* Humidity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Umidità (%) *
                      </label>
                      <input
                        type="number"
                        value={formData.humidity}
                        onChange={(e) => setFormData({ ...formData, humidity: parseInt(e.target.value) })}
                        min="30"
                        max="100"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                        required
                      />
                    </div>

                    {/* Light Hours */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ore di Luce al Giorno *
                      </label>
                      <input
                        type="number"
                        value={formData.lightHours}
                        onChange={(e) => setFormData({ ...formData, lightHours: parseInt(e.target.value) })}
                        min="6"
                        max="18"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note (opzionale)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      placeholder="Aggiungi note sulla semina, trattamenti speciali, ecc..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agro-green focus:outline-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-agro-green text-white px-6 py-3 rounded-lg hover:bg-agro-green/90 transition font-medium"
                    >
                      Aggiungi al Semenzaio
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setSelectedProduct(null);
                        setSearchTerm('');
                      }}
                      className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      Annulla
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}

        {/* Seedlings List */}
        {seedlings.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Semine Attive</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {seedlings.map((seedling) => (
                <div key={seedling.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-agro-green/50 transition">
                  <div className="flex items-start gap-4">
                    <img src={seedling.image} alt={seedling.productName} className="w-20 h-20 object-cover rounded-lg" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{seedling.productName}</h3>
                          <p className="text-sm text-gray-500 italic">{seedling.scientificName}</p>
                          {seedling.variety !== seedling.productName && (
                            <p className="text-sm text-gray-600">{seedling.variety}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(seedling.status)}`}>
                          {getStatusLabel(seedling.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                        <div>
                          <span className="text-gray-600">Seminato:</span>
                          <span className="ml-1 font-medium text-gray-900">
                            {new Date(seedling.sowingDate).toLocaleDateString('it-IT')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantità:</span>
                          <span className="ml-1 font-medium text-gray-900">{seedling.quantity} celle</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Contenitore:</span>
                          <span className="ml-1 font-medium text-gray-900">{seedling.containerType}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Temp:</span>
                          <span className="ml-1 font-medium text-gray-900">{seedling.temperature}°C</span>
                        </div>
                      </div>

                      {seedling.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <span className="font-medium">Note:</span> {seedling.notes}
                        </div>
                      )}

                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 px-3 py-1.5 bg-agro-green/10 text-agro-green rounded text-xs font-medium hover:bg-agro-green/20 transition">
                          Aggiorna Stato
                        </button>
                        <Link
                          to="/my-garden"
                          className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100 transition text-center"
                        >
                          Programma Trapianto
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Semina Attiva</h3>
            <p className="text-gray-600 mb-4">
              Inizia a tracciare le tue semine nel semenzaio per monitorare germinazione e sviluppo
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Aggiungi Prima Semina
            </button>
          </div>
        )}

        {/* Calendar Integration CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Sincronizza con il Calendario</h3>
              <p className="text-blue-100">
                Le date di trapianto vengono automaticamente aggiunte al tuo calendario di coltivazione
              </p>
            </div>
            <Link
              to="/my-garden"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
            >
              Vai al Calendario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedlingPage;
