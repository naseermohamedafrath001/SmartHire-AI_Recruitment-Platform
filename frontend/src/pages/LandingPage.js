import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bot,
  Zap,
  Shield,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  CheckCircle,
  Star,
  BarChart3,
  Brain,
  Target,
  Sparkles,
  Globe,
  Award,
  ChevronRight,
  Play
} from 'lucide-react';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-emerald-100 selection:text-emerald-900 font-sans">

      {/* Navbar Overlay */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">SmartHire AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
          <Link to="/dashboard" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section: Split Screen */}
      <section className="relative min-h-screen flex items-center pt-20 px-8 lg:px-24 overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100"
            >
              <Sparkles className="h-3 w-3" />
              <span>Version 2.0 is Live</span>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Hire the <br />
              <span className="text-emerald-500">Fast Way.</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-lg mb-10 leading-relaxed font-medium">
              SmartHire AI automates resume screening with precision. Cut your hiring time by 80% with bias-free candidate evaluation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-emerald-500 text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl shadow-emerald-200 flex items-center space-x-3 transition-all"
                >
                  <span>Start Hiring Now</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white border-2 border-slate-100 text-slate-700 px-10 py-5 rounded-3xl font-bold text-lg flex items-center space-x-3 hover:bg-slate-50 transition-all"
              >
                <div className="bg-emerald-100 p-1 rounded-full">
                  <Play className="h-4 w-4 text-emerald-600 fill-emerald-600" />
                </div>
                <span>Watch Product Demo</span>
              </motion.button>
            </div>

            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-400">
                Join <span className="text-slate-900">500+</span> recruiter teams worldwide
              </p>
            </div>
          </motion.div>

          {/* Right: Visual Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[4rem] p-1 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="w-full h-full bg-slate-900 rounded-[3.8rem] overflow-hidden relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-4/5 h-4/5 border-2 border-emerald-500/20 rounded-full border-dashed"></div>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="z-10 text-center"
                >
                  <Brain className="h-32 w-32 text-emerald-500 mb-6 mx-auto filter drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                  <h3 className="text-white text-3xl font-black italic tracking-tighter">SMARTHIRE <span className="text-emerald-500">CORE AI</span></h3>
                </motion.div>

                {/* Floating Metric Card Overlay */}
                <motion.div
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute bottom-12 left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-2xl w-56"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-emerald-500 p-2 rounded-xl">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-tight">Accuracy Rate</span>
                  </div>
                  <div className="text-white text-3xl font-black">99.4<span className="text-emerald-500">%</span></div>
                </motion.div>
              </div>
            </div>

            {/* Background Blob */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100 rounded-full blur-[100px] opacity-60"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-100 rounded-full blur-[100px] opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid: Bento Style 2 */}
      <section id="features" className="py-32 px-8 lg:px-24 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6">Designed for Better Efficiency.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Powerful tools managed by AI to give you the upper hand in talent acquisition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-white border border-slate-100 p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="relative z-10 w-2/3">
                <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Candidate Sentiment Analysis</h3>
                <p className="text-slate-500 font-medium mb-8">Go beyond keywords. Our AI understands the context and quality of candidate experience.</p>
                <Link to="/dashboard" className="text-emerald-600 font-bold flex items-center space-x-2">
                  <span>Explore More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="absolute -right-10 top-0 h-full flex items-center">
                <BarChart3 className="w-64 h-64 text-slate-50 group-hover:text-emerald-50 transition-colors" />
              </div>
            </div>

            <div className="md:col-span-4 bg-emerald-500 p-12 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
              <Shield className="h-10 w-10 text-emerald-200 mb-6" />
              <h3 className="text-3xl font-black mb-4 group-hover:translate-x-2 transition-transform">Zero-Bias Protocol</h3>
              <p className="text-emerald-100 font-medium leading-relaxed opacity-90">Every resume is stripped of personal identifiers for protected evaluation.</p>
              <div className="mt-8 border-t border-emerald-400 pt-8">
                <div className="text-4xl font-black">100<span className="text-emerald-200">%</span></div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-100 mt-1">Fairness Score</div>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-900 p-12 rounded-[3rem] shadow-xl text-white">
              <Zap className="h-10 w-10 text-emerald-400 mb-6" />
              <h3 className="text-3xl font-black mb-4">Instant Match</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Processing 500+ resumes in under 60 seconds. Reality redefined.</p>
            </div>

            <div className="md:col-span-8 bg-white border border-slate-100 p-12 rounded-[3rem] shadow-sm flex flex-col items-center justify-center text-center group bg-gradient-to-br hover:from-white hover:to-emerald-50/30 transition-all">
              <div className="bg-slate-50 p-6 rounded-[2rem] mb-6 group-hover:scale-110 transition-transform">
                <Bot className="h-12 w-12 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 font-mono tracking-tighter uppercase">HR ASSISTANT CHAT</h3>
              <p className="text-slate-500 font-medium mb-8">Ask questions like: "Who is the most skilled React dev here?"</p>
              <Link to="/hr-assistant" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold">Try the AI Assistant</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-white py-24 px-8 lg:px-24">
        <div className="container mx-auto">
          <div className="bg-slate-900 rounded-[4rem] p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Start Building Your Team <br />with SmartHire.</h2>
              <div className="flex justify-center flex-wrap gap-4">
                <Link to="/dashboard" className="bg-emerald-500 text-white px-10 py-5 rounded-3xl font-bold hover:bg-emerald-400 transition-all active:scale-95 text-lg">
                  Get Started for Free
                </Link>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-3xl font-bold hover:bg-white/20 transition-all text-lg">
                  Book a Live Demo
                </button>
              </div>
              <div className="mt-12 text-slate-400 font-medium flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Cancel any time</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-2">
              <div className="bg-slate-900 p-1 rounded-md">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">SmartHire AI</span>
            </div>
            <div className="flex space-x-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms</span>
              <span className="hover:text-slate-900 cursor-pointer">Support</span>
            </div>
            <div className="text-slate-400 text-sm font-medium">© 2026 SmartHire AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
