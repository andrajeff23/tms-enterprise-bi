import Swal from 'sweetalert2';
import React, { useState, useMemo } from 'react';
import {
  Download, FileText, BarChart3, Truck, Wrench, Users,
  Wallet, FileCheck2, TrendingUp, Calendar, Clock,
  ChevronLeft, ChevronRight, Search, FileDown, FileSpreadsheet,
  Filter
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

const baseReports: Omit<ReportItem, 'id' | 'period' | 'status' | 'rowCount' | 'lastGenerated'>[] = [
  { title: 'Laporan Operasional & Order', desc: 'Rekap harian DO, status pengiriman, POD summary', type: 'Delivery Order', fileSize: '2.4 MB', icon: <Truck size={16} />, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { title: 'Laporan Performa & Efisiensi Armada', desc: 'Utilisasi kendaraan, odometer bulanan, konsumsi BBM', type: 'Fleet', fileSize: '1.8 MB', icon: <BarChart3 size={16} />, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { title: 'Laporan Financial & Pendapatan', desc: 'Rekapitulasi invoice, penerimaan kas, piutang overdue', type: 'Finance', fileSize: '3.1 MB', icon: <TrendingUp size={16} />, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { title: 'Laporan Maintenance & Pemeliharaan', desc: 'Work order servis, penggantian sparepart, biaya', type: 'Maintenance', fileSize: '1.2 MB', icon: <Wrench size={16} />, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { title: 'Laporan Performa & Kinerja Driver', desc: 'Rating driver, jumlah trip bulanan, klaim uang jalan', type: 'Driver', fileSize: '0.9 MB', icon: <Users size={16} />, color: 'text-violet-600', bgColor: 'bg-violet-50' },
  { title: 'Laporan Uang Jalan & Biaya Perjalanan', desc: 'Realisasi uang jalan per driver, rincian BBM, tol', type: 'Travel Expense', fileSize: '0.7 MB', icon: <Wallet size={16} />, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { title: 'Laporan Proof of Delivery (POD)', desc: 'Status POD per DO, tingkat keberhasilan serah terima', type: 'POD', fileSize: '1.5 MB', icon: <FileCheck2 size={16} />, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  { title: 'Laporan Rekap Bulanan Executive', desc: 'Ringkasan eksekutif: revenue, biaya, trip count, SLA', type: 'Executive', fileSize: '4.2 MB', icon: <FileText size={16} />, color: 'text-rose-600', bgColor: 'bg-rose-50' },
  { title: 'Laporan Penagihan & Collection AR', desc: 'Aging piutang per customer, follow-up history', type: 'AR Collection', fileSize: '1.1 MB', icon: <TrendingUp size={16} />, color: 'text-orange-600', bgColor: 'bg-orange-50' },
];

const generateMockReports = () => {
  const allReports: ReportItem[] = [];
  const periods = ['Januari 2026', 'Februari 2026', 'Maret 2026', 'April 2026', 'Mei 2026', 'Juni 2026', 'Juli 2026', 'Agustus 2026', 'September 2026'];
  const statuses: ('READY' | 'GENERATING' | 'SCHEDULED')[] = ['READY', 'READY', 'READY', 'READY', 'GENERATING', 'SCHEDULED'];

  for (let i = 1; i <= 150; i++) {
    const base = baseReports[i % baseReports.length];
    allReports.push({
      ...base,
      id: `RPT-${String(i).padStart(4, '0')}`,
      period: periods[i % periods.length],
      status: statuses[i % statuses.length],
      rowCount: 50 + (i * 12),
      lastGenerated: `2026-09-${String((i % 28) + 1).padStart(2, '0')} 0${(i % 9) + 1}:00`
    });
  }
  return allReports.sort((a, b) => b.id.localeCompare(a.id));
};

const allReportsData = generateMockReports();
const reportTabs = ['Semua', 'Delivery Order', 'Fleet', 'Finance', 'Maintenance', 'Driver', 'Travel Expense', 'POD', 'Executive', 'AR Collection'];

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Derived filtered data
  const filteredData = useMemo(() => {
    return allReportsData.filter(r => {
      const matchTab = activeTab === 'Semua' || r.type === activeTab;
      const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase());
      // Simple date range filtering simulation
      let matchDate = true;
      if (startMonth || endMonth) {
        // In real app, we parse startMonth/endMonth (YYYY-MM) and compare with r.period
        // Here we just let it pass or implement simple logic if needed.
        // Since mock data uses string periods, we'll just skip complex date filtering for UI demo
      }
      return matchTab && matchSearch && matchDate;
    });
  }, [activeTab, searchTerm, startMonth, endMonth]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const statusBadge = (s: ReportItem['status']) => {
    if (s === 'READY') return <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Siap</span>;
    if (s === 'GENERATING') return <span className="bg-amber-100 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1"><Clock size={10} className="animate-spin" />Proses</span>;
    return <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded-full">Jadwal</span>;
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
            <h2 className="text-lg font-bold text-slate-900">Reports & Analytics</h2>
            <p className="text-xs text-slate-500">Pusat pelaporan data operasional dan keuangan perusahaan</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => Swal.fire({icon: 'success', title: 'Informasi', text: 'Exporting PDF...'})}
            className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <FileDown size={15} />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => Swal.fire({icon: 'success', title: 'Informasi', text: 'Exporting Excel...'})}
            className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <FileSpreadsheet size={15} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-2 pt-2 pb-0 border-b border-slate-200 overflow-x-auto rounded-t-xl shadow-xs">
        <div className="flex space-x-1 min-w-max">
          {reportTabs.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-slate-200 shadow-xs -mt-5 rounded-b-xl">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:min-w-[259px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ID atau nama laporan..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            <Calendar size={14} className="text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Dari:</span>
            <input
              type="month"
              value={startMonth}
              onChange={e => setStartMonth(e.target.value)}
              className="bg-transparent text-xs text-slate-800 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            <span className="text-xs font-semibold text-slate-600">Sampai:</span>
            <input
              type="month"
              value={endMonth}
              onChange={e => setEndMonth(e.target.value)}
              className="bg-transparent text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Informasi Laporan</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Kategori</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Periode</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Data</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length > 0 ? (
                currentData.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-xs text-slate-800">{r.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{r.title}</span>
                        <span className="text-[11px] text-slate-500 truncate max-w-[250px]">{r.desc}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold ${r.bgColor} ${r.color}`}>
                        {r.icon}
                        {r.type}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-slate-700">{r.period}</div>
                      <div className="text-[10px] text-slate-400">Update: {r.lastGenerated}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-slate-700">{r.rowCount.toLocaleString()} Baris</div>
                      <div className="text-[10px] text-slate-400">{r.fileSize}</div>
                    </td>
                    <td className="py-3 px-4">
                      {statusBadge(r.status)}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        disabled={r.status !== 'READY'}
                        onClick={() => Swal.fire({icon: 'success', title: 'Informasi', text: `Downloading PDF for ${r.id}`})}
                        className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-colors ${r.status === 'READY' ? 'border-slate-200 text-slate-600 hover:bg-slate-100' : 'border-transparent text-slate-300'}`}
                        title="Download PDF"
                      >
                        <FileDown size={15} />
                      </button>
                      <button
                        disabled={r.status !== 'READY'}
                        onClick={() => Swal.fire({icon: 'success', title: 'Informasi', text: `Downloading Excel for ${r.id}`})}
                        className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-colors ${r.status === 'READY' ? 'border-slate-200 text-emerald-600 hover:bg-emerald-50' : 'border-transparent text-slate-300'}`}
                        title="Download Excel"
                      >
                        <FileSpreadsheet size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-sm">
                    Tidak ada laporan yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-800">{filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-slate-800">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> dari <span className="font-bold text-slate-800">{filteredData.length}</span> laporan
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
                // Logic to show a window of pages around current page
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${currentPage === pageNum
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
      </div>
    </div>
  );
};

