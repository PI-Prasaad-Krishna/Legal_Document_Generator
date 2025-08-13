import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Icon Components ---
const MissionIcon = () => (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8-12V7a2 2 0 012-2h4a2 2 0 012 2v2m-6 0h6"></path></svg>
);
const VisionIcon = () => (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
);
const TechIcon = () => (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
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

const sectionVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const FeatureCard = ({ icon, title, children }) => (
    <motion.div 
        className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100"
        variants={sectionVariants}
    >
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{children}</p>
    </motion.div>
);

// --- The AboutPage Component ---
export default function AboutPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Section */}
      <section className="py-24 text-center text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl font-extrabold mb-4"
          >
            About LexiGen AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-blue-100"
          >
            Democratizing access to legal documentation through the power of artificial intelligence.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 space-y-20">
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                className="grid md:grid-cols-3 gap-12"
            >
                <FeatureCard icon={<MissionIcon />} title="Our Mission">
                    To empower freelancers, startups, and small businesses by providing affordable, accessible, and reliable legal document generation. We believe legal safety should not be a luxury.
                </FeatureCard>
                <FeatureCard icon={<VisionIcon />} title="Our Vision">
                    To become the most trusted platform for automated legal solutions in India, creating a future where anyone can create a legally sound document with confidence and ease.
                </FeatureCard>
                <FeatureCard icon={<TechIcon />} title="Our Technology">
                    LexiGen AI is built on state-of-the-art Large Language Models. Our intelligent system understands user needs and translates them into precise, professionally formatted legal text.
                </FeatureCard>
            </motion.div>

            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={sectionVariants}
                className="text-center"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for the Innovators</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    This project was born out of the Hack The Horizon 2.0 hackathon at VIT Chennai. It represents a passion for leveraging AI to solve real-world problems and make a tangible impact on the entrepreneurial ecosystem.
                </p>
            </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
