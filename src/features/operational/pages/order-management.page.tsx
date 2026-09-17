import React, { useState } from 'react';
import { Plus, Search, Filter, Download, CheckCircle, Clock, AlertCircle, XCircle, Package } from 'lucide-react';
import type { TransportOrder } from '../../../shared/types/tms.types';

export const OrderManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [orders, setOrders] = useState<TransportOrder[]>([
    { id: '1', orderNumber: 'DO-2026-0501', customerName: 'PT. ABC Indonesia', origin: 'Jakarta (Tanjung Priok)', destination: 'Surabaya (Gresik)', status: 'DELIVERED', driverName: 'Slamet Rahardjo', vehiclePlate: 'B 9123 KXA', date: '2026-05-31', revenue: 15000000 },
    { id: '2', orderNumber: 'DO-2026-0502', customerName: 'PT. XYZ Nusantara', origin: 'Bandung (Cimahi)', destination: 'Semarang (Kendal)', status: 'IN_PROGRESS', driverName: 'Budi Kurniawan', vehiclePlate: 'B 9876 KXB', date: '2026-05-31', revenue: 8500000 },
    { id: '3', orderNumber: 'DO-2026-0503', customerName: 'PT. Maju Bersama', origin: 'Jakarta (Cikarang)', destination: 'Medan (Belawan)', status: 'PENDING', driverName: 'Andi Saputra', vehiclePlate: 'B 4567 KXC', date: '2026-05-30', revenue: 22000000 },
    { id: '4', orderNumber: 'DO-2026-0504', customerName: 'PT. Sukses Makmur', origin: 'Surabaya (Rungkut)', destination: 'Balikpapan (Kariangau)', status: 'DELIVERED', driverName: 'Hendra Gunawan', vehiclePlate: 'B 1289 KXD', date: '2026-05-29', revenue: 18000000 },
    { id: '5', orderNumber: 'DO-2026-0505', customerName: 'PT. Sejahtera Abadi', origin: 'Semarang (Terboyo)', destination: 'Makassar (Soekarno Hatta)', status: 'CANCELLED', driverName: 'Dedi Setiawan', vehiclePlate: 'B 1122 KXE', date: '2026-05-28', revenue: 12000000 }
  ]);

  const [newOrder, setNewOrder] = useState({
    customerName: '',
    origin: '',
    destination: '',
    driverName: 'Slamet Rahardjo',
    vehiclePlate: 'B 9123 KXA',
    revenue: 10000000
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TransportOrder = {
      id: String(orders.length + 1),
      orderNumber: `DO-2026-05${String(orders.length + 6).padStart(2, '0')}`,
      customerName: newOrder.customerName || 'PT. Mitra Baru',
      origin: newOrder.origin || 'Jakarta',
      destination: newOrder.destination || 'Surabaya',
      status: 'PENDING',
      driverName: newOrder.driverName,
      vehiclePlate: newOrder.vehiclePlate,
      date: '2026-05-31',
      revenue: Number(newOrder.revenue)
    };

    setOrders([created, ...orders]);
    setShowCreateModal(false);
    alert(`Order Baru ${created.orderNumber} Berhasil Dibuat!`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: TransportOrder['status']) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit">
            <CheckCircle size={12} /> Delivered
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit">
            <Clock size={12} /> In Progress
          </span>
        );
      case 'PENDING':
        return (
          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit">
            <AlertCircle size={12} /> Pending
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit">
            <XCircle size={12} /> Cancelled
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Order Management & Dispatch</h2>
            <p className="text-xs text-slate-500">Kelola daftar pengiriman, penugasan armada, dan status order</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Daftar Order berhasil diexport ke Excel.')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors"
          >
            <Download size={14} /> <span>Export</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Plus size={16} /> <span>Buat Order Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Order', val: orders.length, color: 'text-slate-800' },
          { label: 'Dalam Perjalanan', val: orders.filter(o => o.status === 'IN_PROGRESS').length, color: 'text-blue-600' },
          { label: 'Menunggu (Pending)', val: orders.filter(o => o.status === 'PENDING').length, color: 'text-amber-600' },
          { label: 'Selesai (Delivered)', val: orders.filter(o => o.status === 'DELIVERED').length, color: 'text-emerald-600' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari Nomor Order, Customer, Driver..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="DELIVERED">Delivered</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Delivery Order</h3>
          <span className="text-xs text-slate-500">{filteredOrders.length} Order</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. Order</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Asal - Tujuan</th>
                <th className="p-3.5">Driver & Armada</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Nilai Order</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-blue-600">{ord.orderNumber}</td>
                  <td className="p-3.5 font-semibold text-slate-900">{ord.customerName}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{ord.origin}</div>
                    <div className="text-[11px] text-slate-400">➔ {ord.destination}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{ord.driverName}</div>
                    <div className="text-[11px] text-slate-500">{ord.vehiclePlate}</div>
                  </td>
                  <td className="p-3.5">{getStatusBadge(ord.status)}</td>
                  <td className="p-3.5 text-right font-bold text-slate-900">
                    Rp {ord.revenue.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => alert(`Melihat detail Order ${ord.orderNumber}`)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] hover:underline"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4">Buat Delivery Order Baru</h3>
            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nama Customer</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PT. Indonesia Makmur"
                  value={newOrder.customerName}
                  onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kota Asal</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jakarta"
                    value={newOrder.origin}
                    onChange={e => setNewOrder({ ...newOrder, origin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kota Tujuan</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surabaya"
                    value={newOrder.destination}
                    onChange={e => setNewOrder({ ...newOrder, destination: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Driver Assigned</label>
                  <select
                    value={newOrder.driverName}
                    onChange={e => setNewOrder({ ...newOrder, driverName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  >
                    <option value="Slamet Rahardjo">Slamet Rahardjo</option>
                    <option value="Budi Kurniawan">Budi Kurniawan</option>
                    <option value="Andi Saputra">Andi Saputra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Plat Kendaraan</label>
                  <select
                    value={newOrder.vehiclePlate}
                    onChange={e => setNewOrder({ ...newOrder, vehiclePlate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  >
                    <option value="B 9123 KXA">B 9123 KXA (Wingbox)</option>
                    <option value="B 9876 KXB">B 9876 KXB (Trailer)</option>
                    <option value="B 4567 KXC">B 4567 KXC (CDD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tarif / Revenue (Rp)</label>
                <input
                  type="number"
                  value={newOrder.revenue}
                  onChange={e => setNewOrder({ ...newOrder, revenue: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Simpan Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
