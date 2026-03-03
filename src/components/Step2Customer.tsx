import React, { useState } from 'react';
import { Vendor } from '../types';
import { Building2, Plus, Search, CheckCircle2 } from 'lucide-react';

interface Step2Props {
  vendors: Vendor[];
  selectedCustomer: Vendor | null;
  isNewCustomer: boolean;
  newCustomerData: Partial<Vendor>;
  onSelectCustomer: (vendor: Vendor) => void;
  onToggleNewCustomer: (isNew: boolean) => void;
  onUpdateNewCustomer: (data: Partial<Vendor>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Customer: React.FC<Step2Props> = ({
  vendors,
  selectedCustomer,
  isNewCustomer,
  newCustomerData,
  onSelectCustomer,
  onToggleNewCustomer,
  onUpdateNewCustomer,
  onNext,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendors = vendors.filter((v) =>
    v.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateNewCustomer({ ...newCustomerData, [name]: value });
  };

  const isFormValid = () => {
    if (!isNewCustomer) return !!selectedCustomer;
    return (
      !!newCustomerData.companyName &&
      !!newCustomerData.taxId &&
      !!newCustomerData.contactPerson &&
      !!newCustomerData.phone
    );
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Select Customer</h2>
        <p className="text-gray-500 mt-2">Choose an existing customer or add a new one.</p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            !isNewCustomer ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onToggleNewCustomer(false)}
        >
          Existing Customer
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            isNewCustomer ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onToggleNewCustomer(true)}
        >
          New Customer
        </button>
      </div>

      {!isNewCustomer ? (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search company name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-3 max-h-[400px] overflow-y-auto">
            {filteredVendors.map((vendor) => (
              <button
                key={vendor.id}
                onClick={() => onSelectCustomer(vendor)}
                className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                  selectedCustomer?.id === vendor.id
                    ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                    : 'border-gray-200 bg-white hover:border-indigo-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedCustomer?.id === vendor.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{vendor.companyName}</h3>
                  <p className="text-sm text-gray-500">Tax ID: {vendor.taxId}</p>
                  <p className="text-xs text-gray-400 mt-1">{vendor.contactPerson}</p>
                </div>
                {selectedCustomer?.id === vendor.id && <CheckCircle2 className="ml-auto text-indigo-600 w-5 h-5" />}
              </button>
            ))}
            {filteredVendors.length === 0 && (
              <div className="text-center py-8 text-gray-400">No customers found.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={newCustomerData.companyName || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tax ID (Unified Business No.) *</label>
            <input
              type="text"
              name="taxId"
              value={newCustomerData.taxId || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="e.g., 12345678"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Contact Person *</label>
            <input
              type="text"
              name="contactPerson"
              value={newCustomerData.contactPerson || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newCustomerData.email || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="contact@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={newCustomerData.phone || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="0912-345-678"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={newCustomerData.address || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="123 Business Rd, City"
            />
          </div>
        </div>
      )}

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
          disabled={!isFormValid()}
          className={`flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-md transition-all ${
            isFormValid()
              ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2Customer;
