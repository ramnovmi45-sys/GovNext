
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, PlusCircle, LogOut } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobCard from './components/JobCard';
import AdminModal from './components/AdminModal';
import LoginModal from './components/LoginModal';
import TermsModal from './components/TermsModal';
import ContactModal from './components/ContactModal';
import { Job, NewJob } from './types';
import { MOCK_JOBS } from './constants';

const App: React.FC = () => {
  // Initialize jobs from localStorage if available, otherwise use MOCK_JOBS
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const savedJobs = localStorage.getItem('govnext_jobs');
      return savedJobs ? JSON.parse(savedJobs) : MOCK_JOBS;
    } catch (error) {
      console.error('Failed to parse jobs from localStorage', error);
      return MOCK_JOBS;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Persist jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('govnext_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (newJobData: NewJob) => {
    const newJob: Job = {
      ...newJobData,
      id: Date.now().toString(),
    };
    setJobs(prev => [newJob, ...prev]);
    showNotification('Job posted successfully!');
  };

  const handleDeleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    showNotification('Job deleted successfully');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      showNotification('Admin Mode Disabled');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    showNotification('Welcome back, Admin');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />

        <section id="job-feed" className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">Latest Openings</h2>
              <p className="text-gray-500 text-base font-medium">Updated daily from official portals.</p>
            </div>
            
            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-[#0071E3] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20"
              >
                <PlusCircle size={20} />
                <span>Post Job</span>
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <JobCard 
                    job={job} 
                    isAdmin={isAdmin} 
                    onDelete={handleDeleteJob} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 md:px-12 bg-white border-t border-gray-100 mt-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">GovNext</h3>
            <p className="text-gray-400 text-sm">Empowering careers through verified opportunities.</p>
          </div>
          
          <div className="flex items-center space-x-8 text-sm font-semibold text-gray-500">
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-[#1D1D1F]">Privacy & Terms</button>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-[#1D1D1F]">Contact</button>
            
            <button 
              onClick={handleAdminToggle}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${isAdmin ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'hover:bg-gray-100 text-gray-400'}`}
              title={isAdmin ? "Logout Admin" : "Admin Login"}
            >
              {isAdmin ? <LogOut size={16} /> : <Lock size={16} />}
              {isAdmin && <span className="text-xs font-bold">Logout</span>}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-300 mt-16 font-medium">© 2024 GovNext Portal. All Rights Reserved.</p>
      </footer>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddJob}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isAdmin={isAdmin}
      />

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-full shadow-2xl z-[200] border border-gray-200"
          >
            <p className="text-sm font-bold tracking-wide">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
