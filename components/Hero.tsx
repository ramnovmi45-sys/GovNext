
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToJobs = () => {
    const section = document.getElementById('job-feed');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-8 px-4 text-center overflow-hidden">
      {/* Ambient Background Animation */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 30, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[-20%] w-[700px] h-[700px] bg-purple-300/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[100px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10"
      >
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/50 text-blue-700 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            #1 Govt Job Portal
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">
          Your Future.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#9F55FF]">Verified.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
          The most trusted platform for real-time government job notifications, delivered with precision.
        </p>

        {/* Leaderboard Ad Placeholder */}
        <div className="w-full max-w-[728px] h-[90px] bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-sm overflow-hidden transition-all hover:shadow-md">
          <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase italic">Advertisement Space</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToJobs}
          className="bg-[#0071E3] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-blue-500/30 hover:bg-[#0077ED] hover:shadow-2xl hover:shadow-blue-500/40 transition-all"
        >
          View Latest Openings
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
