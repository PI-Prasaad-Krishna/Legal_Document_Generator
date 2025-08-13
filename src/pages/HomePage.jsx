import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentForm from '../components/DocumentForm';
import { generateDocument } from '../services/openrouter.js';
import html2pdf from 'html2pdf.js';

// --- Reusable Icon Components ---
const RentalIcon = () => ( <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> );
const NdaIcon = () => ( <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg> );
const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg> );

// Helper to get display names
const categoryDisplayNames = {
    'rental': 'Rental Agreement',
    'nda': 'Non-Disclosure Agreement',
};

// --- The HomePage Component ---
export default function HomePage() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [finalDocument, setFinalDocument] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowGenerator(true);
    setTimeout(() => {
        document.getElementById('documentGenerator').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    const documentTitle = categoryDisplayNames[selectedCategory];
    
    let detailsString = '';
    for (const [key, value] of Object.entries(formData)) {
        if (value) {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            detailsString += `- ${label}: ${value}\n`;
        }
    }

    const prompt = `
      **TASK:** Generate a complete, formal, and legally comprehensive "${documentTitle}".

      **CONTEXT:** You are an AI legal assistant. Your only goal is to produce a full document, not a summary.

      **CRITICAL INSTRUCTIONS:**
      1.  **USE A FULL TEMPLATE:** You MUST generate a standard, industry-complete template for a "${documentTitle}". This includes all common sections like "Parties," "Term," "Payment," "Governing Law," "Signatures," etc.
      2.  **INSERT DETAILS:** After creating the full template, you MUST insert the following user-provided details into the correct places.
      3.  **DO NOT SUMMARIZE:** Under no circumstances should you summarize the details. You must embed them within the full legal text.
      4.  **OUTPUT HTML ONLY:** The final output must be ONLY the complete document formatted in clean HTML.
      5.  **DO NOT USE SHORTCUTS:** Always generate the full content to be put into the document. STRICTLY do NOT just summarize, the document conetnt should be as proffessional as possible."
      6.  **MAKE SURE TO KEEP IT PROFESSIONAL:** The conetent SHOULD NOT be short like a summary." 
      7.  **MAKE SURE THAT THE BORDER EXISTS:** The content should be within the border wit the proper format with contents fixed from left to right. Never place content randomly at center position."

      **DETAILS TO INSERT:**
      ${detailsString}
    `;

    console.log("Sending structured prompt to AI:", prompt);
    const aiHtmlResponse = await generateDocument(prompt);
    
    setFinalDocument(aiHtmlResponse);
    setIsLoading(false);
    setShowPreview(true);
  };
  
  const handleDownloadPdf = () => {
    const element = document.getElementById('final-document-preview');
    
    // Create a clone to apply styles without affecting the screen view
    const elementToPrint = element.cloneNode(true);
    
    // Add a style tag to the clone to control page breaks
    const style = document.createElement('style');
    style.innerHTML = `
      h1, h2, h3 { page-break-after: avoid; }
      p, ul, ol, div { page-break-inside: avoid; }
    `;
    elementToPrint.appendChild(style);

    const opt = {
      margin:       0.5,
      filename:     `${selectedCategory}_document.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(elementToPrint).set(opt).save();
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Generate Professional Legal Documents</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Create legally compliant documents in minutes with our AI-powered platform.</p>
          <button onClick={() => setShowGenerator(true)} className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg">Start Generating Documents</button>
        </div>
      </section>

      {/* Document Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Document Type</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div onClick={() => handleSelectCategory('rental')} className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all hover:transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4"><RentalIcon /></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Rental Agreements</h3>
                    <p className="text-gray-600">Comprehensive rental and lease agreements for residential and commercial properties.</p>
                </motion.div>
                <motion.div onClick={() => handleSelectCategory('nda')} className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all hover:transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4"><NdaIcon /></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Non-Disclosure Agreements</h3>
                    <p className="text-gray-600">Protect confidential information with comprehensive NDA templates.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Document Generator Form Section */}
      {showGenerator && (
        <section id="documentGenerator" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Generate Your {categoryDisplayNames[selectedCategory] || 'Document'}</h2>
                <p className="text-lg text-gray-600">Fill in the details below to create your customized legal document.</p>
              </div>
              <DocumentForm selectedCategory={selectedCategory} onFormSubmit={handleFormSubmit} isLoading={isLoading} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Document Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">Document Preview</h3>
                  <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600"><CloseIcon /></button>
              </div>
              <div className="p-8 overflow-y-auto">
                  <div id="final-document-preview" className="prose max-w-none" dangerouslySetInnerHTML={{ __html: finalDocument }}></div>
              </div>
              <div className="flex gap-4 p-6 border-t bg-gray-50 justify-end">
                  <button onClick={() => setShowPreview(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Close</button>
                  <button onClick={handleDownloadPdf} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Download PDF</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
