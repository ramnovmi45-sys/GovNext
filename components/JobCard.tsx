
import React from 'react';
import { ExternalLink, Calendar, Trash2 } from 'lucide-react';
import { Job } from '../types';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: Job;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isAdmin, onDelete }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getDynamicBg = (name: string) => {
    const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-emerald-100 text-emerald-600', 'bg-orange-100 text-orange-600', 'bg-rose-100 text-rose-600'];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (job.isAd) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="relative bg-yellow-50/50 border border-yellow-200/50 rounded-[2.5rem] p-8 flex flex-col h-full shadow-sm"
      >
        {isAdmin && (
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(job.id);
            }}
            className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm text-red-500 rounded-full hover:bg-red-50 shadow-sm border border-red-100 transition-colors z-50 cursor-pointer"
            title="Delete Ad"
          >
            <Trash2 size={18} />
          </button>
        )}
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full uppercase tracking-widest">Sponsored</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 leading-tight">{job.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-grow">{job.description}</p>
        <div className="mt-auto">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-yellow-400 text-yellow-900 font-bold py-4 rounded-full hover:bg-yellow-500 transition-colors"
          >
            <span>Learn More</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
      className="relative bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col h-full transition-all group"
    >
      {isAdmin && (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(job.id);
          }}
          className="absolute top-4 right-4 p-2 bg-gray-50 text-red-500 rounded-full hover:bg-red-50 shadow-sm border border-gray-200 hover:border-red-200 transition-colors z-50 cursor-pointer"
          title="Delete Job"
        >
          <Trash2 size={18} />
        </button>
      )}
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${getDynamicBg(job.organization)}`}>
          {getInitials(job.organization)}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Organization</span>
          <p className="text-xs font-bold text-[#1D1D1F] line-clamp-1">{job.organization}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3 leading-tight tracking-tight group-hover:text-[#0071E3] transition-colors">{job.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
        {job.description}
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar size={14} />
            <span>Opens: {job.startDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-red-500">
            <Calendar size={14} />
            <span>Closes: {job.endDate}</span>
          </div>
        </div>
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-2/3 bg-gray-200" />
        </div>
      </div>

      <div className="mt-auto">
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center space-x-2 bg-[#1D1D1F] text-white font-bold py-4 rounded-full hover:bg-black transition-all"
        >
          <span>Apply Now</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
};

export default JobCard;
