import { Vendor, Product, SalesRep } from '../types';

// Fallback to the provided URL if env var is not set.
const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL || 'https://script.google.com/macros/s/AKfycbzbs8Twv0BiAed3z6A2tzyvCDDAXYO4pPefADG1zlpzwgdTAjtdBueRz2lvUJwE_60saw/exec';

export interface AppData {
  vendors: Vendor[];
  products: Product[];
  salesReps: SalesRep[];
}

export const fetchAllData = async (): Promise<AppData | null> => {
  if (!API_URL) {
    console.warn('VITE_GOOGLE_SHEET_API_URL is not set. Using mock data.');
    return null;
  }
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (result.status === 'success') {
      return result.data as AppData;
    }
    throw new Error(result.message || 'Failed to fetch data');
  } catch (error) {
    console.error('Failed to fetch data from Google Sheets:', error);
    return null;
  }
};

export const createVendor = async (vendor: Partial<Vendor>) => {
  if (!API_URL) {
    console.warn('VITE_GOOGLE_SHEET_API_URL is not set. Cannot save vendor.');
    return;
  }
  try {
    // We use text/plain to avoid CORS preflight OPTIONS request which GAS doesn't handle natively
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(vendor),
    });
    
    const result = await response.json();
    if (result.status !== 'success') {
        throw new Error(result.message);
    }
    return result;
  } catch (error) {
    console.error('Failed to create vendor in Google Sheets:', error);
    throw error;
  }
};
