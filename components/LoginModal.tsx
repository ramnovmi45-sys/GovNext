
import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      if (password === '@adminpadam&sons') {
        onLogin();
        setPassword('');
        setError(false);
        onClose();
      } else {
        setError(true);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-sm h-fit bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl z-[201] p-8 overflow-hidden"
          >
            <div className="flex justify-end mb-2">
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Lock size={32} />
              </div>
              <h2 className="text-xl font-bold text-[#1D1D1F]">Admin Access</h2>
              <p className="text-gray-500 text-sm mt-1">Enter password to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  autoFocus
                  type="password"
                  placeholder="Password"
                  className={`w-full px-4 py-4 rounded-xl bg-gray-50 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all text-center text-lg tracking-widest placeholder:tracking-normal`}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if(error) setError(false);
                  }}
                />
              </div>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs text-center font-semibold"
                >
                  Incorrect password.
                </motion.p>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#1D1D1F] text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Unlock</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
