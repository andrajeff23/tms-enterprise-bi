import React, { useState } from 'react';
import {
  Building2, Search, Download, CheckCircle, Clock, XCircle,
  Plus, Eye, Phone, AlertCircle, Calendar
} from 'lucide-react';

type CollectionStatus = 'CURRENT' | 'FOLLOW_UP' | 'OVERDUE' | 'PROMISE_TO_PAY' | 'DISPUTE' | 'WRITTEN_OFF';

interface CollectionRecord {
  id: string;
  invoiceRef: string;
  customerName: string;
  picName: string;
  picPhone: string;
  invoiceDate: string;
  dueDate: string;
  invoiceAmount: number;
  paidAmount: number;
  outstanding: number;
  overdueDays: number;
  lastContactDate: string;
  nextFollowUp: string;
  promiseDate: string;
  promiseAmount: number;
  status: CollectionStatus;
  collectorName: string;
  note: string;
}

const dummyCollections: CollectionRecord[] = [
  { id: '1', invoiceRef: 'INV-2026-002', customerName: 'PT. XYZ Nusantara', picName: 'Agus Setiawan', picPhone: '0813-9876-5432', invoiceDate: '2026-05-28', dueDate: '2026-06-12', invoiceAmount: 980000000, paidAmount: 500000000, outstanding: 480000000, overdueDays: 83, lastContactDate: '2026-09-02', nextFollowUp: '2026-09-05', promiseDate: '2026-09-10', promiseAmount: 480000000, status: 'PROMISE_TO_PAY', collectorName: 'Ahmad Fauzi', note: 'Customer janji bayar sisa 480 jt tanggal 10 Sept' },
  { id: '2', invoiceRef: 'INV-2026-003', customerName: 'PT. Maju Bersama', picName: 'Dewi Lestari', picPhone: '0815-1122-3344', invoiceDate: '2026-05-20', dueDate: '2026-06-05', invoiceAmount: 760000000, paidAmount: 380000000, outstanding: 380000000, overdueDays: 90, lastContactDate: '2026-09-01', nextFollowUp: '2026-09-04', promiseDate: '2026-09-15', promiseAmount: 200000000, status: 'OVERDUE', collectorName: 'Sari Dewi', note: 'Cicilan pertama Rp 200 jt dijanjikan 15 Sept' },
  { id: '3', invoiceRef: 'INV-2026-004', customerName: 'PT. Sukses Makmur', picName: 'Hendra Gunawan', picPhone: '0817-5566-7788', invoiceDate: '2026-05-10', dueDate: '2026-05-25', invoiceAmount: 420000000, paidAmount: 0, outstanding: 420000000, overdueDays: 101, lastContactDate: '2026-08-28', nextFollowUp: '2026-09-05', promiseDate: '-', promiseAmount: 0, status: 'DISPUTE', collectorName: 'Ahmad Fauzi', note: 'Customer dispute - mengklaim ada selisih tarif yang perlu diklarifikasi' },
  { id: '4', invoiceRef: 'INV-2026-008', customerName: 'PT. Motor Bersama', picName: 'Rudi Santoso', picPhone: '0812-3344-5566', invoiceDate: '2026-08-15', dueDate: '2026-09-05', invoiceAmount: 280000000, paidAmount: 0, outstanding: 280000000, overdueDays: -2, lastContactDate: '2026-09-01', nextFollowUp: '2026-09-06', promiseDate: '2026-09-08', promiseAmount: 280000000, status: 'FOLLOW_UP', collectorName: 'Sari Dewi', note: 'Tagihan baru jatuh tempo, sudah dikontak 1x' },
  { id: '5', invoiceRef: 'INV-2026-009', customerName: 'PT. Nusantara Jaya', picName: 'Eko Purnama', picPhone: '0819-7788-9900', invoiceDate: '2026-08-20', dueDate: '2026-09-20', invoiceAmount: 675000000, paidAmount: 0, outstanding: 675000000, overdueDays: -17, lastContactDate: '2026-09-03', nextFollowUp: '2026-09-17', promiseDate: '2026-09-20', promiseAmount: 675000000, status: 'CURRENT', collectorName: 'Ahmad Fauzi', note: 'Belum jatuh tempo, customer konfirmasi akan bayar tepat waktu' },
  { id: '6', invoiceRef: 'INV-2026-007', customerName: 'PT. Pangan Nusantara', picName: 'Ahmad Fauzi', picPhone: '0812-1234-5678', invoiceDate: '2026-08-10', dueDate: '2026-09-10', invoiceAmount: 920000000, paidAmount: 920000000, outstanding: 0, overdueDays: -7, lastContactDate: '2026-09-01', nextFollowUp: '-', promiseDate: '-', promiseAmount: 0, status: 'CURRENT', collectorName: 'Sari Dewi', note: 'Lunas - pembayaran diterima 01 Sept 2026' },
];

export const PenagihanPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const statusBadge = (s: CollectionStatus) => {
    const map: Record<CollectionStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      CURRENT: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Current' },
      FOLLOW_UP: { cls: 'bg-blue-100 text-blue-700', icon: <Phone size={11} />, label: 'Follow Up' },
      OVERDUE: { cls: 'bg-rose-100 text-rose-700', icon: <AlertCircle size={11} />, label: 'Overdue' },
      PROMISE_TO_PAY: { cls: 'bg-amber-100 text-amber-700', icon: <Calendar size={11} />, label: 'Janji Bayar' },
      DISPUTE: { cls: 'bg-orange-100 text-orange-700', icon: <XCircle size={11} />, label: 'Dispute' },
      WRITTEN_OFF: { cls: 'bg-slate-100 text-slate-600', icon: <XCircle size={11} />, label: 'Write Off' },
    };
    const d = map[s];
    return <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>{d.icon} {d.label}</span>;
  };

  const fmtFull = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const fmt = (n: number) => n > 0 ? `Rp ${(n / 1000000).toFixed(0)} Jt` : '-';

  const totalOutstanding = dummyCollections.filter(c => c.outstanding > 0).reduce((s, c) => s + c.outstanding, 0);
  const overdueCount = dummyCollections.filter(c => c.overdueDays > 0 && c.outstanding > 0).length;
  const totalOverdue = dummyCollections.filter(c => c.overdueDays > 0 && c.outstanding > 0).reduce((s, c) => s + c.outstanding, 0);

  const filtered = dummyCollections.filter(c => {
    const q = search.toLowerCase();
    const match = c.invoiceRef.toLowerCase().includes(q) || c.customerName.toLowerCase().includes(q) || c.picName.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || c.status === filterStatus);
  });

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-md">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Penagihan & Collection</h2>
            <p className="text-xs text-slate-500">Monitor outstanding invoice, follow up, dan janji bayar customer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export laporan penagihan')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Tambah Tagihan</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Outstanding</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{fmt(totalOutstanding)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{dummyCollections.filter(c => c.outstanding > 0).length} invoice belum lunas</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-rose-600 uppercase">Tagihan Overdue</div>
          <div className="text-xl font-extrabold text-rose-700 mt-1">{fmt(totalOverdue)}</div>
          <div className="text-[10px] text-rose-500 mt-1">{overdueCount} customer melewati jatuh tempo</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase">Janji Bayar</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">{fmt(dummyCollections.filter(c => c.status === 'PROMISE_TO_PAY').reduce((s, c) => s + c.promiseAmount, 0))}</div>
          <div className="text-[10px] text-amber-500 mt-1">{dummyCollections.filter(c => c.status === 'PROMISE_TO_PAY').length} janji bayar aktif</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Kolektor Aktif</div>
          <div className="text-xl font-extrabold text-slate-800 mt-1">2</div>
          <div className="text-[10px] text-slate-400 mt-1">Ahmad Fauzi & Sari Dewi</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari Invoice, Customer, PIC..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="CURRENT">Current</option>
          <option value="FOLLOW_UP">Follow Up</option>
          <option value="OVERDUE">Overdue</option>
          <option value="PROMISE_TO_PAY">Janji Bayar</option>
          <option value="DISPUTE">Dispute</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Monitoring Tagihan & Collection</h3>
          <span className="text-xs text-slate-500">{filtered.length} tagihan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Invoice</th>
                <th className="p-3.5">Customer / PIC</th>
                <th className="p-3.5">Jatuh Tempo</th>
                <th className="p-3.5 text-right">Total Invoice</th>
                <th className="p-3.5 text-right">Outstanding</th>
                <th className="p-3.5 text-center">Hari Telat</th>
                <th className="p-3.5">Janji Bayar</th>
                <th className="p-3.5">Kolektor</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-blue-600">{c.invoiceRef}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.customerName}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Phone size={10} />
                      <span>{c.picName} · {c.picPhone}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-700">{c.dueDate}</div>
                    <div className="text-[10px] text-slate-400">FU: {c.nextFollowUp}</div>
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900">{fmtFull(c.invoiceAmount)}</td>
                  <td className="p-3.5 text-right font-bold">
                    {c.outstanding > 0 ? <span className="text-rose-600">{fmtFull(c.outstanding)}</span> : <span className="text-emerald-600">Lunas</span>}
                  </td>
                  <td className="p-3.5 text-center">
                    {c.outstanding > 0 && c.overdueDays > 0 ? (
                      <span className="bg-rose-100 text-rose-700 font-bold text-[11px] px-2 py-0.5 rounded-full">{c.overdueDays} hari</span>
                    ) : c.outstanding === 0 ? (
                      <span className="text-emerald-500 text-[10px] font-bold">-</span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">{Math.abs(c.overdueDays)}h lagi</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {c.promiseDate !== '-' ? (
                      <div>
                        <div className="font-semibold text-slate-700">{c.promiseDate}</div>
                        <div className="text-[10px] text-amber-600">{fmt(c.promiseAmount)}</div>
                      </div>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">{c.collectorName}</td>
                  <td className="p-3.5">{statusBadge(c.status)}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => alert(`Follow up call: ${c.customerName}\nPIC: ${c.picName}\nPhone: ${c.picPhone}`)} className="text-emerald-600 hover:text-emerald-800 font-semibold text-[11px] flex items-center gap-0.5">
                        <Phone size={11} /> Call
                      </button>
                      <button onClick={() => alert(`Detail tagihan: ${c.invoiceRef}\nCatatan: ${c.note}`)} className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-0.5">
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

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 size={18} className="text-rose-600" /> Tambah Tagihan Penagihan
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Referensi Invoice</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                  <option>INV-2026-010 (PT. Baru)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nama PIC</label>
                  <input type="text" placeholder="Nama PIC customer" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">No. HP PIC</label>
                  <input type="text" placeholder="0812-XXXX-XXXX" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tanggal Follow Up Berikutnya</label>
                <input type="date" defaultValue="2026-09-05" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Catatan</label>
                <textarea rows={3} placeholder="Hasil kontak, janji pembayaran, dll." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 resize-none" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button onClick={() => { setShowModal(false); alert('Tagihan berhasil ditambahkan!'); }} className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 text-xs">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
