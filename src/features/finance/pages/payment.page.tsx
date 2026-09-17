import React, { useState } from 'react';
import {
  CreditCard, Search, Download, CheckCircle, Clock, XCircle,
  Plus, Eye, Banknote, TrendingUp
} from 'lucide-react';

type PaymentMethod = 'TRANSFER_BANK' | 'GIRO' | 'CEK' | 'TUNAI' | 'VIRTUAL_ACCOUNT';
type PaymentStatus = 'PENDING' | 'PROCESSING' | 'VERIFIED' | 'FAILED' | 'REFUNDED';

interface PaymentRecord {
  id: string;
  paymentNo: string;
  invoiceRef: string;
  customerName: string;
  paymentDate: string;
  dueDate: string;
  amount: number;
  method: PaymentMethod;
  bankName: string;
  accountNo: string;
  referenceNo: string;
  status: PaymentStatus;
  verifiedBy: string;
  note: string;
}

const dummyPayments: PaymentRecord[] = [
  { id: '1', paymentNo: 'PAY-2026-09001', invoiceRef: 'INV-2026-001', customerName: 'PT. ABC Indonesia', paymentDate: '2026-09-02', dueDate: '2026-06-15', amount: 1250000000, method: 'TRANSFER_BANK', bankName: 'BCA', accountNo: '1234567890', referenceNo: 'TRF-BCA-20260902-001', status: 'VERIFIED', verifiedBy: 'Ahmad Fauzi (Finance)', note: 'Pelunasan penuh INV Juni 2026' },
  { id: '2', paymentNo: 'PAY-2026-09002', invoiceRef: 'INV-2026-002', customerName: 'PT. XYZ Nusantara', paymentDate: '2026-09-01', dueDate: '2026-06-12', amount: 500000000, method: 'GIRO', bankName: 'Mandiri', accountNo: '0987654321', referenceNo: 'GRO-MDR-20260901-008', status: 'VERIFIED', verifiedBy: 'Sari Dewi (Finance)', note: 'Pembayaran DP 50% dari INV-002' },
  { id: '3', paymentNo: 'PAY-2026-09003', invoiceRef: 'INV-2026-003', customerName: 'PT. Maju Bersama', paymentDate: '2026-09-03', dueDate: '2026-06-05', amount: 380000000, method: 'TRANSFER_BANK', bankName: 'BNI', accountNo: '1122334455', referenceNo: 'TRF-BNI-20260903-015', status: 'PROCESSING', verifiedBy: '-', note: 'Menunggu konfirmasi rekening tujuan' },
  { id: '4', paymentNo: 'PAY-2026-09004', invoiceRef: 'INV-2026-004', customerName: 'PT. Sukses Makmur', paymentDate: '2026-08-30', dueDate: '2026-05-25', amount: 420000000, method: 'CEK', bankName: 'BRI', accountNo: '5544332211', referenceNo: 'CEK-BRI-2026-00234', status: 'PENDING', verifiedBy: '-', note: 'Cek belum dapat dicairkan - overdue 36 hari' },
  { id: '5', paymentNo: 'PAY-2026-09005', invoiceRef: 'INV-2026-005', customerName: 'PT. Sejahtera Abadi', paymentDate: '2026-09-02', dueDate: '2026-05-15', amount: 380000000, method: 'TRANSFER_BANK', bankName: 'BCA', accountNo: '6677889900', referenceNo: 'TRF-BCA-20260902-020', status: 'VERIFIED', verifiedBy: 'Ahmad Fauzi (Finance)', note: 'Pelunasan penuh INV Mei 2026' },
  { id: '6', paymentNo: 'PAY-2026-09006', invoiceRef: 'INV-2026-006', customerName: 'PT. Nusantara Jaya', paymentDate: '2026-09-03', dueDate: '2026-09-15', amount: 675000000, method: 'VIRTUAL_ACCOUNT', bankName: 'BCA Virtual Account', accountNo: '88001234567', referenceNo: 'VA-BCA-20260903-099', status: 'PENDING', verifiedBy: '-', note: 'Menunggu pembayaran VA dari customer' },
  { id: '7', paymentNo: 'PAY-2026-09007', invoiceRef: 'INV-2026-007', customerName: 'PT. Pangan Nusantara', paymentDate: '2026-09-01', dueDate: '2026-09-10', amount: 920000000, method: 'TRANSFER_BANK', bankName: 'Mandiri', accountNo: '3344556677', referenceNo: 'TRF-MDR-20260901-042', status: 'VERIFIED', verifiedBy: 'Sari Dewi (Finance)', note: '-' },
  { id: '8', paymentNo: 'PAY-2026-09008', invoiceRef: 'INV-2026-008', customerName: 'PT. Motor Bersama', paymentDate: '2026-08-25', dueDate: '2026-09-05', amount: 280000000, method: 'TRANSFER_BANK', bankName: 'BNI', accountNo: '9988776655', referenceNo: 'TRF-BNI-20260825-007', status: 'FAILED', verifiedBy: '-', note: 'Nomor rekening tidak valid, pembayaran dikembalikan ke customer' },
];

export const PaymentPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState<PaymentRecord[]>(dummyPayments);

  const statusBadge = (s: PaymentStatus) => {
    const map: Record<PaymentStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      PENDING: { cls: 'bg-amber-100 text-amber-700', icon: <Clock size={11} />, label: 'Pending' },
      PROCESSING: { cls: 'bg-blue-100 text-blue-700', icon: <Clock size={11} />, label: 'Processing' },
      VERIFIED: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Terverifikasi' },
      FAILED: { cls: 'bg-rose-100 text-rose-700', icon: <XCircle size={11} />, label: 'Gagal' },
      REFUNDED: { cls: 'bg-purple-100 text-purple-700', icon: <XCircle size={11} />, label: 'Refunded' },
    };
    const d = map[s];
    return <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>{d.icon} {d.label}</span>;
  };

  const methodBadge = (m: PaymentMethod) => {
    const map: Record<PaymentMethod, string> = {
      TRANSFER_BANK: 'bg-blue-50 text-blue-600',
      GIRO: 'bg-purple-50 text-purple-600',
      CEK: 'bg-amber-50 text-amber-600',
      TUNAI: 'bg-green-50 text-green-600',
      VIRTUAL_ACCOUNT: 'bg-indigo-50 text-indigo-600',
    };
    const label: Record<PaymentMethod, string> = {
      TRANSFER_BANK: 'Transfer Bank',
      GIRO: 'Giro',
      CEK: 'Cek',
      TUNAI: 'Tunai',
      VIRTUAL_ACCOUNT: 'Virtual Account',
    };
    return <span className={`${map[m]} font-bold text-[10px] px-2 py-0.5 rounded`}>{label[m]}</span>;
  };

  const fmt = (n: number) => `Rp ${(n / 1000000).toFixed(0)} Jt`;
  const fmtFull = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  const totalReceived = payments.filter(p => p.status === 'VERIFIED').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'PENDING' || p.status === 'PROCESSING').reduce((s, p) => s + p.amount, 0);

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    const match = p.paymentNo.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q) || p.invoiceRef.toLowerCase().includes(q) || p.referenceNo.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || p.status === filterStatus);
  });

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
            <CreditCard size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Penerimaan Pembayaran</h2>
            <p className="text-xs text-slate-500">Rekam dan verifikasi pembayaran customer atas tagihan invoice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export rekap pembayaran')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Input Pembayaran</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Diterima</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">{fmt(totalReceived)}</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-500 mt-1"><TrendingUp size={10} /> Sudah Terverifikasi</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase">Menunggu Konfirmasi</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">{fmt(totalPending)}</div>
          <div className="text-[10px] text-amber-500 mt-1">{payments.filter(p => p.status === 'PENDING' || p.status === 'PROCESSING').length} transaksi</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Transaksi Gagal</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{payments.filter(p => p.status === 'FAILED').length}</div>
          <div className="text-[10px] text-rose-400 mt-1">Perlu tindak lanjut</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Transaksi</div>
          <div className="text-xl font-extrabold text-violet-600 mt-1">{payments.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Bulan Sept 2026</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari No. Pembayaran, Customer, Invoice, Referensi..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="VERIFIED">Terverifikasi</option>
          <option value="FAILED">Gagal</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Riwayat Penerimaan Pembayaran</h3>
          <span className="text-xs text-slate-500">{filtered.length} transaksi</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. Pembayaran</th>
                <th className="p-3.5">Customer / Invoice</th>
                <th className="p-3.5">Tgl Bayar</th>
                <th className="p-3.5">Metode</th>
                <th className="p-3.5">Bank / Rekening</th>
                <th className="p-3.5">No. Referensi</th>
                <th className="p-3.5 text-right">Nominal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-violet-600">{p.paymentNo}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{p.customerName}</div>
                    <div className="text-[11px] text-blue-500 font-mono">{p.invoiceRef}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-700">{p.paymentDate}</div>
                    <div className="text-[10px] text-slate-400">JT: {p.dueDate}</div>
                  </td>
                  <td className="p-3.5">{methodBadge(p.method)}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-700">{p.bankName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.accountNo}</div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-600">{p.referenceNo}</td>
                  <td className="p-3.5 text-right font-bold text-slate-900">{fmtFull(p.amount)}</td>
                  <td className="p-3.5">{statusBadge(p.status)}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {p.status === 'PROCESSING' && (
                        <button onClick={() => alert(`Pembayaran ${p.paymentNo} berhasil diverifikasi!`)} className="text-emerald-600 hover:text-emerald-800 font-semibold text-[11px] flex items-center gap-0.5">
                          <CheckCircle size={11} /> Verifikasi
                        </button>
                      )}
                      <button onClick={() => alert(`Detail: ${p.paymentNo}\nCatatan: ${p.note}`)} className="text-violet-600 hover:text-violet-800 font-semibold text-[11px] flex items-center gap-0.5">
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

      {/* Input Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-violet-600" /> Input Penerimaan Pembayaran
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Referensi Invoice</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                  <option>INV-2026-002 (PT. XYZ Nusantara)</option><option>INV-2026-003 (PT. Maju Bersama)</option><option>INV-2026-004 (PT. Sukses Makmur)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Metode Pembayaran</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Transfer Bank</option><option>Giro</option><option>Cek</option><option>Tunai</option><option>Virtual Account</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nama Bank</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>BCA</option><option>Mandiri</option><option>BNI</option><option>BRI</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">No. Referensi / Bukti Transfer</label>
                <input type="text" placeholder="TRF-BCA-20260903-XXX" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Pembayaran</label>
                  <input type="date" defaultValue="2026-09-03" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nominal (Rp)</label>
                  <input type="number" placeholder="980000000" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Catatan</label>
                <input type="text" placeholder="Catatan tambahan..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button onClick={() => { setShowModal(false); alert('Pembayaran berhasil diinput!'); }} className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 text-xs">Simpan Pembayaran</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
