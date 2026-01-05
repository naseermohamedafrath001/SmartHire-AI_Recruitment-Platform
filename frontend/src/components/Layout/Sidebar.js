import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Home,
    Users,
    Upload,
    BarChart3,
    MessageSquare,
    Shield,
    Brain,
    Target,
    Settings,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Search,
    FileText,
    Video,
    Lightbulb,
    GitCompare,
    Code,
    Calendar,
    UserCheck
} from 'lucide-react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/candidates', label: 'Candidates', icon: Users },
        { path: '/upload', label: 'Upload', icon: Upload },
        { path: '/analytics', label: 'Analytics', icon: BarChart3 },
        { path: '/hr-assistant', label: 'AI Assistant', icon: MessageSquare },
        { path: '/ai-insights', label: 'AI Insights', icon: Brain },
        { path: '/bias-analysis', label: 'Bias Analysis', icon: Shield },
    ];

    const secondaryItems = [
        { path: '/ai-matching', label: 'AI Matching', icon: Target },
        { path: '/skills-analytics', label: 'Skills', icon: Code },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            className="h-screen bg-slate-50 border-r border-slate-200 flex flex-col sticky top-0 z-50 overflow-hidden shadow-sm"
        >
            {/* Logo Area */}
            <div className="p-6 flex items-center mb-8">
                <Link to="/" className="flex items-center space-x-3 overflow-hidden">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg flex-shrink-0"
                    >
                        <Bot className="h-6 w-6 text-white" />
                    </motion.div>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent whitespace-nowrap"
                        >
                            SmartHire AI
                        </motion.span>
                    )}
                </Link>
            </div>

            {/* Main Menu */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {!isCollapsed && (
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
                )}
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${active
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                                {active && !isCollapsed && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}

                <div className="my-6 border-t border-slate-100" />

                {!isCollapsed && (
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Advanced</p>
                )}
                {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${active
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Footer / Toggle */}
            <div className="p-4 mt-auto border-t border-slate-100">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    {!isCollapsed && <span className="ml-2 text-sm font-medium">Collapse Sidebar</span>}
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
