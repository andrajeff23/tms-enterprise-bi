import React, { useState } from 'react';
import {
  FileText, Download, Plus, Search, CheckCircle, Clock,
  AlertCircle, Eye, Send, Printer, TrendingUp, TrendingDown
} from 'lucide-react';

type InvoiceStatus = 'PAID' | 'UNPAID' | 'OVERDUE' | 'DRAFT' | 'PARTIAL';

interface Invoice {
  id: string;
  customer: string;
  customerCode: string;
  description: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  doCount: number;
  termDays: number;
  overdueDays: number;
  createdBy: string;
}

const invoices: Invoice[] = [
  { id: 'INV-2026-001', customer: 'PT. ABC Indonesia', customerCode: 'CUST-001', description: 'Jasa Pengiriman Mei 2026 (Batch 1)', invoiceDate: '2026-05-31', dueDate: '2026-06-15', amount: 1250000000, paidAmount: 1250000000, status: 'PAID', doCount: 14, termDays: 15, overdueDays: 0, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-002', customer: 'PT. XYZ Nusantara', customerCode: 'CUST-002', description: 'Jasa Pengiriman Mei 2026', invoiceDate: '2026-05-28', dueDate: '2026-06-12', amount: 980000000, paidAmount: 500000000, status: 'PARTIAL', doCount: 11, termDays: 15, overdueDays: 83, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-003', customer: 'PT. Maju Bersama', customerCode: 'CUST-003', description: 'Jasa Pengiriman Mei 2026', invoiceDate: '2026-05-20', dueDate: '2026-06-05', amount: 760000000, paidAmount: 380000000, status: 'PARTIAL', doCount: 9, termDays: 15, overdueDays: 90, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-004', customer: 'PT. Sukses Makmur', customerCode: 'CUST-004', description: 'Jasa Pengiriman April 2026', invoiceDate: '2026-05-10', dueDate: '2026-05-25', amount: 420000000, paidAmount: 0, status: 'OVERDUE', doCount: 5, termDays: 15, overdueDays: 101, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-005', customer: 'PT. Sejahtera Abadi', customerCode: 'CUST-005', description: 'Jasa Pengiriman April 2026', invoiceDate: '2026-05-01', dueDate: '2026-05-15', amount: 380000000, paidAmount: 380000000, status: 'PAID', doCount: 7, termDays: 15, overdueDays: 0, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-006', customer: 'PT. Nusantara Jaya', customerCode: 'CUST-006', description: 'Jasa Pengiriman Agustus 2026', invoiceDate: '2026-08-31', dueDate: '2026-09-15', amount: 675000000, paidAmount: 0, status: 'UNPAID', doCount: 8, termDays: 15, overdueDays: 0, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-007', customer: 'PT. Pangan Nusantara', customerCode: 'CUST-007', description: 'Jasa Pengiriman Agustus 2026', invoiceDate: '2026-08-25', dueDate: '2026-09-10', amount: 920000000, paidAmount: 920000000, status: 'PAID', doCount: 10, termDays: 15, overdueDays: 0, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-008', customer: 'PT. Motor Bersama', customerCode: 'CUST-008', description: 'Jasa Pengiriman Agustus 2026', invoiceDate: '2026-08-20', dueDate: '2026-09-05', amount: 280000000, paidAmount: 0, status: 'OVERDUE', doCount: 4, termDays: 15, overdueDays: 2, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-009', customer: 'PT. ABC Indonesia', customerCode: 'CUST-001', description: 'Jasa Pengiriman Agustus 2026 (Batch 2)', invoiceDate: '2026-08-31', dueDate: '2026-09-15', amount: 1450000000, paidAmount: 0, status: 'UNPAID', doCount: 16, termDays: 15, overdueDays: 0, createdBy: 'Siti Rahayu' },
  { id: 'INV-2026-010', customer: 'PT. XYZ Nusantara', customerCode: 'CUST-002', description: 'Jasa Pengiriman Sept 2026 (Batch 1)', invoiceDate: '2026-09-01', dueDate: '2026-09-16', amount: 340000000, paidAmount: 0, status: 'DRAFT', doCount: 4, termDays: 15, overdueDays: 0, createdBy: 'Siti Rahayu' },
];

const fmtFull = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const fmtJt = (n: number) => `Rp ${(n / 1000000).toFixed(0)} Jt`;

export const FinancePage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const statusBadge = (s: InvoiceStatus) => {
    const map: Record<InvoiceStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      PAID: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Lunas' },
      UNPAID: { cls: 'bg-amber-100 text-amber-700', icon: <Clock size={11} />, label: 'Belum Bayar' },
      OVERDUE: { cls: 'bg-rose-100 text-rose-700', icon: <AlertCircle size={11} />, label: 'Jatuh Tempo' },
      PARTIAL: { cls: 'bg-blue-100 text-blue-700', icon: <Clock size={11} />, label: 'Bayar Sebagian' },
      DRAFT: { cls: 'bg-slate-100 text-slate-600', icon: <FileText size={11} />, label: 'Draft' },
    };
    const d = map[s];
    return <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>{d.icon} {d.label}</span>;
  };

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase();
    const match = inv.id.toLowerCase().includes(q) || inv.customer.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || inv.status === filterStatus);
  });

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === 'PAID').reduce((s, i) => s + i.amount, 0);
  const totalUnpaid = invoices.filter(i => i.status !== 'PAID' && i.status !== 'DRAFT').reduce((s, i) => s + (i.amount - i.paidAmount), 0);
  const totalOverdue = invoices.filter(i => i.status === 'OVERDUE').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Invoice Management</h2>
            <p className="text-xs text-slate-500">Kelola tagihan customer, status pembayaran, dan export invoice resmi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export semua invoice')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={15} /> Buat Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1"><TrendingUp size={11} /> Total Billed</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{fmtJt(totalRevenue)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{invoices.length} invoice</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-600 uppercase">✓ Sudah Dibayar</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{fmtJt(totalPaid)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{invoices.filter(i => i.status === 'PAID').length} invoice lunas</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase">⚠ Outstanding</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{fmtJt(totalUnpaid)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{invoices.filter(i => i.status !== 'PAID' && i.status !== 'DRAFT').length} invoice aktif</div>
        </div>
        <div className="bg-white border border-rose-100 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-rose-600 uppercase flex items-center gap-1"><TrendingDown size={11} /> Overdue</div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">{fmtJt(totalOverdue)}</div>
          <div className="text-[10px] text-rose-400 mt-1">{invoices.filter(i => i.status === 'OVERDUE').length} invoice melewati jatuh tempo</div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="text-slate-400 absolute left-3 top-2.5" />
          <input type="text" placeholder="Cari No. Invoice, Customer..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="DRAFT">Draft</option>
          <option value="UNPAID">Belum Bayar</option>
          <option value="PARTIAL">Bayar Sebagian</option>
          <option value="PAID">Lunas</option>
          <option value="OVERDUE">Jatuh Tempo</option>
        </select>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Invoice</h3>
          <span className="text-xs text-slate-500">{filtered.length} invoice</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. Invoice</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Deskripsi</th>
                <th className="p-3.5">Tgl Invoice</th>
                <th className="p-3.5">Jatuh Tempo</th>
                <th className="p-3.5 text-right">Total</th>
                <th className="p-3.5 text-right">Dibayar</th>
                <th className="p-3.5 text-right">Sisa</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(inv => (
                <tr key={inv.id} className={`hover:bg-slate-50/80 transition-colors ${inv.status === 'OVERDUE' ? 'bg-rose-50/20' : ''}`}>
                  <td className="p-3.5">
                    <div className="font-bold text-emerald-600">{inv.id}</div>
                    <div className="text-[10px] text-slate-400">{inv.doCount} DO</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{inv.customer}</div>
                    <div className="text-[10px] text-slate-400">{inv.customerCode}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-[160px] truncate" title={inv.description}>{inv.description}</td>
                  <td className="p-3.5 text-slate-700">{inv.invoiceDate}</td>
                  <td className="p-3.5">
                    <div className="text-slate-700">{inv.dueDate}</div>
                    {inv.overdueDays > 0 && (
                      <div className="text-[10px] text-rose-600 font-bold">{inv.overdueDays}h telat</div>
                    )}
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900">{fmtFull(inv.amount)}</td>
                  <td className="p-3.5 text-right">
                    {inv.paidAmount > 0 ? <span className="font-bold text-emerald-600">{fmtFull(inv.paidAmount)}</span> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="p-3.5 text-right font-bold">
                    {inv.amount - inv.paidAmount > 0 ? (
                      <span className={inv.status === 'OVERDUE' ? 'text-rose-600' : 'text-amber-600'}>{fmtFull(inv.amount - inv.paidAmount)}</span>
                    ) : <span className="text-emerald-600">Lunas</span>}
                  </td>
                  <td className="p-3.5">{statusBadge(inv.status)}</td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => alert(`Preview Invoice: ${inv.id}`)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Lihat">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => alert(`Print Invoice: ${inv.id}`)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Print">
                        <Printer size={13} />
                      </button>
                      {inv.status !== 'PAID' && (
                        <button onClick={() => alert(`Kirim Email Invoice: ${inv.id} → ${inv.customer}`)} className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Kirim Email">
                          <Send size={13} />
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

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-emerald-600" /> Buat Invoice Baru
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Customer</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                  {invoices.map((inv, i) => <option key={i}>{inv.customer}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Deskripsi Invoice</label>
                <input type="text" placeholder="Jasa Pengiriman September 2026" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Invoice</label>
                  <input type="date" defaultValue="2026-09-03" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Terms (hari)</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>15</option><option>30</option><option>45</option><option>60</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Pilih DO yang akan dimasukkan</label>
                <div className="bg-slate-50 border border-slate-300 rounded-lg p-2.5 space-y-1 max-h-28 overflow-y-auto">
                  {['DO-2026-09001', 'DO-2026-09002', 'DO-2026-09003', 'DO-2026-09004'].map(d => (
                    <label key={d} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="font-mono text-slate-700">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button onClick={() => { setShowModal(false); alert('Invoice INV-2026-011 berhasil dibuat dalam status Draft!'); }} className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 text-xs">Buat Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
