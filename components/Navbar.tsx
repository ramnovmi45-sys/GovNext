
import React from 'react';
import { Landmark, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const scrollToJobs = () => {
    const section = document.getElementById('job-feed');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 md:px-12 border-b border-gray-200/50">
      <div className="flex items-center space-x-2">
        <Landmark className="text-[#0071E3]" size={24} />
        <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">GovNext</span>
      </div>
      
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToJobs}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="View Job Feed"
        >
          <LayoutGrid size={24} className="text-[#1D1D1F]" />
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
