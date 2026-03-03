import React, { useEffect, useState } from 'react';
import { QuotationItem } from '../types';
import { calculateTotals, formatCurrency } from '../utils/calculations';
import { Percent, DollarSign, Calculator } from 'lucide-react';

interface Step4Props {
  items: QuotationItem[];
  taxType: 'none' | 'included' | 'added';
  setTaxType: (type: 'none' | 'included' | 'added') => void;
  discountType: 'amount' | 'percentage';
  setDiscountType: (type: 'amount' | 'percentage') => void;
  discountValue: number;
  setDiscountValue: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4Review: React.FC<Step4Props> = ({
  items,
  taxType,
  setTaxType,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  onNext,
  onBack,
}) => {
  const [totals, setTotals] = useState(calculateTotals(items, taxType, discountType, discountValue));

  useEffect(() => {
    setTotals(calculateTotals(items, taxType, discountType, discountValue));
  }, [items, taxType, discountType, discountValue]);

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Review & Adjust</h2>
        <p className="text-gray-500 mt-2">Set tax and discount options.</p>
      </div>

      {/* Tax Settings */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Calculator size={18} className="text-indigo-500" />
          Tax Settings
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setTaxType('none')}
            className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
              taxType === 'none'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            No Tax
          </button>
          <button
            onClick={() => setTaxType('added')}
            className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
              taxType === 'added'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            +5% Tax
          </button>
          <button
            onClick={() => setTaxType('included')}
            className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
              taxType === 'included'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tax Included
          </button>
        </div>
      </div>

      {/* Discount Settings */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Percent size={18} className="text-indigo-500" />
          Discount
        </h3>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setDiscountType('percentage')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                discountType === 'percentage' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              %
            </button>
            <div className="w-px bg-gray-200"></div>
            <button
              onClick={() => setDiscountType('amount')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                discountType === 'amount' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              $
            </button>
          </div>
          <input
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-right font-mono"
            placeholder="0"
          />
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-mono">{formatCurrency(totals.subtotal)}</span>
        </div>
        {totals.discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({discountType === 'percentage' ? `${discountValue}%` : 'Fixed'})</span>
            <span className="font-mono">-{formatCurrency(totals.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax ({taxType === 'added' ? '5%' : taxType === 'included' ? 'Included' : '0%'})</span>
          <span className="font-mono">{formatCurrency(totals.taxAmount)}</span>
        </div>
        <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-indigo-600 font-mono">{formatCurrency(totals.total)}</span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4 items-center justify-between shadow-lg z-20">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all transform hover:-translate-y-0.5"
        >
          Preview PDF
        </button>
      </div>
    </div>
  );
};

export default Step4Review;
