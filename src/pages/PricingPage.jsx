import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Reusable Icon Components ---
const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

// --- Animation Variants ---
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

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.1
    }
  })
};

// --- Pricing Card Component ---
const PricingCard = ({ plan, price, description, features, popular = false, index }) => (
    <motion.div 
        custom={index}
        variants={cardVariants}
        className={`relative bg-white border rounded-2xl p-8 flex flex-col ${popular ? 'border-blue-500 border-2' : 'border-gray-200'}`}
    >
        {popular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Most Popular</span>
            </div>
        )}
        <h3 className="text-2xl font-bold text-gray-900">{plan}</h3>
        <p className="text-gray-500 mt-2">{description}</p>
        <div className="mt-6">
            <span className="text-5xl font-extrabold text-gray-900">{price}</span>
            <span className="text-lg font-medium text-gray-500">/month</span>
        </div>
        <ul className="mt-8 space-y-4 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700">{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full mt-10 py-3 px-6 rounded-lg font-semibold transition-colors ${popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
            Get Started
        </button>
    </motion.div>
);

// --- The PricingPage Component ---
export default function PricingPage() {
  const plans = [
    {
      plan: 'Freelancer',
      price: '₹499',
      description: 'For individuals and solo entrepreneurs.',
      features: [
        '5 Documents per month',
        'Access to all templates',
        'PDF & DOCX Export',
        'Standard email support'
      ]
    },
    {
      plan: 'Startup',
      price: '₹1,299',
      description: 'For small teams and growing businesses.',
      features: [
        '20 Documents per month',
        'Access to all templates',
        'PDF & DOCX Export',
        'Priority email support',
        'Version History'
      ],
      popular: true
    },
    {
      plan: 'Business',
      price: '₹2,999',
      description: 'For established companies and agencies.',
      features: [
        'Unlimited Documents',
        'Access to all templates',
        'PDF & DOCX Export',
        'Dedicated phone support',
        'Version History',
        'Digital Signatures'
      ]
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Section */}
      <section className="py-24 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl font-extrabold text-gray-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-gray-600"
          >
            Choose the plan that's right for you. No hidden fees.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-white">
        <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <PricingCard key={plan.plan} {...plan} index={index} />
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
