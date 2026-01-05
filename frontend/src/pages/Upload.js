import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Upload as UploadIcon,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Info
} from 'lucide-react';
import UploadZone from '../components/Upload/UploadZone';
import toast from 'react-hot-toast';

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUploadSuccess = (response) => {
    toast.success('Resume analyzed successfully!');
    if (response.candidate_id) {
      navigate(`/candidates/${response.candidate_id}`);
    } else {
      navigate('/candidates');
    }
  };

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100">
            <Sparkles className="h-3 w-3" />
            <span>AI Processing Engine</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tighter">
            Smart Resume <br /> Analysis.
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-md italic">
            "The fastest way to find your next top performer using bias-free AI protocols."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <Zap className="h-8 w-8 text-amber-500 mb-2" />
            <span className="text-xl font-bold text-slate-900">0.8s</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Speed</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-emerald-400 mb-2" />
            <span className="text-xl font-bold">Safe</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Privacy</span>
          </div>
        </motion.div>
      </div>

      {/* Main Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-4 shadow-xl shadow-slate-200/50"
        >
          <div className="bg-slate-50 rounded-[2.5rem] p-12 border-2 border-dashed border-slate-200">
            <UploadZone
              onUploadSuccess={handleUploadSuccess}
              onUploadStart={handleUploadStart}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 space-y-4"
        >
          <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Why use AI?</h3>
            <ul className="space-y-4">
              {[
                'Eliminate human cognitive bias',
                'Instant skill gap analysis',
                'Automatic ranking protocol',
                'Standardized evaluations'
              ].map((tip, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm font-medium opacity-90">
                  <div className="mt-1 bg-white/20 p-0.5 rounded-full"><ArrowRight className="h-3 w-3" /></div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="h-5 w-5 text-slate-400" />
              <h4 className="font-bold text-slate-900">Supported Formats</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {['PDF', 'DOCX', 'TXT'].map(ext => (
                <span key={ext} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold tracking-widest">{ext}</span>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400 font-medium">Files are processed securely and never stored longer than required for analysis.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
