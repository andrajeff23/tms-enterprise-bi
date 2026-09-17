import React, { useState } from 'react';
import {
  FileCheck2, Search, Download, CheckCircle, Clock,
  AlertCircle, XCircle, Eye, Camera, Upload, Star
} from 'lucide-react';

type PODStatus = 'PENDING_UPLOAD' | 'UPLOADED' | 'VERIFIED' | 'DISPUTED' | 'REJECTED';

interface PODRecord {
  id: string;
  podNo: string;
  doRef: string;
  driverName: string;
  customerName: string;
  deliveryDate: string;
  uploadDate: string;
  receivedBy: string;
  receiverTitle: string;
  signatureStatus: 'SIGNED' | 'UNSIGNED' | 'DIGITAL';
  photoCount: number;
  status: PODStatus;
  note: string;
  condition: 'GOOD' | 'PARTIAL' | 'DAMAGED';
}

const dummyPODs: PODRecord[] = [
  { id: '1', podNo: 'POD-2026-09001', doRef: 'DO-2026-09001', driverName: 'Slamet Rahardjo', customerName: 'PT. ABC Indonesia', deliveryDate: '2026-09-04', uploadDate: '2026-09-04', receivedBy: 'Budi Santoso', receiverTitle: 'Kepala Gudang', signatureStatus: 'SIGNED', photoCount: 4, status: 'VERIFIED', note: 'Semua barang diterima dalam kondisi baik', condition: 'GOOD' },
  { id: '2', podNo: 'POD-2026-09002', doRef: 'DO-2026-09002', driverName: 'Budi Kurniawan', customerName: 'PT. XYZ Nusantara', deliveryDate: '2026-09-05', uploadDate: '2026-09-05', receivedBy: 'Dewi Rahayu', receiverTitle: 'Staff Penerimaan', signatureStatus: 'DIGITAL', photoCount: 3, status: 'UPLOADED', note: '2 roll kain lecek kecil, sisanya OK', condition: 'PARTIAL' },
  { id: '3', podNo: 'POD-2026-09003', doRef: 'DO-2026-09003', driverName: 'Andi Saputra', customerName: 'PT. Maju Bersama', deliveryDate: '2026-09-03', uploadDate: '2026-09-03', receivedBy: 'Hendra Wijaya', receiverTitle: 'Manajer Logistik', signatureStatus: 'SIGNED', photoCount: 5, status: 'VERIFIED', note: 'Diterima lengkap dan tepat waktu', condition: 'GOOD' },
  { id: '4', podNo: 'POD-2026-09004', doRef: 'DO-2026-09004', driverName: 'Hendra Gunawan', customerName: 'PT. Sukses Makmur', deliveryDate: '-', uploadDate: '-', receivedBy: '-', receiverTitle: '-', signatureStatus: 'UNSIGNED', photoCount: 0, status: 'PENDING_UPLOAD', note: 'Dalam perjalanan ke Balikpapan', condition: 'GOOD' },
  { id: '5', podNo: 'POD-2026-09005', doRef: 'DO-2026-09005', driverName: 'Dedi Setiawan', customerName: 'PT. Sejahtera Abadi', deliveryDate: '-', uploadDate: '-', receivedBy: '-', receiverTitle: '-', signatureStatus: 'UNSIGNED', photoCount: 0, status: 'PENDING_UPLOAD', note: 'Menunggu konfirmasi lokasi', condition: 'GOOD' },
  { id: '6', podNo: 'POD-2026-09006', doRef: 'DO-2026-09006', driverName: 'Rudi Hermawan', customerName: 'PT. Nusantara Jaya', deliveryDate: '2026-09-04', uploadDate: '2026-09-05', receivedBy: 'Eko Purnama', receiverTitle: 'Supervisor Gudang', signatureStatus: 'SIGNED', photoCount: 6, status: 'VERIFIED', note: 'Serah terima berjalan lancar', condition: 'GOOD' },
  { id: '7', podNo: 'POD-2026-09007', doRef: 'DO-2026-09007', driverName: 'Eko Prasetyo', customerName: 'PT. Pangan Nusantara', deliveryDate: '2026-09-04', uploadDate: '2026-09-04', receivedBy: 'Ahmad Fauzi', receiverTitle: 'Kepala Divisi Logistik', signatureStatus: 'DIGITAL', photoCount: 7, status: 'UPLOADED', note: 'Pending verifikasi final', condition: 'GOOD' },
  { id: '8', podNo: 'POD-2026-09008', doRef: 'DO-2026-09008', driverName: 'Agus Wijaya', customerName: 'PT. Motor Bersama', deliveryDate: '2026-09-02', uploadDate: '2026-09-02', receivedBy: '-', receiverTitle: '-', signatureStatus: 'UNSIGNED', photoCount: 2, status: 'DISPUTED', note: '3 karton spare part dalam kondisi rusak/penyok - klaim asuransi diajukan', condition: 'DAMAGED' },
  { id: '9', podNo: 'POD-2026-09009', doRef: 'DO-2026-09009', driverName: 'Firman Wibowo', customerName: 'PT. Mitra Logistik', deliveryDate: '2026-09-05', uploadDate: '2026-09-05', receivedBy: 'Sari Dewi', receiverTitle: 'Admin Gudang', signatureStatus: 'SIGNED', photoCount: 3, status: 'REJECTED', note: 'Foto bukti tidak jelas, diminta upload ulang', condition: 'GOOD' },
];

export const PODPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedPOD, setSelectedPOD] = useState<PODRecord | null>(null);

  const statusBadge = (s: PODStatus) => {
    const map: Record<PODStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      PENDING_UPLOAD: { cls: 'bg-slate-100 text-slate-600', icon: <Clock size={11} />, label: 'Menunggu Upload' },
      UPLOADED: { cls: 'bg-amber-100 text-amber-700', icon: <Upload size={11} />, label: 'Sudah Upload' },
      VERIFIED: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Terverifikasi' },
      DISPUTED: { cls: 'bg-orange-100 text-orange-700', icon: <AlertCircle size={11} />, label: 'Sengketa' },
      REJECTED: { cls: 'bg-rose-100 text-rose-700', icon: <XCircle size={11} />, label: 'Ditolak' },
    };
    const d = map[s];
    return (
      <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>
        {d.icon} {d.label}
      </span>
    );
  };

  const conditionBadge = (c: PODRecord['condition']) => {
    if (c === 'GOOD') return <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded">✓ Baik</span>;
    if (c === 'PARTIAL') return <span className="bg-amber-50 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded">⚠ Sebagian</span>;
    return <span className="bg-rose-50 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded">✗ Rusak</span>;
  };

  const signBadge = (s: PODRecord['signatureStatus']) => {
    if (s === 'SIGNED') return <span className="text-emerald-600 font-bold text-[10px]">✍ Fisik</span>;
    if (s === 'DIGITAL') return <span className="text-blue-600 font-bold text-[10px]">📱 Digital</span>;
    return <span className="text-slate-400 font-bold text-[10px]">✗ Belum</span>;
  };

  const filtered = dummyPODs.filter(p => {
    const q = search.toLowerCase();
    const match = p.podNo.toLowerCase().includes(q) || p.doRef.toLowerCase().includes(q) || p.driverName.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || p.status === filterStatus);
  });

  const kpi = [
    { label: 'Total POD', val: dummyPODs.length, color: 'text-slate-800' },
    { label: 'Pending Upload', val: dummyPODs.filter(p => p.status === 'PENDING_UPLOAD').length, color: 'text-amber-600' },
    { label: 'Terverifikasi', val: dummyPODs.filter(p => p.status === 'VERIFIED').length, color: 'text-emerald-600' },
    { label: 'Sengketa / Reject', val: dummyPODs.filter(p => p.status === 'DISPUTED' || p.status === 'REJECTED').length, color: 'text-rose-600' },
  ];

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
            <FileCheck2 size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Proof of Delivery (POD)</h2>
            <p className="text-xs text-slate-500">Bukti serah terima pengiriman, tanda tangan, dan dokumentasi foto</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export laporan POD')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => alert('Upload POD Baru')} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Upload size={16} /> <span>Upload POD</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari No. POD, DO, Driver, Customer..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="PENDING_UPLOAD">Pending Upload</option>
          <option value="UPLOADED">Sudah Upload</option>
          <option value="VERIFIED">Terverifikasi</option>
          <option value="DISPUTED">Sengketa</option>
          <option value="REJECTED">Ditolak</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Proof of Delivery</h3>
          <span className="text-xs text-slate-500">{filtered.length} POD</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. POD / DO</th>
                <th className="p-3.5">Driver</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Tgl Terima</th>
                <th className="p-3.5">Penerima</th>
                <th className="p-3.5">Tanda Tangan</th>
                <th className="p-3.5 text-center">Foto</th>
                <th className="p-3.5">Kondisi</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-teal-600">{p.podNo}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.doRef}</div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{p.driverName}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{p.customerName}</td>
                  <td className="p-3.5 text-slate-700">{p.deliveryDate}</td>
                  <td className="p-3.5">
                    {p.receivedBy !== '-' ? (
                      <div>
                        <div className="font-semibold text-slate-800">{p.receivedBy}</div>
                        <div className="text-[10px] text-slate-400">{p.receiverTitle}</div>
                      </div>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="p-3.5">{signBadge(p.signatureStatus)}</td>
                  <td className="p-3.5 text-center">
                    {p.photoCount > 0 ? (
                      <div className="flex items-center justify-center gap-1 font-bold text-slate-700">
                        <Camera size={12} className="text-slate-400" /> {p.photoCount}
                      </div>
                    ) : <span className="text-slate-300 text-[10px]">0</span>}
                  </td>
                  <td className="p-3.5">{conditionBadge(p.condition)}</td>
                  <td className="p-3.5">{statusBadge(p.status)}</td>
                  <td className="p-3.5 text-center">
                    <button onClick={() => setSelectedPOD(p)} className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 font-semibold text-[11px]">
                      <Eye size={12} /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPOD && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 size={18} className="text-teal-600" /> {selectedPOD.podNo}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">Referensi DO: <span className="font-bold text-slate-700">{selectedPOD.doRef}</span></div>
              </div>
              <div>{statusBadge(selectedPOD.status)}</div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Driver</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedPOD.driverName}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Customer</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedPOD.customerName}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Tgl. Terima</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedPOD.deliveryDate}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Tgl. Upload</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedPOD.uploadDate}</div>
                </div>
              </div>
              {selectedPOD.receivedBy !== '-' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="text-emerald-600 font-bold text-[10px] uppercase mb-1">Penerima Barang</div>
                  <div className="font-bold text-slate-900">{selectedPOD.receivedBy}</div>
                  <div className="text-slate-500">{selectedPOD.receiverTitle}</div>
                  <div className="mt-1 flex items-center gap-2">
                    {signBadge(selectedPOD.signatureStatus)}
                    <span className="text-slate-400">·</span>
                    {conditionBadge(selectedPOD.condition)}
                  </div>
                </div>
              )}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-slate-400 font-semibold uppercase text-[10px] mb-1">Catatan</div>
                <div className="text-slate-700">{selectedPOD.note}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera size={14} className="text-slate-400" />
                  <span className="font-bold text-slate-700">{selectedPOD.photoCount} foto terlampir</span>
                </div>
                {selectedPOD.photoCount > 0 && (
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(selectedPOD.photoCount, 4) }).map((_, i) => (
                      <div key={i} className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                        <Star size={12} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              {selectedPOD.status === 'UPLOADED' && (
                <button onClick={() => { alert(`POD ${selectedPOD.podNo} berhasil diverifikasi`); setSelectedPOD(null); }} className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 text-xs">Verifikasi POD</button>
              )}
              <button onClick={() => setSelectedPOD(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
