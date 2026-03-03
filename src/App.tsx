import React, { useState, useEffect } from 'react';
import { SalesRep, Vendor, QuotationItem } from './types';
import { mockSalesReps, mockVendors, mockProducts } from './data/mockData';
import { fetchAllData } from './services/api';
import Step1SalesRep from './components/Step1SalesRep';
import Step2Customer from './components/Step2Customer';
import Step3Items from './components/Step3Items';
import Step4Review from './components/Step4Review';
import Step5Preview from './components/Step5Preview';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Data State
  const [salesReps, setSalesReps] = useState<SalesRep[]>(mockSalesReps);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [products, setProducts] = useState(mockProducts);

  // Quotation State
  const [salesRep, setSalesRep] = useState<SalesRep | null>(null);
  const [customer, setCustomer] = useState<Vendor | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState<Partial<Vendor>>({});
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [taxType, setTaxType] = useState<'none' | 'included' | 'added'>('added');
  const [discountType, setDiscountType] = useState<'amount' | 'percentage'>('percentage');
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchAllData();
      if (data) {
        setSalesReps(data.salesReps);
        setVendors(data.vendors);
        setProducts(data.products); // Note: You might need to update the Product type if GAS returns slightly different structure, but we aligned them.
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1SalesRep
            salesReps={salesReps}
            selectedRep={salesRep}
            onSelect={(rep) => {
              setSalesRep(rep);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <Step2Customer
            vendors={vendors}
            selectedCustomer={customer}
            isNewCustomer={isNewCustomer}
            newCustomerData={newCustomerData}
            onSelectCustomer={(vendor) => {
              setCustomer(vendor);
              setIsNewCustomer(false);
            }}
            onToggleNewCustomer={(isNew) => {
              setIsNewCustomer(isNew);
              if (isNew) {
                setCustomer(null);
              }
            }}
            onUpdateNewCustomer={(data) => setNewCustomerData(data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3Items
            products={products}
            items={items}
            onUpdateItems={setItems}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4Review
            items={items}
            taxType={taxType}
            setTaxType={setTaxType}
            discountType={discountType}
            setDiscountType={setDiscountType}
            discountValue={discountValue}
            setDiscountValue={setDiscountValue}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5Preview
            salesRep={salesRep}
            customer={isNewCustomer ? (newCustomerData as Vendor) : customer}
            isNewCustomer={isNewCustomer}
            items={items}
            taxType={taxType}
            discountType={discountType}
            discountValue={discountValue}
            onBack={prevStep}
          />
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-indigo-600">Quotation Generator</h1>
          <div className="text-sm text-gray-500">Step {currentStep} of 5</div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 w-full">
          <div
            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
