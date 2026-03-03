import { Vendor, Product, SalesRep } from '../types';

export const mockSalesReps: SalesRep[] = [
  { id: 'rep-001', name: 'Alice Chen', email: 'alice.chen@marketing.com', phone: '0912-345-678' },
  { id: 'rep-002', name: 'Bob Lin', email: 'bob.lin@marketing.com', phone: '0922-333-444' },
  { id: 'rep-003', name: 'Charlie Wu', email: 'charlie.wu@marketing.com', phone: '0933-555-666' },
  { id: 'rep-004', name: 'Diana Yang', email: 'diana.yang@marketing.com', phone: '0944-777-888' },
  { id: 'rep-005', name: 'Evan Liu', email: 'evan.liu@marketing.com', phone: '0955-999-000' },
];

export const mockVendors: Vendor[] = [
  {
    id: 'v-001',
    companyName: 'TechCorp Solutions',
    taxId: '12345678',
    contactPerson: 'John Doe',
    phone: '02-2345-6789',
    email: 'contact@techcorp.com',
    address: '123 Tech Blvd, Taipei',
  },
  {
    id: 'v-002',
    companyName: 'GreenLeaf Design',
    taxId: '87654321',
    contactPerson: 'Jane Smith',
    phone: '04-1234-5678',
    email: 'jane@greenleaf.com',
    address: '456 Eco Rd, Taichung',
  },
  {
    id: 'v-003',
    companyName: 'BlueSky Media',
    taxId: '11223344',
    contactPerson: 'Mike Johnson',
    phone: '07-9876-5432',
    email: 'mike@bluesky.com',
    address: '789 Sky Ave, Kaohsiung',
  },
  {
    id: 'v-004',
    companyName: 'Quantum Analytics',
    taxId: '55667788',
    contactPerson: 'Sarah Lee',
    phone: '02-8765-4321',
    email: 'sarah@quantum.com',
    address: '101 Data St, Taipei',
  },
  {
    id: 'v-005',
    companyName: 'Urban Coffee Roasters',
    taxId: '99887766',
    contactPerson: 'Tom Wang',
    phone: '06-2222-3333',
    email: 'tom@urbancoffee.com',
    address: '55 Bean Ln, Tainan',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'p-001',
    name: 'Social Media Management',
    specification: 'FB + IG content creation, 8 posts/month',
    defaultPrice: 25000,
  },
  {
    id: 'p-002',
    name: 'SEO Optimization',
    specification: 'Keyword research, on-page optimization',
    defaultPrice: 15000,
  },
  {
    id: 'p-003',
    name: 'Google Ads Setup',
    specification: 'Account setup, campaign structure',
    defaultPrice: 10000,
  },
  {
    id: 'p-004',
    name: 'Landing Page Design',
    specification: 'Responsive design, up to 5 sections',
    defaultPrice: 35000,
  },
  {
    id: 'p-005',
    name: 'Video Production',
    specification: '1 min scripting, shooting, editing',
    defaultPrice: 50000,
  },
];
