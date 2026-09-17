import React, { useState } from 'react';
import {
  Download, FileText, BarChart3, Truck, Wrench, Users,
  Wallet, FileCheck2, TrendingUp, Calendar, Filter, Clock
} from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  desc: string;
  type: string;
  period: string;
  fileSize: string;
  lastGenerated: string;
  status: 'READY' | 'GENERATING' | 'SCHEDULED';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  rowCount: number;
}

const reports: ReportItem[] = [
  {
    id: 'RPT-001',
    title: 'Laporan Operasional & Order',
    desc: 'Rekap harian DO, status pengiriman, POD summary, SLA achievement, dan analisis keterlambatan per rute',
    type: 'Operational',
    period: 'Sept 2026',
    fileSize: '2.4 MB',
    lastGenerated: '2026-09-03 08:00',
    status: 'READY',
    icon: <Truck size={20} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    rowCount: 284,
  },
  {
    id: 'RPT-002',
    title: 'Laporan Performa & Efisiensi Armada',
    desc: 'Utilisasi kendaraan, odometer bulanan, konsumsi BBM per km, idle time, dan biaya operasional per unit',
    type: 'Fleet',
    period: 'Sept 2026',
    fileSize: '1.8 MB',
    lastGenerated: '2026-09-03 08:15',
    status: 'READY',
    icon: <BarChart3 size={20} />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    rowCount: 128,
  },
  {
    id: 'RPT-003',
    title: 'Laporan Financial & Pendapatan',
    desc: 'Rekapitulasi invoice, penerimaan kas, piutang overdue, profit & loss, dan tren revenue bulanan',
    type: 'Finance',
    period: 'Sept 2026',
    fileSize: '3.1 MB',
    lastGenerated: '2026-09-03 07:30',
    status: 'READY',
    icon: <TrendingUp size={20} />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    rowCount: 412,
  },
  {
    id: 'RPT-004',
    title: 'Laporan Maintenance & Pemeliharaan',
    desc: 'Work order servis, penggantian sparepart, biaya perbaikan, jadwal preventive maintenance ke depan',
    type: 'Maintenance',
    period: 'Sept 2026',
    fileSize: '1.2 MB',
    lastGenerated: '2026-09-03 08:00',
    status: 'READY',
    icon: <Wrench size={20} />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    rowCount: 96,
  },
  {
    id: 'RPT-005',
    title: 'Laporan Performa & Kinerja Driver',
    desc: 'Rating driver, jumlah trip bulanan, klaim uang jalan, pelanggaran overspeed, dan absensi kehadiran',
    type: 'Driver',
    period: 'Sept 2026',
    fileSize: '0.9 MB',
    lastGenerated: '2026-09-03 09:00',
    status: 'READY',
    icon: <Users size={20} />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    rowCount: 64,
  },
  {
    id: 'RPT-006',
    title: 'Laporan Uang Jalan & Biaya Perjalanan',
    desc: 'Realisasi uang jalan per driver, rincian BBM, tol, makan, dan outstanding klaim yang belum diselesaikan',
    type: 'Travel Expense',
    period: 'Sept 2026',
    fileSize: '0.7 MB',
    lastGenerated: '2026-09-03 08:45',
    status: 'READY',
    icon: <Wallet size={20} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    rowCount: 48,
  },
  {
    id: 'RPT-007',
    title: 'Laporan Proof of Delivery (POD)',
    desc: 'Status POD per DO, tingkat keberhasilan serah terima, kondisi barang, sengketa, dan histori verifikasi',
    type: 'POD',
    period: 'Sept 2026',
    fileSize: '1.5 MB',
    lastGenerated: '2026-09-03 09:00',
    status: 'READY',
    icon: <FileCheck2 size={20} />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    rowCount: 156,
  },
  {
    id: 'RPT-008',
    title: 'Laporan Rekap Bulanan Executive',
    desc: 'Ringkasan eksekutif: revenue, biaya, trip count, SLA achievement, dan KPI utama bulan berjalan',
    type: 'Executive',
    period: 'Agustus 2026',
    fileSize: '4.2 MB',
    lastGenerated: '2026-09-01 06:00',
    status: 'READY',
    icon: <FileText size={20} />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    rowCount: 520,
  },
  {
    id: 'RPT-009',
    title: 'Laporan Penagihan & Collection AR',
    desc: 'Aging piutang per customer, follow-up history, janji bayar, dan proyeksi penerimaan kas 30 hari',
    type: 'AR Collection',
    period: 'Sept 2026',
    fileSize: '1.1 MB',
    lastGenerated: '2026-09-03 07:00',
    status: 'GENERATING',
    icon: <TrendingUp size={20} />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    rowCount: 0,
  },
];

const recentDownloads = [
  { file: 'Laporan-Operasional-Sept2026.xlsx', user: 'Admin Logistics', time: '09:12', size: '2.4 MB' },
  { file: 'Laporan-Financial-Sept2026.xlsx', user: 'Siti Finance', time: '08:55', size: '3.1 MB' },
  { file: 'Laporan-Driver-Sept2026.xlsx', user: 'Budi Dispatcher', time: '08:30', size: '0.9 MB' },
  { file: 'Executive-Summary-Aug2026.pdf', user: 'Administrator', time: '07:45', size: '4.2 MB' },
  { file: 'Laporan-Maintenance-Sept2026.xlsx', user: 'Tim Mekanik', time: '07:20', size: '1.2 MB' },
];

export const ReportsPage: React.FC = () => {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = reports.filter(r => {
    const matchType = filterType === 'ALL' || r.type === filterType;
    const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const statusBadge = (s: ReportItem['status']) => {
    if (s === 'READY') return <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Siap Unduh</span>;
    if (s === 'GENERATING') return <span className="bg-amber-100 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} className="animate-spin" />Generating...</span>;
    return <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded-full">Terjadwal</span>;
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-md">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Reports & Executive Analytics</h2>
            <p className="text-xs text-slate-500">Pusat pelaporan dan unduh dokumen laporan resmi TMS Enterprise</p>
          </div>
        </div>
        <button
          onClick={() => alert('Jadwalkan laporan otomatis')}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
        >
          <Calendar size={15} />
          <span>Jadwalkan Laporan</span>
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Laporan', val: reports.length, color: 'text-slate-800', sub: 'Tersedia' },
          { label: 'Siap Diunduh', val: reports.filter(r => r.status === 'READY').length, color: 'text-emerald-600', sub: 'Ready' },
          { label: 'Sedang Dibuat', val: reports.filter(r => r.status === 'GENERATING').length, color: 'text-amber-600', sub: 'Generating' },
          { label: 'Total Data Rows', val: '1.7K+', color: 'text-blue-600', sub: 'Records' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
            <div className="text-[10px] text-slate-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <input
          type="text"
          placeholder="Cari nama laporan..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[180px] bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
        />
        <div className="flex items-center gap-1.5">
          <Filter size={13} className="text-slate-400" />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
            <option value="ALL">Semua Tipe</option>
            <option value="Operational">Operational</option>
            <option value="Fleet">Fleet</option>
            <option value="Finance">Finance</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Driver">Driver</option>
            <option value="POD">POD</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${r.bgColor} ${r.color} flex items-center justify-center shadow-xs`}>
                  {r.icon}
                </div>
                <div>{statusBadge(r.status)}</div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm leading-snug">{r.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{r.desc}</p>
            </div>

            <div className="px-5 pb-4 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={10} /> {r.period}</span>
                {r.rowCount > 0 && <span>{r.rowCount.toLocaleString()} baris data</span>}
                <span>{r.fileSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Mengunduh ${r.title} (${r.period}) dalam format .XLSX`)}
                  disabled={r.status !== 'READY'}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                    r.status === 'READY'
                      ? 'bg-slate-800 text-white hover:bg-slate-900'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Download size={13} />
                  <span>Unduh .XLSX</span>
                </button>
                <button
                  onClick={() => alert(`Mengunduh ${r.title} dalam format PDF`)}
                  disabled={r.status !== 'READY'}
                  className={`flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-colors border ${
                    r.status === 'READY'
                      ? 'border-slate-300 text-slate-600 hover:bg-slate-50'
                      : 'border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <FileText size={13} />
                  PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Downloads */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <Clock size={15} className="text-slate-400" />
          <h3 className="font-bold text-slate-900 text-sm">Riwayat Unduhan Terbaru</h3>
          <span className="ml-auto text-xs text-slate-400">Hari ini</span>
        </div>
        <div className="divide-y divide-slate-100">
          {recentDownloads.map((d, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <FileText size={14} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{d.file}</div>
                  <div className="text-[10px] text-slate-400">Diunduh oleh {d.user}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-semibold text-slate-600">{d.time}</div>
                <div className="text-[10px] text-slate-400">{d.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
