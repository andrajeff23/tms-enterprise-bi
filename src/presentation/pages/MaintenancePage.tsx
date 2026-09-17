import React, { useState } from 'react';
import {
  Wrench, Plus, Search, Download, CheckCircle, Clock,
  AlertCircle, Filter, Eye, Calendar
} from 'lucide-react';

type WOStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'COMPLETED' | 'CANCELLED';
type WOType = 'PREVENTIVE' | 'CORRECTIVE' | 'EMERGENCY' | 'INSPECTION';

interface WorkOrder {
  id: string;
  woNo: string;
  vehiclePlate: string;
  vehicleType: string;
  woType: WOType;
  description: string;
  reportedBy: string;
  technicianName: string;
  scheduledDate: string;
  completedDate: string;
  estimatedCost: number;
  actualCost: number;
  status: WOStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  partsUsed: string;
}

const dummyWOs: WorkOrder[] = [
  { id: '1', woNo: 'WO-2026-09001', vehiclePlate: 'B 4567 KXC', vehicleType: 'CDD Long Box 8T', woType: 'PREVENTIVE', description: 'Service 50.000 km: Ganti Oli Mesin, Filter Oli, Filter Udara, Cek Rem & Kopling', reportedBy: 'Sistem (Scheduled)', technicianName: 'Budi Santoso', scheduledDate: '2026-09-01', completedDate: '2026-09-02', estimatedCost: 4500000, actualCost: 4800000, status: 'COMPLETED', priority: 'MEDIUM', partsUsed: 'Oli Mesin Pertamina 5W-40, Filter Oli, Filter Udara, Pad Rem Depan' },
  { id: '2', woNo: 'WO-2026-09002', vehiclePlate: 'B 9123 KXA', vehicleType: 'Truck Wingbox 18T', woType: 'CORRECTIVE', description: 'Perbaikan AC Kabin tidak dingin + Kebocoran Selang Radiator', reportedBy: 'Slamet Rahardjo (Driver)', technicianName: 'Agus Wijaya', scheduledDate: '2026-09-02', completedDate: '-', estimatedCost: 3200000, actualCost: 0, status: 'IN_PROGRESS', priority: 'HIGH', partsUsed: 'Freon AC, Selang Radiator, Klem Selang' },
  { id: '3', woNo: 'WO-2026-09003', vehiclePlate: 'B 1289 KXD', vehicleType: 'Tronton Box 24T', woType: 'EMERGENCY', description: 'Ban Luar Belakang Kanan Pecah di Tol Palimanan - butuh penggantian darurat', reportedBy: 'Hendra Gunawan (Driver)', technicianName: 'Joko Susilo', scheduledDate: '2026-09-03', completedDate: '2026-09-03', estimatedCost: 2800000, actualCost: 2950000, status: 'COMPLETED', priority: 'CRITICAL', partsUsed: 'Ban Bridgestone 11R22.5, Inner Tube, Velg Luar' },
  { id: '4', woNo: 'WO-2026-09004', vehiclePlate: 'B 9876 KXB', vehicleType: 'Trailer 40ft', woType: 'PREVENTIVE', description: 'Servis berkala 6 bulanan: Tune Up Mesin, Ganti Timing Belt, Cek Kopling', reportedBy: 'Sistem (Scheduled)', technicianName: 'Eko Prasetyo', scheduledDate: '2026-09-05', completedDate: '-', estimatedCost: 8500000, actualCost: 0, status: 'OPEN', priority: 'MEDIUM', partsUsed: '-' },
  { id: '5', woNo: 'WO-2026-09005', vehiclePlate: 'B 1122 KXE', vehicleType: 'CDE Box 4T', woType: 'CORRECTIVE', description: 'Lampu Rem Belakang Mati - ganti bohlam dan cek wiring', reportedBy: 'Dedi Setiawan (Driver)', technicianName: 'Rudi Hermawan', scheduledDate: '2026-09-03', completedDate: '-', estimatedCost: 350000, actualCost: 0, status: 'WAITING_PARTS', priority: 'HIGH', partsUsed: 'Bohlam Rem 21W, Steker Konektor' },
  { id: '6', woNo: 'WO-2026-09006', vehiclePlate: 'B 3344 KXF', vehicleType: 'Truck Wingbox 15T', woType: 'INSPECTION', description: 'Inspeksi tahunan KIR dan kelengkapan dokumen kendaraan', reportedBy: 'Bagian Compliance', technicianName: 'Firman Wibowo', scheduledDate: '2026-09-04', completedDate: '2026-09-04', estimatedCost: 1500000, actualCost: 1450000, status: 'COMPLETED', priority: 'LOW', partsUsed: 'Segitiga Pengaman, APAR, Sertifikat KIR' },
  { id: '7', woNo: 'WO-2026-09007', vehiclePlate: 'B 5566 KXG', vehicleType: 'Trailer 20ft', woType: 'CORRECTIVE', description: 'Suspensi Belakang Bocor - ganti shock absorber dan bellow', reportedBy: 'Eko Prasetyo (Driver)', technicianName: 'Budi Santoso', scheduledDate: '2026-09-06', completedDate: '-', estimatedCost: 6500000, actualCost: 0, status: 'OPEN', priority: 'HIGH', partsUsed: '-' },
  { id: '8', woNo: 'WO-2026-09008', vehiclePlate: 'B 7788 KXH', vehicleType: 'CDD Box 8T', woType: 'PREVENTIVE', description: 'Ganti Oli Gardan & Transmisi + Flush Sistem Pengereman', reportedBy: 'Sistem (Scheduled)', technicianName: 'Agus Wijaya', scheduledDate: '2026-09-07', completedDate: '-', estimatedCost: 2200000, actualCost: 0, status: 'OPEN', priority: 'LOW', partsUsed: '-' },
];

export const MaintenancePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(dummyWOs);

  const [newWO, setNewWO] = useState({
    vehiclePlate: 'B 9123 KXA',
    woType: 'PREVENTIVE' as WOType,
    description: '',
    technicianName: 'Budi Santoso',
    scheduledDate: '2026-09-10',
    estimatedCost: 2000000,
    priority: 'MEDIUM' as WorkOrder['priority'],
  });

  const statusBadge = (s: WOStatus) => {
    const map: Record<WOStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      OPEN: { cls: 'bg-slate-100 text-slate-600', icon: <AlertCircle size={11} />, label: 'Open' },
      IN_PROGRESS: { cls: 'bg-blue-100 text-blue-700', icon: <Clock size={11} />, label: 'In Progress' },
      WAITING_PARTS: { cls: 'bg-amber-100 text-amber-700', icon: <AlertCircle size={11} />, label: 'Tunggu Parts' },
      COMPLETED: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Selesai' },
      CANCELLED: { cls: 'bg-rose-100 text-rose-700', icon: <Clock size={11} />, label: 'Dibatalkan' },
    };
    const d = map[s];
    return <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>{d.icon} {d.label}</span>;
  };

  const priorityBadge = (p: WorkOrder['priority']) => {
    const map = { LOW: 'bg-slate-100 text-slate-600', MEDIUM: 'bg-amber-100 text-amber-700', HIGH: 'bg-orange-100 text-orange-700', CRITICAL: 'bg-rose-100 text-rose-700' };
    return <span className={`${map[p]} px-2 py-0.5 rounded font-bold text-[10px]`}>{p}</span>;
  };

  const typeBadge = (t: WOType) => {
    const map = {
      PREVENTIVE: 'bg-green-100 text-green-700',
      CORRECTIVE: 'bg-blue-100 text-blue-700',
      EMERGENCY: 'bg-rose-100 text-rose-700',
      INSPECTION: 'bg-purple-100 text-purple-700',
    };
    return <span className={`${map[t]} px-2 py-0.5 rounded font-bold text-[10px]`}>{t}</span>;
  };

  const filtered = workOrders.filter(w => {
    const q = search.toLowerCase();
    const match = w.woNo.toLowerCase().includes(q) || w.vehiclePlate.toLowerCase().includes(q) || w.technicianName.toLowerCase().includes(q) || w.description.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || w.status === filterStatus) && (filterType === 'ALL' || w.woType === filterType);
  });

  const totalCost = workOrders.filter(w => w.status === 'COMPLETED').reduce((s, w) => s + w.actualCost, 0);
  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: WorkOrder = {
      id: String(workOrders.length + 1),
      woNo: `WO-2026-090${String(workOrders.length + 9).padStart(2, '0')}`,
      vehiclePlate: newWO.vehiclePlate,
      vehicleType: 'Truck',
      woType: newWO.woType,
      description: newWO.description || 'Work Order baru',
      reportedBy: 'Admin / Dispatcher',
      technicianName: newWO.technicianName,
      scheduledDate: newWO.scheduledDate,
      completedDate: '-',
      estimatedCost: newWO.estimatedCost,
      actualCost: 0,
      status: 'OPEN',
      priority: newWO.priority,
      partsUsed: '-',
    };
    setWorkOrders([next, ...workOrders]);
    setShowModal(false);
    alert(`✅ Work Order ${next.woNo} berhasil dibuat!`);
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Wrench size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Maintenance & Work Order</h2>
            <p className="text-xs text-slate-500">Jadwal servis, perbaikan kendaraan, dan manajemen work order mekanik</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export data maintenance')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Buat Work Order</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total WO', val: workOrders.length, color: 'text-slate-800' },
          { label: 'Open', val: workOrders.filter(w => w.status === 'OPEN').length, color: 'text-slate-600' },
          { label: 'In Progress', val: workOrders.filter(w => w.status === 'IN_PROGRESS').length, color: 'text-blue-600' },
          { label: 'Tunggu Parts', val: workOrders.filter(w => w.status === 'WAITING_PARTS').length, color: 'text-amber-600' },
          { label: 'Selesai Bulan Ini', val: workOrders.filter(w => w.status === 'COMPLETED').length, color: 'text-emerald-600' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Biaya Realisasi</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{fmt(totalCost)}</div>
          <div className="text-[10px] text-emerald-600 mt-1">WO yang telah selesai</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase">Estimasi WO Pending</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">{fmt(workOrders.filter(w => w.status !== 'COMPLETED').reduce((s, w) => s + w.estimatedCost, 0))}</div>
          <div className="text-[10px] text-amber-500 mt-1">{workOrders.filter(w => w.status !== 'COMPLETED').length} WO belum selesai</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-rose-600 uppercase">WO Critical / High</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{workOrders.filter(w => w.priority === 'CRITICAL' || w.priority === 'HIGH').length}</div>
          <div className="text-[10px] text-rose-500 mt-1">Prioritas tinggi memerlukan tindakan segera</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari No. WO, Plat, Teknisi, Deskripsi..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
            <option value="ALL">Semua Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="WAITING_PARTS">Tunggu Parts</option>
            <option value="COMPLETED">Selesai</option>
          </select>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
            <option value="ALL">Semua Tipe</option>
            <option value="PREVENTIVE">Preventive</option>
            <option value="CORRECTIVE">Corrective</option>
            <option value="EMERGENCY">Emergency</option>
            <option value="INSPECTION">Inspeksi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Work Order Maintenance</h3>
          <span className="text-xs text-slate-500">{filtered.length} WO</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. WO</th>
                <th className="p-3.5">Kendaraan</th>
                <th className="p-3.5">Tipe</th>
                <th className="p-3.5">Deskripsi</th>
                <th className="p-3.5">Teknisi</th>
                <th className="p-3.5">Jadwal</th>
                <th className="p-3.5 text-right">Est. Biaya</th>
                <th className="p-3.5">Prioritas</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-amber-600">{w.woNo}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{w.vehiclePlate}</div>
                    <div className="text-[11px] text-slate-400">{w.vehicleType}</div>
                  </td>
                  <td className="p-3.5">{typeBadge(w.woType)}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 max-w-[200px] truncate" title={w.description}>{w.description}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">By: {w.reportedBy}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">{w.technicianName}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 text-slate-700"><Calendar size={11} className="text-slate-400" /> {w.scheduledDate}</div>
                    {w.completedDate !== '-' && <div className="text-[10px] text-emerald-600 mt-0.5">Done: {w.completedDate}</div>}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="font-bold text-slate-900">{fmt(w.estimatedCost)}</div>
                    {w.actualCost > 0 && <div className="text-[10px] text-emerald-600">Aktual: {fmt(w.actualCost)}</div>}
                  </td>
                  <td className="p-3.5">{priorityBadge(w.priority)}</td>
                  <td className="p-3.5">{statusBadge(w.status)}</td>
                  <td className="p-3.5 text-center">
                    <button onClick={() => alert(`Detail WO: ${w.woNo}\n\nParts: ${w.partsUsed}`)} className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-800 font-semibold text-[11px]">
                      <Eye size={12} /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Wrench size={18} className="text-amber-500" /> Buat Work Order Baru
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Plat Kendaraan</label>
                  <select value={newWO.vehiclePlate} onChange={e => setNewWO({ ...newWO, vehiclePlate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>B 9123 KXA</option><option>B 9876 KXB</option><option>B 4567 KXC</option><option>B 1289 KXD</option><option>B 1122 KXE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tipe WO</label>
                  <select value={newWO.woType} onChange={e => setNewWO({ ...newWO, woType: e.target.value as WOType })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option value="PREVENTIVE">Preventive</option>
                    <option value="CORRECTIVE">Corrective</option>
                    <option value="EMERGENCY">Emergency</option>
                    <option value="INSPECTION">Inspeksi</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Deskripsi Pekerjaan</label>
                <textarea required rows={3} placeholder="Jelaskan kerusakan atau jenis servis yang diperlukan..." value={newWO.description} onChange={e => setNewWO({ ...newWO, description: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Teknisi Assigned</label>
                  <select value={newWO.technicianName} onChange={e => setNewWO({ ...newWO, technicianName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Budi Santoso</option><option>Agus Wijaya</option><option>Joko Susilo</option><option>Eko Prasetyo</option><option>Rudi Hermawan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Prioritas</label>
                  <select value={newWO.priority} onChange={e => setNewWO({ ...newWO, priority: e.target.value as WorkOrder['priority'] })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Jadwal</label>
                  <input type="date" value={newWO.scheduledDate} onChange={e => setNewWO({ ...newWO, scheduledDate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Est. Biaya (Rp)</label>
                  <input type="number" value={newWO.estimatedCost} onChange={e => setNewWO({ ...newWO, estimatedCost: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 text-xs">Buat Work Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
