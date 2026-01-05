import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  TrendingUp,
  FileText,
  Shield,
  ArrowRight,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Brain,
  Zap,
  Star,
  Activity,
  Upload
} from 'lucide-react';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCandidates();
      const allCandidates = response.data.candidates || [];
      setCandidates(allCandidates.slice(0, 5));

      const processedStats = {
        total_candidates: allCandidates.length,
        categories: {
          highly_qualified: allCandidates.filter(c => c.analysis?.category === 'Highly Qualified').length,
          qualified: allCandidates.filter(c => c.analysis?.category === 'Qualified').length,
          not_a_fit: allCandidates.filter(c => c.analysis?.category === 'Not a Fit').length
        },
        average_scores: {
          overall_score: allCandidates.length > 0 ?
            Math.round(allCandidates.reduce((sum, c) => sum + (c.analysis?.overall_score || 0), 0) / allCandidates.length) : 0
        },
        recent_uploads: allCandidates.filter(c => {
          const uploadDate = new Date(c.upload_date);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return uploadDate >= weekAgo;
        }).length
      };

      setStatistics(processedStats);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome to SmartHire AI</h1>
          <p className="text-slate-500 font-medium">Here's an overview of your recruitment pipeline.</p>
        </div>
        <Link
          to="/upload"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center space-x-2 font-semibold"
        >
          <Upload className="h-5 w-5" />
          <span>Upload New Resume</span>
        </Link>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {/* Highly Qualified - 2x2 */}
        <motion.div
          variants={item}
          className="md:col-span-2 lg:col-span-3 lg:row-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-emerald-200" />
              <span className="font-semibold text-emerald-100 uppercase tracking-widest text-xs">Top Talent</span>
            </div>
            <h2 className="text-5xl font-bold mb-2">{statistics?.categories?.highly_qualified || 0}</h2>
            <p className="text-emerald-50 font-medium opacity-90">Highly Qualified Candidates</p>
          </div>
          <div className="relative z-10 mt-8">
            <Link to="/candidates?filter=highly-qualified" className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl inline-flex items-center space-x-2 transition-colors">
              <span className="text-sm font-semibold">Review Profiles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Abstract background element */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"
          />
        </motion.div>

        {/* Total Candidates - 1x1 */}
        <motion.div
          variants={item}
          className="md:col-span-2 lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Growth</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-slate-900">{statistics?.total_candidates || 0}</h3>
            <span className="text-emerald-500 text-sm font-bold">+12%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-1">Total Talent Pool</p>
        </motion.div>

        {/* Avg Score - 1x1 */}
        <motion.div
          variants={item}
          className="md:col-span-2 lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <BarChart3 className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Accuracy</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-slate-900">{statistics?.average_scores?.overall_score || 0}%</h3>
            <span className="text-emerald-500 text-sm font-bold">+5%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-1">AI Matching Precision</p>
        </motion.div>

        {/* Recent Activity - 2x2 */}
        <motion.div
          variants={item}
          className="md:col-span-4 lg:col-span-4 lg:row-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              <span>Recent Activity</span>
            </h3>
            <Link to="/candidates" className="text-emerald-600 hover:text-emerald-700 font-bold text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {candidates.map((candidate, idx) => (
              <Link key={candidate.id} to={`/candidates/${candidate.id}`}>
                <motion.div
                  whileHover={{ x: 10, backgroundColor: '#f8fafc' }}
                  className="flex items-center justify-between p-4 rounded-2xl transition-colors mb-2 border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {candidate.analysis?.contact_info?.name?.[0] || 'C'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{candidate.analysis?.contact_info?.name || candidate.filename}</h4>
                      <p className="text-xs text-slate-500 font-medium">{new Date(candidate.upload_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${candidate.analysis?.category === 'Highly Qualified' ? 'bg-emerald-100 text-emerald-700' :
                      candidate.analysis?.category === 'Qualified' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                      {candidate.analysis?.category || 'Analyzing'}
                    </div>
                    <span className="text-slate-900 font-bold">{candidate.analysis?.overall_score || 0}%</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions - 2x2 */}
        <motion.div
          variants={item}
          className="md:col-span-2 lg:col-span-2 lg:row-span-2 grid grid-cols-1 gap-4"
        >
          <Link to="/hr-assistant" className="group">
            <div className="h-full bg-slate-900 rounded-3xl p-6 text-white group-hover:bg-slate-800 transition-colors relative overflow-hidden">
              <div className="relative z-10">
                <Brain className="h-8 w-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold mb-1">AI Assistant</h3>
                <p className="text-slate-400 text-xs font-medium">Chat with your talent data</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-10 -top-10 text-emerald-500/10"
              >
                <Zap className="w-40 h-40" />
              </motion.div>
            </div>
          </Link>
          <Link to="/analytics" className="group">
            <div className="h-full bg-white border border-slate-100 rounded-3xl p-6 group-hover:border-emerald-200 transition-all shadow-sm">
              <BarChart3 className="h-8 w-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Analytics</h3>
              <p className="text-slate-500 text-xs font-medium">Deep pipeline insights</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
