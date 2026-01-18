
import React from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[85vh] bg-white rounded-[2rem] shadow-2xl z-[201] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-3 text-red-600">
                <ShieldAlert size={24} />
                <h2 className="text-xl font-bold text-[#1D1D1F]">Disclaimer of Liability</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="prose prose-sm md:prose-base max-w-none text-gray-600 space-y-4">
                <h3 className="text-lg font-bold text-[#1D1D1F]">Important Notice to All Users</h3>
                
                <p>
                  <strong>Subject: Terms of Service and Limitation of Responsibility</strong>
                </p>

                <p>
                  Welcome to GovNext. By accessing or using this portal, you acknowledge and agree to the following terms regarding the role and liability of the platform administrator (Next Group).
                </p>

                <p className="font-semibold text-[#1D1D1F]">
                  1. Information Aggregation Only
                </p>
                <p>
                  This portal serves exclusively as an information aggregation service. We compile data from various public sources and third-party websites for the convenience of our users. We do not represent any government entity, recruitment board, or private organization mentioned herein.
                </p>

                <p className="font-semibold text-[#1D1D1F]">
                  2. No Guarantee of Accuracy
                </p>
                <p>
                  While we strive to provide accurate and up-to-date information, the Administrator assumes no responsibility or liability for any errors, omissions, or discrepancies in the content provided. Users are strictly advised to verify all details, including dates, eligibility, and fees, directly from the official notification sources provided in the links.
                </p>

                <p className="font-semibold text-[#1D1D1F]">
                  3. Zero Liability Clause
                </p>
                <p className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-800 font-medium">
                  The Administrator (Next Group) shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of this website. This includes, but is not limited to, loss of money due to application fee scams, failed transactions, missed deadlines, or rejection of applications by recruitment bodies.
                </p>

                <p className="font-semibold text-[#1D1D1F]">
                  4. Third-Party Links
                </p>
                <p>
                  This website contains links to external websites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.
                </p>

                <p>
                  By continuing to use this website, you explicitly release the Administrator from any legal or financial responsibility related to your job search and application process.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-400">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1D1D1F] text-white font-bold rounded-xl hover:bg-black transition-all"
              >
                I Understand & Agree
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
