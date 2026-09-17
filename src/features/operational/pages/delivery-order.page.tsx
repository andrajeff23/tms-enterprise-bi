import React, { useState } from 'react';
import {
  Truck, Plus, Search, Download, CheckCircle, Clock, AlertCircle,
  XCircle, FileText, Eye, Printer
} from 'lucide-react';

import type { DeliveryOrder, DOStatus } from '../operational.schema';
import { dummyDOs } from '../operational.constant';

export const DeliveryOrderPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState<DeliveryOrder[]>(dummyDOs);

  const [newDO, setNewDO] = useState({
    customerName: '',
    shipper: '',
    consignee: '',
    originCity: '',
    destCity: '',
    cargoDesc: '',
    qty: 0,
    unit: 'Karton',
    weightKg: 0,
    driverName: 'Slamet Rahardjo',
    vehiclePlate: 'B 9123 KXA',
    specialNote: '',
  });

  const statusBadge = (s: DOStatus) => {
    const map: Record<DOStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      DRAFT: { cls: 'bg-slate-100 text-slate-600', icon: <FileText size={11} />, label: 'Draft' },
      DISPATCHED: { cls: 'bg-blue-100 text-blue-700', icon: <Truck size={11} />, label: 'Dispatched' },
      IN_TRANSIT: { cls: 'bg-indigo-100 text-indigo-700', icon: <Clock size={11} />, label: 'In Transit' },
      ARRIVED: { cls: 'bg-amber-100 text-amber-700', icon: <AlertCircle size={11} />, label: 'Arrived' },
      DELIVERED: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Delivered' },
      RETURNED: { cls: 'bg-rose-100 text-rose-700', icon: <XCircle size={11} />, label: 'Returned' },
    };
    const d = map[s];
    return (
      <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>
        {d.icon} {d.label}
      </span>
    );
  };

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const match = o.doNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.driverName.toLowerCase().includes(q) || o.cargoDesc.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'ALL' || o.status === filterStatus;
    return match && matchStatus;
  });

  const kpi = [
    { label: 'Total DO', val: orders.length, color: 'text-blue-600' },
    { label: 'In Transit', val: orders.filter(o => o.status === 'IN_TRANSIT').length, color: 'text-indigo-600' },
    { label: 'Delivered', val: orders.filter(o => o.status === 'DELIVERED').length, color: 'text-emerald-600' },
    { label: 'Returned / Masalah', val: orders.filter(o => o.status === 'RETURNED').length, color: 'text-rose-600' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: DeliveryOrder = {
      id: String(orders.length + 1),
      doNumber: `DO-2026-090${String(orders.length + 9).padStart(2, '0')}`,
      issueDate: '2026-09-03',
      customerName: newDO.customerName || 'PT. Baru',
      shipper: newDO.shipper || 'PT. Baru - Jakarta',
      consignee: newDO.consignee || 'PT. Tujuan - Surabaya',
      originCity: newDO.originCity || 'Jakarta',
      destCity: newDO.destCity || 'Surabaya',
      cargoDesc: newDO.cargoDesc || 'General Cargo',
      qty: newDO.qty,
      unit: newDO.unit,
      weightKg: newDO.weightKg,
      volumeM3: Math.round(newDO.weightKg / 500 * 10) / 10,
      driverName: newDO.driverName,
      vehiclePlate: newDO.vehiclePlate,
      status: 'DRAFT',
      specialNote: newDO.specialNote || '-',
    };
    setOrders([next, ...orders]);
    setShowModal(false);
    alert(`✅ DO ${next.doNumber} berhasil dibuat!`);
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
            <Truck size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Delivery Order (DO)</h2>
            <p className="text-xs text-slate-500">Manajemen dokumen pengiriman, muatan, shipper & consignee</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export DO ke Excel')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Buat DO Baru</span>
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
          <input type="text" placeholder="Cari No. DO, Customer, Driver, Muatan..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="DRAFT">Draft</option>
          <option value="DISPATCHED">Dispatched</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="ARRIVED">Arrived</option>
          <option value="DELIVERED">Delivered</option>
          <option value="RETURNED">Returned</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Delivery Order</h3>
          <span className="text-xs text-slate-500 font-medium">{filtered.length} DO ditemukan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. DO</th>
                <th className="p-3.5">Customer / Tanggal</th>
                <th className="p-3.5">Shipper → Consignee</th>
                <th className="p-3.5">Muatan</th>
                <th className="p-3.5">Driver & Kendaraan</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-indigo-600">{o.doNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{o.customerName}</div>
                    <div className="text-[11px] text-slate-400">{o.issueDate}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 truncate max-w-[160px]">{o.originCity}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[160px]">→ {o.destCity}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{o.cargoDesc}</div>
                    <div className="text-[11px] text-slate-400">{o.qty} {o.unit} · {o.weightKg.toLocaleString('id')} kg</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{o.driverName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{o.vehiclePlate}</div>
                  </td>
                  <td className="p-3.5">{statusBadge(o.status)}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => alert(`Detail DO: ${o.doNumber}`)} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-[11px]">
                        <Eye size={12} /> Detail
                      </button>
                      <button onClick={() => alert(`Cetak DO: ${o.doNumber}`)} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-semibold text-[11px]">
                        <Printer size={12} /> Cetak
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Truck size={18} className="text-indigo-600" /> Buat Delivery Order Baru
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nama Customer</label>
                <input required type="text" placeholder="PT. ..." value={newDO.customerName} onChange={e => setNewDO({ ...newDO, customerName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Shipper</label>
                  <input type="text" placeholder="PT. Pengirim - Kota" value={newDO.shipper} onChange={e => setNewDO({ ...newDO, shipper: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Consignee</label>
                  <input type="text" placeholder="PT. Penerima - Kota" value={newDO.consignee} onChange={e => setNewDO({ ...newDO, consignee: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kota Asal</label>
                  <input required type="text" placeholder="Jakarta" value={newDO.originCity} onChange={e => setNewDO({ ...newDO, originCity: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kota Tujuan</label>
                  <input required type="text" placeholder="Surabaya" value={newDO.destCity} onChange={e => setNewDO({ ...newDO, destCity: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Deskripsi Muatan</label>
                <input required type="text" placeholder="Spare Part, FMCG, dll." value={newDO.cargoDesc} onChange={e => setNewDO({ ...newDO, cargoDesc: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Qty</label>
                  <input type="number" value={newDO.qty} onChange={e => setNewDO({ ...newDO, qty: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Satuan</label>
                  <select value={newDO.unit} onChange={e => setNewDO({ ...newDO, unit: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Karton</option><option>Roll</option><option>Sak</option><option>Dus</option><option>Unit</option><option>Batang</option><option>Karung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Berat (kg)</label>
                  <input type="number" value={newDO.weightKg} onChange={e => setNewDO({ ...newDO, weightKg: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Driver</label>
                  <select value={newDO.driverName} onChange={e => setNewDO({ ...newDO, driverName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Slamet Rahardjo</option><option>Budi Kurniawan</option><option>Andi Saputra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kendaraan</label>
                  <select value={newDO.vehiclePlate} onChange={e => setNewDO({ ...newDO, vehiclePlate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option value="B 9123 KXA">B 9123 KXA</option><option value="B 9876 KXB">B 9876 KXB</option><option value="B 4567 KXC">B 4567 KXC</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Catatan Khusus</label>
                <input type="text" placeholder="Instruksi pengiriman, dll." value={newDO.specialNote} onChange={e => setNewDO({ ...newDO, specialNote: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 text-xs">Simpan DO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
