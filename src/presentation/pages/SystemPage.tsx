import React, { useState } from 'react';
import {
  Settings, ShieldCheck, Plus, Search, Edit2, Trash2,
  Eye, Lock, CheckCircle, XCircle, Clock, User, Key,
  AlertTriangle, Activity, Database, Server, Globe
} from 'lucide-react';

type UserRole = 'SUPER_ADMIN' | 'LOGISTICS_MANAGER' | 'DISPATCHER' | 'FINANCE_MANAGER' | 'DRIVER_SUPERVISOR' | 'MECHANIC' | 'VIEWER';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  department: string;
  lastLogin: string;
  status: UserStatus;
  permissions: string[];
  createdDate: string;
}

const systemUsers: SystemUser[] = [
  { id: 'USR-001', name: 'Administrator System', email: 'admin@tmsbi.co.id', role: 'SUPER_ADMIN', phone: '0812-1234-0001', department: 'IT & System', lastLogin: '2026-09-03 09:45', status: 'ACTIVE', permissions: ['ALL'], createdDate: '2024-01-01' },
  { id: 'USR-002', name: 'Budi Hartono', email: 'budi.logistics@tmsbi.co.id', role: 'LOGISTICS_MANAGER', phone: '0812-1234-0002', department: 'Operations', lastLogin: '2026-09-03 08:30', status: 'ACTIVE', permissions: ['order', 'fleet', 'driver', 'planner', 'tracking'], createdDate: '2024-02-15' },
  { id: 'USR-003', name: 'Rina Dispatcher', email: 'rina.dispatch@tmsbi.co.id', role: 'DISPATCHER', phone: '0812-1234-0003', department: 'Operations', lastLogin: '2026-09-03 07:00', status: 'ACTIVE', permissions: ['order', 'planner', 'delivery-order', 'tracking'], createdDate: '2024-03-10' },
  { id: 'USR-004', name: 'Siti Rahayu', email: 'siti.finance@tmsbi.co.id', role: 'FINANCE_MANAGER', phone: '0812-1234-0004', department: 'Finance', lastLogin: '2026-09-03 09:00', status: 'ACTIVE', permissions: ['invoice', 'payment', 'penagihan', 'reports'], createdDate: '2024-01-20' },
  { id: 'USR-005', name: 'Agus Supervisor', email: 'agus.driver@tmsbi.co.id', role: 'DRIVER_SUPERVISOR', phone: '0812-1234-0005', department: 'Operations', lastLogin: '2026-09-02 18:00', status: 'ACTIVE', permissions: ['driver', 'tracking', 'pod', 'uang-jalan'], createdDate: '2024-04-05' },
  { id: 'USR-006', name: 'Joko Mekanik', email: 'joko.workshop@tmsbi.co.id', role: 'MECHANIC', phone: '0812-1234-0006', department: 'Workshop', lastLogin: '2026-09-03 06:30', status: 'ACTIVE', permissions: ['maintenance', 'unit-rusak', 'fleet-management'], createdDate: '2024-05-12' },
  { id: 'USR-007', name: 'Dewi Putri', email: 'dewi.ops@tmsbi.co.id', role: 'VIEWER', phone: '0812-1234-0007', department: 'Management', lastLogin: '2026-09-01 14:00', status: 'ACTIVE', permissions: ['dashboard', 'reports', 'analytics'], createdDate: '2024-06-01' },
  { id: 'USR-008', name: 'Hendra Lama', email: 'hendra.old@tmsbi.co.id', role: 'DISPATCHER', phone: '0812-1234-0008', department: 'Operations', lastLogin: '2026-07-15 09:00', status: 'INACTIVE', permissions: ['order', 'planner'], createdDate: '2023-09-10' },
];

const auditLogs = [
  { id: 'LOG-001', user: 'admin@tmsbi.co.id', action: 'LOGIN', target: 'System', time: '2026-09-03 09:45:12', ip: '192.168.1.100', status: 'SUCCESS' },
  { id: 'LOG-002', user: 'budi.logistics@tmsbi.co.id', action: 'CREATE_ORDER', target: 'DO-2026-09010', time: '2026-09-03 09:30:44', ip: '192.168.1.105', status: 'SUCCESS' },
  { id: 'LOG-003', user: 'siti.finance@tmsbi.co.id', action: 'APPROVE_PAYMENT', target: 'PAY-2026-09003', time: '2026-09-03 09:15:22', ip: '192.168.1.110', status: 'SUCCESS' },
  { id: 'LOG-004', user: 'rina.dispatch@tmsbi.co.id', action: 'UPDATE_TRIP', target: 'TRIP-2026-0902', time: '2026-09-03 08:55:08', ip: '192.168.1.102', status: 'SUCCESS' },
  { id: 'LOG-005', user: 'unknown@external.com', action: 'LOGIN', target: 'System', time: '2026-09-03 08:44:01', ip: '203.45.67.89', status: 'FAILED' },
  { id: 'LOG-006', user: 'admin@tmsbi.co.id', action: 'DELETE_USER', target: 'USR-009', time: '2026-09-03 08:30:15', ip: '192.168.1.100', status: 'SUCCESS' },
  { id: 'LOG-007', user: 'joko.workshop@tmsbi.co.id', action: 'CREATE_WORKORDER', target: 'WO-2026-09009', time: '2026-09-03 07:00:33', ip: '192.168.1.120', status: 'SUCCESS' },
  { id: 'LOG-008', user: 'agus.driver@tmsbi.co.id', action: 'VERIFY_POD', target: 'POD-2026-09002', time: '2026-09-03 06:55:41', ip: '192.168.1.115', status: 'SUCCESS' },
];

const systemStatus = [
  { name: 'API Server', status: 'ONLINE', uptime: '99.98%', latency: '12ms' },
  { name: 'Database PostgreSQL', status: 'ONLINE', uptime: '99.95%', latency: '5ms' },
  { name: 'GPS Tracking Service', status: 'ONLINE', uptime: '99.90%', latency: '45ms' },
  { name: 'AI Analytics Engine', status: 'ONLINE', uptime: '99.85%', latency: '120ms' },
  { name: 'Email Notification', status: 'ONLINE', uptime: '100%', latency: '230ms' },
  { name: 'WhatsApp Gateway', status: 'DEGRADED', uptime: '98.20%', latency: '850ms' },
];

const roleColors: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-rose-100 text-rose-700',
  LOGISTICS_MANAGER: 'bg-blue-100 text-blue-700',
  DISPATCHER: 'bg-indigo-100 text-indigo-700',
  FINANCE_MANAGER: 'bg-emerald-100 text-emerald-700',
  DRIVER_SUPERVISOR: 'bg-amber-100 text-amber-700',
  MECHANIC: 'bg-orange-100 text-orange-700',
  VIEWER: 'bg-slate-100 text-slate-600',
};

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  LOGISTICS_MANAGER: 'Logistics Manager',
  DISPATCHER: 'Dispatcher',
  FINANCE_MANAGER: 'Finance Manager',
  DRIVER_SUPERVISOR: 'Driver Supervisor',
  MECHANIC: 'Mechanic',
  VIEWER: 'Viewer',
};

export const SystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'system'>('users');
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        {[
          { id: 'users', label: 'User Management', icon: <User size={13} /> },
          { id: 'audit', label: 'Audit Trail', icon: <Activity size={13} /> },
          { id: 'system', label: 'System Status', icon: <Server size={13} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === t.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
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
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="text-slate-400 absolute left-3 top-2.5" />
              <input type="text" placeholder="Cari nama, email, divisi..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-8 pr-3 py-2 focus:outline-none" />
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
                {filtered.map(u => (
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
                        <button onClick={() => alert(`Edit user: ${u.name}`)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={13} /></button>
                        <button onClick={() => alert(`Reset password: ${u.email}`)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"><Key size={13} /></button>
                        {u.role !== 'SUPER_ADMIN' && (
                          <button onClick={() => alert(`Toggle status user: ${u.name}`)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
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
              <button onClick={() => alert('Export audit log')} className="text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-2 py-1 rounded-lg">Export</button>
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
                {auditLogs.map(log => (
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
                <button onClick={() => { setShowModal(false); alert('Pengguna baru berhasil ditambahkan! Email aktivasi telah dikirim.'); }} className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 text-xs">Buat Pengguna</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
