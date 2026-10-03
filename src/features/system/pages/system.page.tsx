
import React, { useState } from 'react';
import {
  Settings, ShieldCheck, Plus, Search, Edit2, Trash2,
  Eye, Lock, CheckCircle, XCircle, Clock, User, Key,
  AlertTriangle, Activity, Database, Server, Globe
, ChevronLeft, ChevronRight } from 'lucide-react';

import { UserRole, UserStatus, SystemUser } from '../../../shared/types/system.type';
import { 
  SYSTEM_USERS as systemUsers, 
  AUDIT_LOGS as auditLogs, 
  SYSTEM_STATUS as systemStatus, 
  ROLE_COLORS as roleColors, 
  ROLE_LABELS as roleLabels 
} from '../../../shared/constants/system.const';
import { showInfoAlert, showSuccessAlert } from '../../../shared/utils/alert.util';

export const SystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'system'>('users');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const renderPagination = (dataLength: number) => {
    const totalPages = Math.ceil(dataLength / itemsPerPage);
    return (
      <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <span className="font-bold text-slate-800">{dataLength === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-slate-800">{Math.min(currentPage * itemsPerPage, dataLength)}</span> dari <span className="font-bold text-slate-800">{dataLength}</span> data
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                    currentPage === pageNum 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = systemUsers.filter(u => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q);
  });

  const statusBadge = (s: UserStatus) => {
    if (s === 'ACTIVE') return <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={9} /> Aktif</span>;
    if (s === 'INACTIVE') return <span className="bg-slate-100 text-slate-500 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={9} /> Nonaktif</span>;
    return <span className="bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle size={9} /> Suspended</span>;
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-md">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">System Settings & Security</h2>
            <p className="text-xs text-slate-500">Manajemen pengguna, hak akses RBAC, audit trail, dan monitoring sistem</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
        >
          <Plus size={15} /> Tambah User
        </button>
      </div>

      {/* KPI */}
      {/*<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pengguna', val: systemUsers.length, color: 'text-slate-800', sub: 'Terdaftar' },
          { label: 'User Aktif', val: systemUsers.filter(u => u.status === 'ACTIVE').length, color: 'text-emerald-600', sub: 'Online hari ini' },
          { label: 'Login Gagal', val: auditLogs.filter(l => l.status === 'FAILED').length, color: 'text-rose-600', sub: '24 jam terakhir' },
          { label: 'Uptime Sistem', val: '99.92%', color: 'text-blue-600', sub: 'Bulan ini' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
            <div className="text-[10px] text-slate-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>*/}

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        {[
          { id: 'users', label: 'User Management', icon: <User size={13} /> },
          { id: 'audit', label: 'Audit Trail', icon: <Activity size={13} /> },
          { id: 'system', label: 'System Status', icon: <Server size={13} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id as typeof activeTab); setCurrentPage(1); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === t.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="text-slate-400 absolute left-3 top-2.5" />
              <input type="text" placeholder="Cari nama, email, divisi..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <span className="text-xs text-slate-500 ml-auto">{filtered.length} pengguna</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">ID / Nama</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role Akses</th>
                  <th className="p-3.5">Departemen</th>
                  <th className="p-3.5">Login Terakhir</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs">
                          {u.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{u.email}</td>
                    <td className="p-3.5">
                      <span className={`${roleColors[u.role]} font-bold text-[10px] px-2 py-0.5 rounded`}>{roleLabels[u.role]}</span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{u.department}</td>
                    <td className="p-3.5 text-slate-600">{u.lastLogin}</td>
                    <td className="p-3.5">{statusBadge(u.status)}</td>
                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => showInfoAlert('Informasi', `Edit user: ${u.name}`)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={13} /></button>
                        <button onClick={() => showInfoAlert('Informasi', `Reset password: ${u.email}`)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"><Key size={13} /></button>
                        {u.role !== 'SUPER_ADMIN' && (
                          <button onClick={() => showInfoAlert('Informasi', `Toggle status user: ${u.name}`)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            {u.status === 'ACTIVE' ? <Lock size={13} /> : <CheckCircle size={13} />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {renderPagination(filtered.length)}
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Activity size={15} className="text-slate-500" /> Log Aktivitas Sistem
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle size={9} /> {auditLogs.filter(l => l.status === 'FAILED').length} Failed Login
              </span>
              <button onClick={() => showInfoAlert('Informasi', 'Export audit log')} className="text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-2 py-1 rounded-lg">Export</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Log ID</th>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Aksi</th>
                  <th className="p-3.5">Target</th>
                  <th className="p-3.5">Waktu</th>
                  <th className="p-3.5">IP Address</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(log => (
                  <tr key={log.id} className={`hover:bg-slate-50/80 transition-colors ${log.status === 'FAILED' ? 'bg-rose-50/30' : ''}`}>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">{log.id}</td>
                    <td className="p-3.5 font-mono text-slate-600">{log.user}</td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded font-mono">{log.action}</span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{log.target}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">{log.time}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">{log.ip}</td>
                    <td className="p-3.5 text-center">
                      {log.status === 'SUCCESS'
                        ? <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">Success</span>
                        : <span className="bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center justify-center gap-1"><AlertTriangle size={9} /> Failed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {renderPagination(auditLogs.length)}
        </div>
      )}

      {/* System Status Tab */}
      {activeTab === 'system' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemStatus.map(s => (
              <div key={s.name} className={`bg-white border rounded-xl p-4 shadow-xs flex items-center gap-4 ${s.status === 'DEGRADED' ? 'border-amber-200' : 'border-slate-200'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.status === 'ONLINE' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  {s.name.includes('GPS') ? <Globe size={18} className={s.status === 'ONLINE' ? 'text-emerald-600' : 'text-amber-600'} />
                    : s.name.includes('Database') ? <Database size={18} className={s.status === 'ONLINE' ? 'text-emerald-600' : 'text-amber-600'} />
                      : <Server size={18} className={s.status === 'ONLINE' ? 'text-emerald-600' : 'text-amber-600'} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{s.name}</span>
                    <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${s.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      {s.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[11px] text-slate-500">Uptime: <strong className="text-slate-700">{s.uptime}</strong></span>
                    <span className="text-[11px] text-slate-500">Latency: <strong className={s.status === 'DEGRADED' ? 'text-amber-600' : 'text-slate-700'}>{s.latency}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <Settings size={15} className="text-slate-500" /> Konfigurasi Sistem
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                ['Versi Aplikasi', 'TMS BI Enterprise v3.2.1'],
                ['Environment', 'Production'],
                ['Database Version', 'PostgreSQL 16.2'],
                ['Node.js Version', '20.15.0 LTS'],
                ['Last Backup', '2026-09-03 03:00 WIB'],
                ['Next Scheduled Backup', '2026-09-04 03:00 WIB'],
                ['SSL Certificate', 'Valid (Exp: 2027-01-15)'],
                ['Timezone', 'Asia/Jakarta (UTC+7)'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                  <span className="text-slate-500 font-semibold">{k}</span>
                  <span className="font-bold text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={18} className="text-slate-700" /> Tambah Pengguna Baru
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nama Lengkap</label>
                <input type="text" placeholder="Nama pengguna" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email</label>
                <input type="email" placeholder="user@tmsbi.co.id" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Role Akses</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option value="DISPATCHER">Dispatcher</option>
                    <option value="FINANCE_MANAGER">Finance Manager</option>
                    <option value="DRIVER_SUPERVISOR">Driver Supervisor</option>
                    <option value="MECHANIC">Mechanic</option>
                    <option value="VIEWER">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Departemen</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Operations</option><option>Finance</option><option>Workshop</option><option>Management</option><option>IT & System</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">No. HP</label>
                <input type="text" placeholder="0812-XXXX-XXXX" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-[11px] text-blue-700">
                💡 Password sementara akan dikirimkan ke email pengguna. Pengguna wajib ganti password saat login pertama.
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button onClick={() => { setShowModal(false); showSuccessAlert('Berhasil', 'Pengguna baru berhasil ditambahkan! Email aktivasi telah dikirim.'); }} className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 text-xs">Buat Pengguna</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
