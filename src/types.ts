export interface Vendor {
  id: string;
  companyName: string;
  taxId: string;
  contactPerson: string;
  phone: string;
  email: string;
  address?: string; // Added address for invoice completeness
}

export interface Product {
  id: string;
  name: string;
  specification: string;
  defaultPrice: number;
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface QuotationItem extends Product {
  quantity: number;
  unitPrice: number; // Can be modified from defaultPrice
}

export interface QuotationState {
  salesRepId: string;
  customer: Vendor | null; // If null, user is entering new customer
  isNewCustomer: boolean;
  newCustomerData: Partial<Vendor>;
  items: QuotationItem[];
  taxType: 'none' | 'included' | 'added'; // none, included (already in price), added (5% on top)
  discountType: 'amount' | 'percentage';
  discountValue: number;
}
