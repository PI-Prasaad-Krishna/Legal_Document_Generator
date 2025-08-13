import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2pdf from 'html2pdf.js';
import { generateDocument } from '../services/openrouter.js';

// --- Reusable Icon Components ---
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.976.634h6.282a.75.75 0 000-1.5H4.674L3.26 2.44a.75.75 0 00-.155-.15l-.001-.001z" /><path d="M5.056 11.693c-.084.292.06.601.33.765l3.235 1.84a.75.75 0 00.976-.634L10.9 7.854a.75.75 0 00-1.22-.66L5.056 11.693z" /></svg>
);
const ScalesOfJusticeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-16.5 0c-1.01.143-2.01.317-3 .52m0 0a2.25 2.25 0 00-2.25 2.25v9.75c0 1.243 1.007 2.25 2.25 2.25h13.5c1.243 0 2.25-1.007 2.25-2.25v-9.75a2.25 2.25 0 00-2.25-2.25h-4.5m-7.5 0h7.5" /></svg>
);


// --- Page Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};


// --- The HomePage Component ---
export default function HomePage() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'I am your AI Legal Assistant. How can I help you today?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [documentContent, setDocumentContent] = useState(
    '<p class="text-slate-500">Your generated document will appear here...</p>'
  );
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage = { from: 'user', text: newMessage };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = newMessage;
    setNewMessage('');
    setIsLoading(true);

    // Call the actual AI service
    const rawResponse = await generateDocument(currentInput);
    
    const cleanedResponse = rawResponse.split("<!-- END_OF_DOCUMENT -->")[0];
    
    setDocumentContent(cleanedResponse);
    
    const aiChatMessage = { from: 'ai', text: "I've generated a draft for you based on your request. Please review it in the preview panel." };
    setMessages(prev => [...prev, aiChatMessage]);
    setIsLoading(false);
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById('document-preview');
    
    // --- UPDATED PDF OPTIONS AND STYLING ---
    // Create a clone of the element to apply styles without affecting the screen view
    const elementToPrint = element.cloneNode(true);
    
    // Add a style tag to the clone to control page breaks
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        h1, h2, h3 { page-break-after: avoid; }
        p, ul, ol { page-break-inside: avoid; }
      }
    `;
    elementToPrint.appendChild(style);

    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right
      filename:     'legal_document.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(elementToPrint).set(opt).save();
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-slate-50">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
        >
            <ScalesOfJusticeIcon className="mx-auto" />
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mt-4">Legal Documents, Made Easy</h1>
            <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
                Leverage the power of AI to create fast, precise, and cost-effective legal documents. Our cutting-edge technology is designed to create bespoke legal documents quickly.
            </p>
        </motion.div>
      </section>

      {/* Generator Section */}
      <section className="flex flex-col md:flex-row h-[calc(100vh-80px)] max-h-[900px] border-t border-slate-200">
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white border-r border-slate-200 h-1/2 md:h-full">
            <div className="p-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold">Chat Assistant</h2>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div 
                            key={index} layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                            className={`flex mb-4 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg shadow-sm ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-slate-200 shadow-sm"><span className="animate-pulse">AI is typing...</span></div></div>}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200">
                <form onSubmit={handleSendMessage} className="flex items-center">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Describe the document you need..." className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" disabled={isLoading}/>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="ml-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400" disabled={isLoading}><SendIcon /></motion.button>
                </form>
            </div>
        </div>

        {/* Document Preview */}
        <div className="w-full md:w-1/2 flex flex-col bg-slate-100 h-1/2 md:h-full">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Document Preview</h2>
                <motion.button onClick={handleDownloadPdf} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm">Download as PDF</motion.button>
            </div>
            <div className="flex-1 p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div 
                        id="document-preview"
                        key={documentContent}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-md prose max-w-none" 
                        dangerouslySetInnerHTML={{ __html: documentContent }}>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </section>
    </motion.div>
  );
}
