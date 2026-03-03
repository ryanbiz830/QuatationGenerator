import React from 'react';
import { SalesRep, Vendor, QuotationItem } from '../types';
import { calculateTotals, formatCurrency } from '../utils/calculations';

interface QuotationPDFProps {
  salesRep: SalesRep | null;
  customer: Vendor | null;
  items: QuotationItem[];
  taxType: 'none' | 'included' | 'added';
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

export const QuotationPDF = React.forwardRef<HTMLDivElement, QuotationPDFProps>(
  ({ salesRep, customer, items, taxType, discountType, discountValue }, ref) => {
    const totals = calculateTotals(items, taxType, discountType, discountValue);
    const date = new Date().toLocaleDateString('zh-TW');
    const quotationNo = `Q-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000)}`;

    return (
      <div ref={ref} className="bg-white p-8 max-w-[210mm] mx-auto text-sm leading-relaxed text-gray-800 font-serif">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-lg font-bold text-xl">
                L
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">LOGO</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">Quotation</h1>
            <div className="mt-2 text-gray-600">
              <p>Date: {date}</p>
              <p>Quotation No: {quotationNo}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900">Your Company Name</h2>
            <p className="text-gray-500 text-xs mt-1">123 Creative Blvd, Taipei City</p>
            <p className="text-gray-500 text-xs">Tax ID: 88888888</p>
            <p className="text-gray-500 text-xs">Tel: 02-2345-6789</p>
          </div>
        </div>

        {/* Customer & Sales Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2 border-b border-gray-200 pb-1">Bill To</h3>
            <p className="font-bold text-lg">{customer?.companyName}</p>
            <p>Attn: {customer?.contactPerson}</p>
            <p>Tax ID: {customer?.taxId}</p>
            <p>{customer?.address}</p>
            <p>{customer?.phone}</p>
            <p>{customer?.email}</p>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2 border-b border-gray-200 pb-1">Sales Representative</h3>
            <p className="font-bold text-lg">{salesRep?.name}</p>
            <p>{salesRep?.email}</p>
            <p>{salesRep?.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider text-left">
              <th className="p-3 font-semibold border-b border-gray-300">Description</th>
              <th className="p-3 font-semibold border-b border-gray-300 text-right w-24">Qty</th>
              <th className="p-3 font-semibold border-b border-gray-300 text-right w-32">Unit Price</th>
              <th className="p-3 font-semibold border-b border-gray-300 text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-3 align-top">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-gray-500 text-xs mt-1 whitespace-pre-wrap">{item.specification}</p>
                </td>
                <td className="p-3 text-right align-top font-mono">{item.quantity}</td>
                <td className="p-3 text-right align-top font-mono">{formatCurrency(item.unitPrice)}</td>
                <td className="p-3 text-right align-top font-mono font-medium">{formatCurrency(item.unitPrice * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-mono">{formatCurrency(totals.subtotal)}</span>
            </div>
            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-mono">-{formatCurrency(totals.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Tax ({taxType === 'added' ? '5%' : '0%'})</span>
              <span className="font-mono">{formatCurrency(totals.taxAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-900 border-t-2 border-gray-800 pt-2 mt-2">
              <span>Total</span>
              <span className="font-mono">{formatCurrency(totals.total)}</span>
            </div>
          </div>
        </div>

        {/* Terms & Signature */}
        <div className="grid grid-cols-2 gap-12 mt-auto pt-8 border-t border-gray-200 break-inside-avoid">
          <div>
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2">Terms & Conditions</h4>
            <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
              <li>Quotation is valid for 30 days.</li>
              <li>Payment terms: 50% deposit, 50% upon completion.</li>
              <li>Please sign and return this quotation to confirm.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-8">Customer Acceptance</h4>
            <div className="border-b border-gray-400 h-8 mb-2"></div>
            <p className="text-xs text-gray-500">Signature & Company Stamp</p>
            <div className="flex justify-between mt-4">
              <p className="text-xs text-gray-500">Date:</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

QuotationPDF.displayName = 'QuotationPDF';
