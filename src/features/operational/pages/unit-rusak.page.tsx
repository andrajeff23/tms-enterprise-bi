import React, { useState } from 'react';
import {
  AlertTriangle, Plus, Search, Download,
  Eye, Wrench
} from 'lucide-react';

type DamagedStatus = 'REPORTED' | 'PENDING_ASSESSMENT' | 'REPAIRING' | 'WAITING_PARTS' | 'DONE' | 'WRITE_OFF';
type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

interface DamagedUnit {
  id: string;
  reportNo: string;
  vehiclePlate: string;
  vehicleType: string;
  brand: string;
  reportedBy: string;
  reportDate: string;
  location: string;
  problemCategory: string;
  problemDesc: string;
  severity: Severity;
  technicianAssigned: string;
  estimatedRepairDays: number;
  repairCost: number;
  insuranceClaim: boolean;
  claimNo: string;
  status: DamagedStatus;
  repairProgress: number;
}

const dummyDamaged: DamagedUnit[] = [
  { id: '1', reportNo: 'RPT-2026-09001', vehiclePlate: 'B 9123 KXA', vehicleType: 'Truck Wingbox 18T', brand: 'Mitsubishi Fuso', reportedBy: 'Slamet Rahardjo (Driver)', reportDate: '2026-09-02', location: 'Tol Jakarta-Cikampek KM 47', problemCategory: 'Mesin', problemDesc: 'Mesin Overheat - Radiator bocor parah, air radiator habis, mesin panas berlebih', severity: 'HIGH', technicianAssigned: 'Agus Wijaya', estimatedRepairDays: 3, repairCost: 12500000, insuranceClaim: false, claimNo: '-', status: 'REPAIRING', repairProgress: 60 },
  { id: '2', reportNo: 'RPT-2026-09002', vehiclePlate: 'B 1289 KXD', vehicleType: 'Tronton Box 24T', brand: 'Volvo FH16', reportedBy: 'Hendra Gunawan (Driver)', reportDate: '2026-09-03', location: 'Rest Area Tol Palimanan', problemCategory: 'Ban & Roda', problemDesc: 'Ban luar belakang kanan pecah (blowout) di jalan tol, kondisi velg juga rusak', severity: 'CRITICAL', technicianAssigned: 'Joko Susilo', estimatedRepairDays: 1, repairCost: 4500000, insuranceClaim: false, claimNo: '-', status: 'DONE', repairProgress: 100 },
  { id: '3', reportNo: 'RPT-2026-09003', vehiclePlate: 'B 1122 KXE', vehicleType: 'CDE Box 4T', brand: 'Mitsubishi Canter', reportedBy: 'Dedi Setiawan (Driver)', reportDate: '2026-09-03', location: 'Gudang Semarang', problemCategory: 'Kelistrikan', problemDesc: 'Sistem lampu rem belakang mati total, kabel terbakar', severity: 'HIGH', technicianAssigned: 'Rudi Hermawan', estimatedRepairDays: 2, repairCost: 1800000, insuranceClaim: false, claimNo: '-', status: 'WAITING_PARTS', repairProgress: 30 },
  { id: '4', reportNo: 'RPT-2026-09004', vehiclePlate: 'B 5566 KXG', vehicleType: 'Trailer 20ft', brand: 'Hino 500', reportedBy: 'Eko Prasetyo (Driver)', reportDate: '2026-09-03', location: 'Pelabuhan Tanjung Perak', problemCategory: 'Suspensi', problemDesc: 'Suspensi belakang air suspension bocor, kendaraan condong ke kiri', severity: 'HIGH', technicianAssigned: 'Budi Santoso', estimatedRepairDays: 4, repairCost: 18000000, insuranceClaim: true, claimNo: 'CLM-2026-00891', status: 'PENDING_ASSESSMENT', repairProgress: 10 },
  { id: '5', reportNo: 'RPT-2026-09005', vehiclePlate: 'B 7788 KXH', vehicleType: 'CDD Box 8T', brand: 'Isuzu Elf', reportedBy: 'Agus Wijaya (Driver)', reportDate: '2026-09-01', location: 'Jl. Cikarang Pusat', problemCategory: 'Tabrakan', problemDesc: 'Benturan ringan dari belakang oleh kendaraan lain, bumper belakang penyok dan lampu retak', severity: 'MEDIUM', technicianAssigned: 'Firman Wibowo', estimatedRepairDays: 2, repairCost: 5500000, insuranceClaim: true, claimNo: 'CLM-2026-00870', status: 'DONE', repairProgress: 100 },
  { id: '6', reportNo: 'RPT-2026-09006', vehiclePlate: 'B 3344 KXF', vehicleType: 'Truck Wingbox 15T', brand: 'Mitsubishi Fuso', reportedBy: 'Rudi Hermawan (Driver)', reportDate: '2026-09-04', location: 'Pelabuhan Belawan, Medan', problemCategory: 'Mesin', problemDesc: 'Turbocharger bersuara kasar, tenaga mesin drop drastis saat muatan penuh', severity: 'MEDIUM', technicianAssigned: 'Eko Prasetyo', estimatedRepairDays: 5, repairCost: 22000000, insuranceClaim: false, claimNo: '-', status: 'REPORTED', repairProgress: 0 },
  { id: '7', reportNo: 'RPT-2026-09007', vehiclePlate: 'B 9876 KXB', vehicleType: 'Trailer 40ft', brand: 'Hino 500', reportedBy: 'Budi Kurniawan (Driver)', reportDate: '2026-08-30', location: 'Workshop Utama - Cikarang', problemCategory: 'Transmisi', problemDesc: 'Transmisi slip - gigi 4 dan 5 tidak bisa masuk, perlu overhaul transmisi', severity: 'CRITICAL', technicianAssigned: 'Agus Wijaya', estimatedRepairDays: 7, repairCost: 35000000, insuranceClaim: false, claimNo: '-', status: 'REPAIRING', repairProgress: 45 },
];

export const UnitRusakPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [units, setUnits] = useState<DamagedUnit[]>(dummyDamaged);

  const [newReport, setNewReport] = useState({
    vehiclePlate: 'B 9123 KXA',
    problemCategory: 'Mesin',
    problemDesc: '',
    location: '',
    severity: 'MEDIUM' as Severity,
    reportedBy: 'Driver',
    technicianAssigned: 'Budi Santoso',
    repairCost: 5000000,
  });

  const statusBadge = (s: DamagedStatus) => {
    const map: Record<DamagedStatus, { cls: string; label: string }> = {
      REPORTED: { cls: 'bg-slate-100 text-slate-600', label: 'Dilaporkan' },
      PENDING_ASSESSMENT: { cls: 'bg-amber-100 text-amber-700', label: 'Asesmen' },
      REPAIRING: { cls: 'bg-blue-100 text-blue-700', label: 'Diperbaiki' },
      WAITING_PARTS: { cls: 'bg-orange-100 text-orange-700', label: 'Tunggu Parts' },
      DONE: { cls: 'bg-emerald-100 text-emerald-700', label: 'Selesai' },
      WRITE_OFF: { cls: 'bg-rose-100 text-rose-700', label: 'Write Off' },
    };
    const d = map[s];
    return <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px]`}>{d.label}</span>;
  };

  const severityBadge = (s: Severity) => {
    const map = {
      LOW: 'bg-slate-100 text-slate-600',
      MEDIUM: 'bg-amber-100 text-amber-700',
      HIGH: 'bg-orange-100 text-orange-700',
      CRITICAL: 'bg-rose-100 text-rose-700',
    };
    return <span className={`${map[s]} font-bold text-[10px] px-2 py-0.5 rounded`}>{s}</span>;
  };

  const filtered = units.filter(u => {
    const q = search.toLowerCase();
    const match = u.reportNo.toLowerCase().includes(q) || u.vehiclePlate.toLowerCase().includes(q) || u.problemDesc.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || u.status === filterStatus) && (filterSeverity === 'ALL' || u.severity === filterSeverity);
  });

  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: DamagedUnit = {
      id: String(units.length + 1),
      reportNo: `RPT-2026-090${String(units.length + 8).padStart(2, '0')}`,
      vehiclePlate: newReport.vehiclePlate,
      vehicleType: 'Truck',
      brand: '-',
      reportedBy: newReport.reportedBy,
      reportDate: '2026-09-03',
      location: newReport.location || 'Jakarta',
      problemCategory: newReport.problemCategory,
      problemDesc: newReport.problemDesc || 'Kerusakan baru',
      severity: newReport.severity,
      technicianAssigned: newReport.technicianAssigned,
      estimatedRepairDays: 2,
      repairCost: newReport.repairCost,
      insuranceClaim: false,
      claimNo: '-',
      status: 'REPORTED',
      repairProgress: 0,
    };
    setUnits([next, ...units]);
    setShowModal(false);
    alert(`✅ Laporan kerusakan ${next.reportNo} berhasil dibuat!`);
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Unit Rusak & Penanganan Darurat</h2>
            <p className="text-xs text-slate-500">Laporan kerusakan kendaraan, tingkat keparahan, dan progress perbaikan</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export laporan unit rusak')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Laporkan Kerusakan</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Rusak', val: units.length, color: 'text-rose-600', sub: 'Unit Tercatat' },
          { label: 'Critical', val: units.filter(u => u.severity === 'CRITICAL').length, color: 'text-rose-700', sub: 'Prioritas Darurat' },
          { label: 'Sedang Diperbaiki', val: units.filter(u => u.status === 'REPAIRING').length, color: 'text-blue-600', sub: 'Di Bengkel' },
          { label: 'Selesai Bulan Ini', val: units.filter(u => u.status === 'DONE').length, color: 'text-emerald-600', sub: 'Unit Kembali Beroperasi' },
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
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari No. Laporan, Plat, Deskripsi Kerusakan..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="REPORTED">Dilaporkan</option>
          <option value="PENDING_ASSESSMENT">Asesmen</option>
          <option value="REPAIRING">Diperbaiki</option>
          <option value="WAITING_PARTS">Tunggu Parts</option>
          <option value="DONE">Selesai</option>
        </select>
        <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Severity</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Unit Rusak</h3>
          <span className="text-xs text-slate-500">{filtered.length} laporan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. Laporan</th>
                <th className="p-3.5">Kendaraan</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Deskripsi Kerusakan</th>
                <th className="p-3.5">Lokasi</th>
                <th className="p-3.5">Teknisi</th>
                <th className="p-3.5 text-right">Est. Biaya</th>
                <th className="p-3.5">Progress</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-rose-600">{u.reportNo}</div>
                    <div className="text-[10px] text-slate-400">{u.reportDate}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{u.vehiclePlate}</div>
                    <div className="text-[11px] text-slate-400">{u.vehicleType}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded">{u.problemCategory}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 max-w-[200px] truncate" title={u.problemDesc}>{u.problemDesc}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Oleh: {u.reportedBy}</div>
                  </td>
                  <td className="p-3.5 text-slate-700 max-w-[120px] truncate" title={u.location}>{u.location}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <Wrench size={11} className="text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700">{u.technicianAssigned}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">~{u.estimatedRepairDays} hari</div>
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900">{fmt(u.repairCost)}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5 min-w-[50px]">
                        <div className={`h-1.5 rounded-full transition-all ${u.repairProgress >= 100 ? 'bg-emerald-500' : u.repairProgress >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${u.repairProgress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">{u.repairProgress}%</span>
                    </div>
                  </td>
                  <td className="p-3.5">{severityBadge(u.severity)}</td>
                  <td className="p-3.5">{statusBadge(u.status)}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => alert(`Detail: ${u.reportNo}\n${u.problemDesc}\nAsuransi: ${u.insuranceClaim ? u.claimNo : 'Tidak'}`)} className="text-rose-600 hover:text-rose-800 font-semibold text-[11px] flex items-center gap-0.5">
                        <Eye size={11} /> Detail
                      </button>
                    </div>
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
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-600" /> Laporkan Kerusakan Unit
            </h3>
            <p className="text-xs text-slate-500 mb-4">Lengkapi detail kerusakan kendaraan untuk segera ditangani</p>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Plat Kendaraan</label>
                  <select value={newReport.vehiclePlate} onChange={e => setNewReport({ ...newReport, vehiclePlate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>B 9123 KXA</option><option>B 9876 KXB</option><option>B 4567 KXC</option><option>B 1289 KXD</option><option>B 1122 KXE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kategori Kerusakan</label>
                  <select value={newReport.problemCategory} onChange={e => setNewReport({ ...newReport, problemCategory: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Mesin</option><option>Ban & Roda</option><option>Kelistrikan</option><option>Suspensi</option><option>Transmisi</option><option>Tabrakan</option><option>Rem</option><option>Lainnya</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Deskripsi Kerusakan</label>
                <textarea required rows={3} placeholder="Jelaskan kondisi kerusakan secara detail..." value={newReport.problemDesc} onChange={e => setNewReport({ ...newReport, problemDesc: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 resize-none" />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Lokasi Kejadian</label>
                <input type="text" required placeholder="e.g. Tol Jakarta-Cikampek KM 47" value={newReport.location} onChange={e => setNewReport({ ...newReport, location: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tingkat Keparahan</label>
                  <select value={newReport.severity} onChange={e => setNewReport({ ...newReport, severity: e.target.value as Severity })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option value="LOW">LOW</option><option value="MEDIUM">MEDIUM</option><option value="HIGH">HIGH</option><option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Teknisi Assigned</label>
                  <select value={newReport.technicianAssigned} onChange={e => setNewReport({ ...newReport, technicianAssigned: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Budi Santoso</option><option>Agus Wijaya</option><option>Joko Susilo</option><option>Eko Prasetyo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Estimasi Biaya Perbaikan (Rp)</label>
                <input type="number" value={newReport.repairCost} onChange={e => setNewReport({ ...newReport, repairCost: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 text-xs">Simpan Laporan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
