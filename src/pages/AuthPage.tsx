import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (currentUser) {
    navigate('/account');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, email.includes('admin') ? 'admin' : 'customer');
    navigate('/account');
  };

  const handleDemoCustomer = () => {
    login('vijay.anand@example.com', 'customer');
    navigate('/account');
  };

  const handleDemoAdmin = () => {
    login('admin@smartbizstore.in', 'admin');
    navigate('/admin');
  };

  return (
    <div className="bg-[#f8fafc] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand to-amber-400 text-slate-950 flex items-center justify-center font-black text-xl mx-auto mb-3 shadow-sm border border-amber-300">
            <span className="text-brand">S</span>
            <span>B</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your orders, saved wishlist, and accelerated checkout.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
          <button
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vijay Anand"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vijay.anand@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
          >
            <span>{mode === 'login' ? 'Sign In to Account' : 'Create My Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login options */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">
            One-Click Instant Demo Access
          </span>

          <button
            onClick={handleDemoCustomer}
            className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand" />
              <span>Sign In as Customer (Vijay Anand)</span>
            </div>
            <span className="text-[10px] text-slate-400">1-Click</span>
          </button>

          <button
            onClick={handleDemoAdmin}
            className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold rounded-xl transition flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Sign In as Merchant Admin</span>
            </div>
            <span className="text-[10px] text-amber-600 font-bold">Admin Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

