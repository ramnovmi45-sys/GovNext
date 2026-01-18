
import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  note: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

const DEFAULT_CONTACT: ContactInfo = {
  email: 'support@govnext.com',
  phone: '+91 98765 43210',
  address: 'New Delhi, India',
  note: 'For business inquiries and advertisement placements, please reach out via email.',
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, isAdmin }) => {
  const [info, setInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem('govnext_contact');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT;
    } catch {
      return DEFAULT_CONTACT;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ContactInfo>(info);

  useEffect(() => {
    if (isOpen) {
      setEditForm(info);
      setIsEditing(false);
    }
  }, [isOpen, info]);

  const handleSave = () => {
    setInfo(editForm);
    localStorage.setItem('govnext_contact', JSON.stringify(editForm));
    setIsEditing(false);
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-[2rem] shadow-2xl z-[201] overflow-hidden p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#1D1D1F]">Contact Us</h2>
              <div className="flex items-center space-x-2">
                {isAdmin && !isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-[#0071E3] bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                    title="Edit Contact Info"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                  <X size={20} />
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                  <input
                    type="text"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Note</label>
                  <textarea
                    rows={3}
                    value={editForm.note}
                    onChange={(e) => setEditForm({...editForm, note: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3] resize-none"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full py-3 bg-[#0071E3] text-white font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-[#0077ED] transition-colors"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0071E3] flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Email Support</h3>
                    <p className="font-semibold text-[#1D1D1F] text-lg break-all">{info.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Helpline</h3>
                    <p className="font-semibold text-[#1D1D1F] text-lg">{info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Office</h3>
                    <p className="font-semibold text-[#1D1D1F] text-lg">{info.address}</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-sm leading-relaxed italic">
                    "{info.note}"
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
