import React, { useRef, useState } from 'react';
import { SalesRep, Vendor, QuotationItem } from '../types';
import { QuotationPDF } from './QuotationPDF';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import { createVendor } from '../services/api';

interface Step5Props {
  salesRep: SalesRep | null;
  customer: Vendor | null;
  isNewCustomer: boolean;
  items: QuotationItem[];
  taxType: 'none' | 'included' | 'added';
  discountType: 'amount' | 'percentage';
  discountValue: number;
  onBack: () => void;
}

const Step5Preview: React.FC<Step5Props> = ({
  salesRep,
  customer,
  isNewCustomer,
  items,
  taxType,
  discountType,
  discountValue,
  onBack,
}) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleExport = async () => {
    if (!generateRef.current) return;

    setIsGenerating(true);
    
    try {
      // 1. Save new customer if needed
      if (isNewCustomer && customer) {
        // We don't await this to block PDF generation, or maybe we should?
        // Let's await it to ensure data integrity, but catch errors so PDF still generates.
        try {
          await createVendor(customer);
          console.log('New customer saved to Google Sheets');
        } catch (err) {
          console.error('Failed to save customer, but proceeding with PDF:', err);
          // Optional: Show a toast warning
        }
      }

      // 2. Generate PDF
      const element = generateRef.current;
      const opt = {
        margin: 0, // No margin because the component has padding
        filename: `Quotation_${customer?.companyName || 'Draft'}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Preview & Export</h2>
        <p className="text-gray-500 mt-2">Check the details before exporting.</p>
      </div>

      {/* Preview Container - Scaled down for mobile view */}
      <div className="flex justify-center bg-gray-100 p-4 rounded-xl overflow-hidden border border-gray-200">
        <div className="transform scale-[0.4] sm:scale-[0.5] origin-top shadow-lg">
           <QuotationPDF
            ref={pdfRef}
            salesRep={salesRep}
            customer={customer}
            items={items}
            taxType={taxType}
            discountType={discountType}
            discountValue={discountValue}
          />
        </div>
      </div>
      
      {/* Hidden Container for PDF Generation (Full Size) */}
      <div className="absolute top-0 left-[-9999px] w-[210mm]">
        <QuotationPDF
          ref={generateRef}
          salesRep={salesRep}
          customer={customer}
          items={items}
          taxType={taxType}
          discountType={discountType}
          discountValue={discountValue}
        />
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
          onClick={handleExport}
          disabled={isGenerating}
          className={`flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
            isSuccess
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle size={20} />
              Downloaded!
            </>
          ) : (
            <>
              <Download size={20} />
              Export PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step5Preview;
