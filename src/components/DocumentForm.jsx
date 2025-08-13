import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Reusable Form Input Component ---
const FormInput = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input id={id} {...props} className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
    </div>
);

// --- The Main Dynamic Form Component ---
export default function DocumentForm({ selectedCategory, onFormSubmit, isLoading }) {
  const [formData, setFormData] = useState({});

  // Reset form when the category changes
  useEffect(() => {
    setFormData({
        effectiveDate: new Date().toISOString().split('T')[0],
    });
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* --- RENTAL FIELDS (Rendered directly) --- */}
      {selectedCategory === 'rental' && (
        <>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Party Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Landlord Name" id="landlordName" onChange={handleChange} placeholder="Enter full legal name" required />
              <FormInput label="Tenant Name" id="tenantName" onChange={handleChange} placeholder="Enter full legal name" required />
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rental Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Property Address" id="propertyAddress" onChange={handleChange} placeholder="Enter full property address" required />
                <FormInput label="Rent Amount ($ per month)" id="rentAmount" type="number" onChange={handleChange} placeholder="e.g., 1500" required />
            </div>
          </div>
        </>
      )}

      {/* --- NDA FIELDS (Rendered directly) --- */}
      {selectedCategory === 'nda' && (
        <>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Party Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Disclosing Party" id="disclosingParty" onChange={handleChange} placeholder="The party sharing information" required />
              <FormInput label="Receiving Party" id="receivingParty" onChange={handleChange} placeholder="The party receiving information" required />
            </div>
          </div>
           <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agreement Details</h3>
            <div>
                <label htmlFor="confidentialInfo" className="block text-sm font-medium text-gray-700 mb-2">Description of Confidential Information</label>
                <textarea id="confidentialInfo" rows="3" onChange={handleChange} className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g., Business plans, customer lists, source code..."></textarea>
            </div>
          </div>
        </>
      )}

      {/* Common Fields */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Details</h3>
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Effective Date" id="effectiveDate" type="date" value={formData.effectiveDate || ''} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-700 mb-2">Additional Terms or Specific Clauses</label>
                <textarea id="additionalTerms" rows="4" onChange={handleChange} className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Enter any specific terms, conditions, or clauses..."></textarea>
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Document'}
        </motion.button>
      </div>
    </form>
  );
}
