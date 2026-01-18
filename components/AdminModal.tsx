
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewJob } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: NewJob) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<NewJob>({
    organization: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    applyLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      organization: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      applyLink: '',
    });
    onClose();
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-lg h-fit max-h-[90vh] bg-white rounded-[2rem] shadow-2xl z-[101] overflow-y-auto p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Post New Job</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Organization</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. UPSC"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Job Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Assistant Engineer"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Short brief about the role..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all resize-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Date</label>
                  <input
                    required
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <input
                    required
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Apply Link</label>
                <input
                  required
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                  value={formData.applyLink}
                  onChange={e => setFormData({ ...formData, applyLink: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0071E3] text-white font-bold py-4 rounded-full hover:bg-[#0077ED] transition-all mt-4"
              >
                Publish Job
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminModal;
