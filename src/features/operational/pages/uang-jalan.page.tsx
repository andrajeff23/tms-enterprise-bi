import React, { useState } from 'react';
import {
  Wallet, Plus, Search, Download, CheckCircle, Clock,
  AlertCircle, XCircle, Eye, TrendingDown, TrendingUp
} from 'lucide-react';

type UangJalanStatus = 'PENDING' | 'DISBURSED' | 'CLAIMED' | 'SETTLED' | 'OUTSTANDING';

interface UangJalanRecord {
  id: string;
  refNo: string;
  driverName: string;
  driverCode: string;
  tripRef: string;
  route: string;
  disbursedDate: string;
  returnDate: string;
  totalBudget: number;
  fuelCost: number;
  tolCost: number;
  mealCost: number;
  otherCost: number;
  totalUsed: number;
  returned: number;
  status: UangJalanStatus;
}

const dummyRecords: UangJalanRecord[] = [
  { id: '1', refNo: 'UJ-2026-0901', driverName: 'Slamet Rahardjo', driverCode: 'DRV-001', tripRef: 'TRIP-2026-0901', route: 'Jakarta → Surabaya', disbursedDate: '2026-09-01', returnDate: '2026-09-04', totalBudget: 2500000, fuelCost: 1200000, tolCost: 450000, mealCost: 150000, otherCost: 80000, totalUsed: 1880000, returned: 620000, status: 'SETTLED' },
  { id: '2', refNo: 'UJ-2026-0902', driverName: 'Budi Kurniawan', driverCode: 'DRV-002', tripRef: 'TRIP-2026-0902', route: 'Bandung → Semarang', disbursedDate: '2026-09-02', returnDate: '2026-09-05', totalBudget: 1800000, fuelCost: 900000, tolCost: 280000, mealCost: 120000, otherCost: 0, totalUsed: 1300000, returned: 0, status: 'CLAIMED' },
  { id: '3', refNo: 'UJ-2026-0903', driverName: 'Andi Saputra', driverCode: 'DRV-003', tripRef: 'TRIP-2026-0903', route: 'Jakarta → Cirebon', disbursedDate: '2026-09-02', returnDate: '2026-09-03', totalBudget: 900000, fuelCost: 450000, tolCost: 180000, mealCost: 80000, otherCost: 50000, totalUsed: 760000, returned: 140000, status: 'SETTLED' },
  { id: '4', refNo: 'UJ-2026-0904', driverName: 'Hendra Gunawan', driverCode: 'DRV-004', tripRef: 'TRIP-2026-0904', route: 'Surabaya → Balikpapan', disbursedDate: '2026-09-03', returnDate: '2026-09-07', totalBudget: 5500000, fuelCost: 0, tolCost: 0, mealCost: 0, otherCost: 0, totalUsed: 0, returned: 0, status: 'DISBURSED' },
  { id: '5', refNo: 'UJ-2026-0905', driverName: 'Dedi Setiawan', driverCode: 'DRV-005', tripRef: 'TRIP-2026-0905', route: 'Semarang → Solo', disbursedDate: '2026-09-03', returnDate: '2026-09-04', totalBudget: 700000, fuelCost: 0, tolCost: 0, mealCost: 0, otherCost: 0, totalUsed: 0, returned: 0, status: 'PENDING' },
  { id: '6', refNo: 'UJ-2026-0906', driverName: 'Rudi Hermawan', driverCode: 'DRV-006', tripRef: 'TRIP-2026-0906', route: 'Jakarta → Medan', disbursedDate: '2026-09-03', returnDate: '2026-09-09', totalBudget: 12000000, fuelCost: 5500000, tolCost: 1200000, mealCost: 600000, otherCost: 300000, totalUsed: 7600000, returned: 0, status: 'CLAIMED' },
  { id: '7', refNo: 'UJ-2026-0907', driverName: 'Eko Prasetyo', driverCode: 'DRV-007', tripRef: 'TRIP-2026-0907', route: 'Surabaya → Makassar', disbursedDate: '2026-08-31', returnDate: '2026-09-04', totalBudget: 9500000, fuelCost: 4200000, tolCost: 800000, mealCost: 480000, otherCost: 220000, totalUsed: 5700000, returned: 3800000, status: 'SETTLED' },
  { id: '8', refNo: 'UJ-2026-0908', driverName: 'Agus Wijaya', driverCode: 'DRV-008', tripRef: 'TRIP-2026-0908', route: 'Bekasi → Tasikmalaya', disbursedDate: '2026-09-01', returnDate: '2026-09-02', totalBudget: 850000, fuelCost: 380000, tolCost: 120000, mealCost: 80000, otherCost: 0, totalUsed: 580000, returned: 270000, status: 'OUTSTANDING' },
];

export const UangJalanPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<UangJalanRecord[]>(dummyRecords);

  const [newUJ, setNewUJ] = useState({
    driverName: 'Slamet Rahardjo',
    driverCode: 'DRV-001',
    tripRef: '',
    route: '',
    disbursedDate: '2026-09-05',
    totalBudget: 2000000,
  });

  const statusBadge = (s: UangJalanStatus) => {
    const map: Record<UangJalanStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      PENDING: { cls: 'bg-amber-100 text-amber-700', icon: <Clock size={11} />, label: 'Pending' },
      DISBURSED: { cls: 'bg-blue-100 text-blue-700', icon: <Wallet size={11} />, label: 'Dicairkan' },
      CLAIMED: { cls: 'bg-purple-100 text-purple-700', icon: <AlertCircle size={11} />, label: 'Klaim Masuk' },
      SETTLED: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Selesai' },
      OUTSTANDING: { cls: 'bg-rose-100 text-rose-700', icon: <XCircle size={11} />, label: 'Outstanding' },
    };
    const d = map[s];
    return (
      <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>
        {d.icon} {d.label}
      </span>
    );
  };

  const totalDisbursed = records.reduce((s, r) => s + r.totalBudget, 0);
  const totalUsed = records.reduce((s, r) => s + r.totalUsed, 0);
  const totalReturned = records.reduce((s, r) => s + r.returned, 0);
  const totalOutstanding = records.filter(r => r.status === 'OUTSTANDING').reduce((s, r) => s + (r.totalBudget - r.returned), 0);

  const filtered = records.filter(r => {
    const q = search.toLowerCase();
    const match = r.refNo.toLowerCase().includes(q) || r.driverName.toLowerCase().includes(q) || r.route.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || r.status === filterStatus);
  });

  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: UangJalanRecord = {
      id: String(records.length + 1),
      refNo: `UJ-2026-090${String(records.length + 9).padStart(2, '0')}`,
      driverName: newUJ.driverName,
      driverCode: newUJ.driverCode,
      tripRef: newUJ.tripRef || 'TRIP-2026-NEW',
      route: newUJ.route || 'Jakarta → Surabaya',
      disbursedDate: newUJ.disbursedDate,
      returnDate: '-',
      totalBudget: newUJ.totalBudget,
      fuelCost: 0, tolCost: 0, mealCost: 0, otherCost: 0, totalUsed: 0, returned: 0,
      status: 'DISBURSED',
    };
    setRecords([next, ...records]);
    setShowModal(false);
    alert(`✅ Uang Jalan ${next.refNo} berhasil dicairkan kepada ${next.driverName}`);
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <Wallet size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Uang Jalan Driver</h2>
            <p className="text-xs text-slate-500">Kelola pencairan, klaim biaya perjalanan, dan penyelesaian uang jalan</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export laporan uang jalan')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Cairkan Uang Jalan</span>
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Dicairkan</div>
          <div className="text-xl font-extrabold text-blue-600 mt-1">{fmt(totalDisbursed)}</div>
          <div className="flex items-center gap-1 text-[10px] text-blue-500 mt-1"><TrendingUp size={10} /> Bulan Sept 2026</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Digunakan</div>
          <div className="text-xl font-extrabold text-slate-800 mt-1">{fmt(totalUsed)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{totalDisbursed > 0 ? Math.round(totalUsed / totalDisbursed * 100) : 0}% dari total</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-600 uppercase">Total Dikembalikan</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">{fmt(totalReturned)}</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-500 mt-1"><TrendingDown size={10} /> Sisa kembali</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-rose-600 uppercase">Outstanding</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{fmt(totalOutstanding)}</div>
          <div className="text-[10px] text-rose-400 font-bold mt-1">{records.filter(r => r.status === 'OUTSTANDING').length} driver belum settle</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari Ref, Driver, Rute..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="PENDING">Pending</option>
          <option value="DISBURSED">Dicairkan</option>
          <option value="CLAIMED">Klaim Masuk</option>
          <option value="SETTLED">Selesai</option>
          <option value="OUTSTANDING">Outstanding</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Riwayat Uang Jalan</h3>
          <span className="text-xs text-slate-500">{filtered.length} record</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. Ref</th>
                <th className="p-3.5">Driver / Trip</th>
                <th className="p-3.5">Rute</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5 text-right">Budget</th>
                <th className="p-3.5 text-right">Realisasi</th>
                <th className="p-3.5 text-right">Dikembalikan</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-emerald-600">{r.refNo}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{r.driverName}</div>
                    <div className="text-[11px] text-blue-500 font-mono">{r.tripRef}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">{r.route}</td>
                  <td className="p-3.5">
                    <div className="text-slate-700">{r.disbursedDate}</div>
                    {r.returnDate !== '-' && <div className="text-[11px] text-slate-400">Kembali: {r.returnDate}</div>}
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900">{fmt(r.totalBudget)}</td>
                  <td className="p-3.5 text-right">
                    {r.totalUsed > 0 ? (
                      <span className={`font-bold ${r.totalUsed > r.totalBudget ? 'text-rose-600' : 'text-slate-900'}`}>{fmt(r.totalUsed)}</span>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="p-3.5 text-right">
                    {r.returned > 0 ? <span className="font-bold text-emerald-600">{fmt(r.returned)}</span> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="p-3.5">{statusBadge(r.status)}</td>
                  <td className="p-3.5 text-center">
                    <button onClick={() => alert(`Detail Uang Jalan: ${r.refNo}`)} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-[11px]">
                      <Eye size={12} /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-emerald-600" /> Cairkan Uang Jalan
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Driver</label>
                  <select value={newUJ.driverName} onChange={e => setNewUJ({ ...newUJ, driverName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Slamet Rahardjo</option><option>Budi Kurniawan</option><option>Andi Saputra</option><option>Hendra Gunawan</option><option>Dedi Setiawan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">No. Trip Ref</label>
                  <input type="text" placeholder="TRIP-2026-XXXX" value={newUJ.tripRef} onChange={e => setNewUJ({ ...newUJ, tripRef: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Rute Perjalanan</label>
                <input required type="text" placeholder="Jakarta → Surabaya" value={newUJ.route} onChange={e => setNewUJ({ ...newUJ, route: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Cair</label>
                  <input type="date" value={newUJ.disbursedDate} onChange={e => setNewUJ({ ...newUJ, disbursedDate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Total Budget (Rp)</label>
                  <input type="number" value={newUJ.totalBudget} onChange={e => setNewUJ({ ...newUJ, totalBudget: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 font-medium">
                💡 Budget yang dicairkan sudah termasuk estimasi BBM, Tol, Makan & Biaya Lain-lain.
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 text-xs">Cairkan Sekarang</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
