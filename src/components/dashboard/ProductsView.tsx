import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Tag,
  DollarSign,
  Layers,
  Archive
} from 'lucide-react';
import { Product } from '../../types/index.ts';

export const ProductsView: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, activeOrg, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [promotionalPrice, setPromotionalPrice] = useState<number | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState('');
  const [inStock, setInStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState<number>(10);
  const [variationsStr, setVariationsStr] = useState('');

  // Extract unique categories for filter
  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setSku('');
    setCategory(categories[0] || 'Geral');
    setDescription('');
    setPrice(99.00);
    setPromotionalPrice(undefined);
    setImageUrl('/src/assets/images/central_ia_hero_mockup_1793814568875.jpg');
    setInStock(true);
    setStockQuantity(20);
    setVariationsStr('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku || '');
    setCategory(p.category);
    setDescription(p.description);
    setPrice(p.price);
    setPromotionalPrice(p.promotionalPrice);
    setImageUrl(p.imageUrl);
    setInStock(p.inStock);
    setStockQuantity(p.stockQuantity || 0);
    setVariationsStr((p.variations || []).join(', '));
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0) {
      showToast('Por favor, informe o nome do produto e um preço válido.');
      return;
    }

    const variations = variationsStr.split(',').map(v => v.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: name.trim(),
        sku: sku.trim() || undefined,
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        promotionalPrice: promotionalPrice ? Number(promotionalPrice) : undefined,
        imageUrl: imageUrl.trim() || '/src/assets/images/central_ia_hero_mockup_1793814568875.jpg',
        inStock,
        stockQuantity: Number(stockQuantity),
        variations: variations.length > 0 ? variations : undefined
      });
    } else {
      addProduct({
        name: name.trim(),
        sku: sku.trim() || undefined,
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        promotionalPrice: promotionalPrice ? Number(promotionalPrice) : undefined,
        imageUrl: imageUrl.trim() || '/src/assets/images/central_ia_hero_mockup_1793814568875.jpg',
        inStock,
        stockQuantity: Number(stockQuantity),
        active: true,
        variations: variations.length > 0 ? variations : undefined
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (confirm(`Deseja remover "${prodName}" do catálogo?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Catálogo de Produtos e Serviços
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empresa: <span className="font-semibold text-slate-700">{activeOrg.name}</span> · 
            A IA utiliza exclusivamente esses itens para responder clientes e enviar fotos.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Novo Item no Catálogo</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome, SKU ou descrição..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
          />
        </div>

        {/* Categories selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Todas ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-200 text-slate-400 space-y-3">
          <Package className="w-10 h-10 mx-auto text-slate-300" />
          <p className="text-xs font-semibold text-slate-600">Nenhum produto cadastrado nesta categoria</p>
          <p className="text-xs max-w-sm mx-auto">
            Adicione os produtos ou serviços que sua empresa vende para que a inteligência artificial possa apresentá-los com fotos e preços aos clientes.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Cadastrar Primeiro Item</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white/95 text-slate-800 rounded shadow-xs">
                      {p.category}
                    </span>
                  </div>
                  {p.promotionalPrice && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded shadow-xs">
                        Promoção
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {p.name}
                    </h3>
                  </div>

                  {p.sku && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      SKU: {p.sku}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="pt-2 flex items-baseline gap-2">
                    {p.promotionalPrice ? (
                      <>
                        <span className="text-base font-extrabold text-emerald-700 font-display tabular-nums">
                          R$ {p.promotionalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          R$ {p.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-base font-extrabold text-slate-900 font-display tabular-nums">
                        R$ {p.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock and Variations */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      {p.inStock ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Em estoque ({p.stockQuantity || 'disponível'})</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                          <span>Esgotado</span>
                        </>
                      )}
                    </span>
                    {p.variations && (
                      <span className="text-slate-400">{p.variations.length} variações</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Enviável pela IA</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded transition-colors"
                    title="Editar produto"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Remover produto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingProduct ? 'Editar Item do Catálogo' : 'Cadastrar Novo Item no Catálogo'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome do Produto ou Serviço *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex: Troca de Óleo 5W30 com Filtro"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder="Ex: Serviços / Freios"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Código SKU (Opcional)
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                    placeholder="Ex: PRD-001"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preço Oficial (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preço Promocional (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={promotionalPrice ?? ''}
                    onChange={e => setPromotionalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Opcional"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descrição Completa e Benefícios
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Explique para o cliente o que está incluso, prazos e garantia..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL da Foto do Produto
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="/src/assets/images/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantidade em Estoque
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={e => setStockQuantity(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 tabular-nums"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-semibold">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={e => setInStock(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Disponível para Venda</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Variações (Separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={variationsStr}
                  onChange={e => setVariationsStr(e.target.value)}
                  placeholder="Ex: 50ml, 100ml ou Aro 14, Aro 15"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Salvar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
