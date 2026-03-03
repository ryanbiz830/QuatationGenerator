import React, { useState } from 'react';
import { Product, QuotationItem } from '../types';
import { Plus, Minus, Trash2, Search, X } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface Step3Props {
  products: Product[];
  items: QuotationItem[];
  onUpdateItems: (items: QuotationItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Items: React.FC<Step3Props> = ({ products, items, onUpdateItems, onNext, onBack }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (product: Product) => {
    const newItem: QuotationItem = {
      ...product,
      quantity: 1,
      unitPrice: product.defaultPrice,
    };
    onUpdateItems([...items, newItem]);
    setIsAdding(false);
    setSearchTerm('');
  };

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...items];
    const item = newItems[index];
    const newQuantity = Math.max(1, item.quantity + delta);
    item.quantity = newQuantity;
    onUpdateItems(newItems);
  };

  const updatePrice = (index: number, newPrice: number) => {
    const newItems = [...items];
    newItems[index].unitPrice = newPrice;
    onUpdateItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdateItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  };

  return (
    <div className="space-y-6 pb-24 relative min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Add Items</h2>
        <p className="text-gray-500 mt-2">Build your quotation by adding products or services.</p>
      </div>

      {/* Item List */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
            <button
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            
            <h3 className="font-semibold text-gray-900 pr-8">{item.name}</h3>
            <p className="text-xs text-gray-500 mt-1 mb-3">{item.specification}</p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="p-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="font-mono font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="p-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">$</span>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updatePrice(index, Number(e.target.value))}
                  className="w-24 px-2 py-1 text-right font-mono font-medium border-b border-gray-300 focus:border-indigo-500 outline-none bg-transparent"
                />
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">Subtotal</span>
              <span className="font-bold text-indigo-600">{formatCurrency(item.unitPrice * item.quantity)}</span>
            </div>
          </div>
        ))}

        {items.length === 0 && !isAdding && (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <p className="text-gray-400">No items added yet.</p>
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-indigo-600 font-medium shadow-sm hover:bg-gray-50"
            >
              Add First Item
            </button>
          </div>
        )}
      </div>

      {/* Add Item Button */}
      {!isAdding && items.length > 0 && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-600 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Another Item
        </button>
      )}

      {/* Add Item Modal/Overlay */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">Select Product</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto p-4 space-y-3 flex-1">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addItem(product)}
                  className="w-full text-left p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">{product.name}</h4>
                    <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{formatCurrency(product.defaultPrice)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.specification}</p>
                </button>
              ))}
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-400">No products found.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4 items-center justify-between shadow-lg z-20">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase font-medium">Total</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(calculateTotal())}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={items.length === 0}
            className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition-all ${
              items.length > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Items;
