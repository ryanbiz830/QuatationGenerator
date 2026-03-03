import React from 'react';
import { SalesRep } from '../types';
import { User, ChevronRight } from 'lucide-react';

interface Step1Props {
  salesReps: SalesRep[];
  selectedRep: SalesRep | null;
  onSelect: (rep: SalesRep) => void;
}

const Step1SalesRep: React.FC<Step1Props> = ({ salesReps, selectedRep, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Who are you?</h2>
        <p className="text-gray-500 mt-2">Select your profile to continue.</p>
      </div>

      <div className="grid gap-4">
        {salesReps.map((rep) => (
          <button
            key={rep.id}
            onClick={() => onSelect(rep)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              selectedRep?.id === rep.id
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${selectedRep?.id === rep.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                <User size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{rep.name}</h3>
                <p className="text-sm text-gray-500">{rep.email}</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 ${selectedRep?.id === rep.id ? 'text-indigo-500' : 'text-gray-300'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1SalesRep;
