import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Loader2, Truck, Activity, ShieldCheck } from 'lucide-react';
import { useAuth } from '../auth.hook';

export const LoginPage: React.FC = () => {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('admin@tms.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row relative overflow-hidden font-sans">
      <img src="/bitruk2.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Side - Brand & Presentation */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 p-16 lg:p-24 z-10 relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
            <img src="/bilogo.png" alt="" width={40} height={30} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">TMS Belawan Indah</h1>
            <p className="text-indigo-200 font-medium tracking-wide">Smart Cargo To Your Bussiness</p>
          </div>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Transportation Management <br /> System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Belawan Indah</span>.
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed max-w-lg mb-12">
          System Terintegrasi untuk Kelola Armada dan Pengiriman
        </p>

        <div className="space-y-5">
          {[
            { icon: <Activity className="text-emerald-400" size={24} />, text: "Real-time Tracking & Monitoring" },
            { icon: <ShieldCheck className="text-blue-400" size={24} />, text: "Keamanan Data Enkripsi End-to-End" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              {item.icon}
              <span className="text-slate-200 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 z-10">

        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-3 mb-10 mt-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
            <Truck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">TMS Enterprise</h1>
          </div>
        </div>

        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-3xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Selamat Datang</h3>
            <p className="text-slate-400 text-sm mb-8">Silahkan Masukkan Akun Anda</p>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError(); }}
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    placeholder="nama@tms.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider">Password</label>
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors">Lupa Password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError(); }}
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl py-3.5 px-4 shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> <span>Mengautentikasi...</span></>
                  ) : (
                    <><span>Masuk</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
              <p className="text-slate-500 text-xs">
                Demo kredensial: <strong className="text-slate-300">admin@tms.com</strong> / <strong className="text-slate-300">admin123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
