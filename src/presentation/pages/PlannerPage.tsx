import React, { useState } from 'react';
import {
  CalendarCheck, Plus, Search, Filter, Download, CheckCircle,
  Clock, AlertCircle, Truck, User, MapPin, ChevronRight, Eye
} from 'lucide-react';

type AssignmentStatus = 'SCHEDULED' | 'ON_ROUTE' | 'COMPLETED' | 'CANCELLED' | 'STANDBY';

interface Assignment {
  id: string;
  tripNo: string;
  driverName: string;
  driverCode: string;
  vehiclePlate: string;
  vehicleType: string;
  origin: string;
  destination: string;
  scheduledDate: string;
  estimatedArrival: string;
  cargoDesc: string;
  weightTon: number;
  status: AssignmentStatus;
  customerName: string;
  orderRef: string;
}

const dummyAssignments: Assignment[] = [
  { id: '1', tripNo: 'TRIP-2026-0901', driverName: 'Slamet Rahardjo', driverCode: 'DRV-001', vehiclePlate: 'B 9123 KXA', vehicleType: 'Truck Wingbox 18T', origin: 'Jakarta (Tanjung Priok)', destination: 'Surabaya (Gresik)', scheduledDate: '2026-09-03', estimatedArrival: '2026-09-04', cargoDesc: 'Spare Part Mesin', weightTon: 12, status: 'ON_ROUTE', customerName: 'PT. ABC Indonesia', orderRef: 'DO-2026-0501' },
  { id: '2', tripNo: 'TRIP-2026-0902', driverName: 'Budi Kurniawan', driverCode: 'DRV-002', vehiclePlate: 'B 9876 KXB', vehicleType: 'Trailer 40ft', origin: 'Bandung (Cimahi)', destination: 'Semarang (Kendal)', scheduledDate: '2026-09-03', estimatedArrival: '2026-09-04', cargoDesc: 'Textile & Garmen', weightTon: 25, status: 'SCHEDULED', customerName: 'PT. XYZ Nusantara', orderRef: 'DO-2026-0502' },
  { id: '3', tripNo: 'TRIP-2026-0903', driverName: 'Andi Saputra', driverCode: 'DRV-003', vehiclePlate: 'B 4567 KXC', vehicleType: 'CDD Long Box 8T', origin: 'Jakarta (Cikarang)', destination: 'Cirebon', scheduledDate: '2026-09-03', estimatedArrival: '2026-09-03', cargoDesc: 'Bahan Makanan & FMCG', weightTon: 6, status: 'COMPLETED', customerName: 'PT. Maju Bersama', orderRef: 'DO-2026-0503' },
  { id: '4', tripNo: 'TRIP-2026-0904', driverName: 'Hendra Gunawan', driverCode: 'DRV-004', vehiclePlate: 'B 1289 KXD', vehicleType: 'Tronton Box 24T', origin: 'Surabaya (Rungkut)', destination: 'Balikpapan (Kariangau)', scheduledDate: '2026-09-04', estimatedArrival: '2026-09-06', cargoDesc: 'Material Konstruksi', weightTon: 20, status: 'SCHEDULED', customerName: 'PT. Sukses Makmur', orderRef: 'DO-2026-0504' },
  { id: '5', tripNo: 'TRIP-2026-0905', driverName: 'Dedi Setiawan', driverCode: 'DRV-005', vehiclePlate: 'B 1122 KXE', vehicleType: 'CDE Box 4T', origin: 'Semarang (Terboyo)', destination: 'Solo (Palur)', scheduledDate: '2026-09-04', estimatedArrival: '2026-09-04', cargoDesc: 'Elektronik', weightTon: 3, status: 'STANDBY', customerName: 'PT. Sejahtera Abadi', orderRef: 'DO-2026-0505' },
  { id: '6', tripNo: 'TRIP-2026-0906', driverName: 'Rudi Hermawan', driverCode: 'DRV-006', vehiclePlate: 'B 3344 KXF', vehicleType: 'Truck Fuso Wingbox', origin: 'Jakarta (Marunda)', destination: 'Medan (Belawan)', scheduledDate: '2026-09-05', estimatedArrival: '2026-09-08', cargoDesc: 'Consumer Goods', weightTon: 15, status: 'SCHEDULED', customerName: 'PT. Nusantara Jaya', orderRef: 'DO-2026-0506' },
  { id: '7', tripNo: 'TRIP-2026-0907', driverName: 'Eko Prasetyo', driverCode: 'DRV-007', vehiclePlate: 'B 5566 KXG', vehicleType: 'Trailer 20ft', origin: 'Surabaya (BJTI)', destination: 'Makassar (Soekarno Hatta)', scheduledDate: '2026-09-02', estimatedArrival: '2026-09-04', cargoDesc: 'Beras & Sembako', weightTon: 28, status: 'COMPLETED', customerName: 'PT. Pangan Nusantara', orderRef: 'DO-2026-0507' },
  { id: '8', tripNo: 'TRIP-2026-0908', driverName: 'Agus Wijaya', driverCode: 'DRV-008', vehiclePlate: 'B 7788 KXH', vehicleType: 'CDD Box 8T', origin: 'Bekasi (Jababeka)', destination: 'Tasikmalaya', scheduledDate: '2026-09-03', estimatedArrival: '2026-09-03', cargoDesc: 'Spare Part Motor', weightTon: 5, status: 'CANCELLED', customerName: 'PT. Motor Bersama', orderRef: 'DO-2026-0508' },
];

const availableDrivers = [
  { code: 'DRV-003', name: 'Andi Saputra', status: 'AVAILABLE' },
  { code: 'DRV-009', name: 'Firman Wibowo', status: 'AVAILABLE' },
  { code: 'DRV-010', name: 'Wahyu Santoso', status: 'AVAILABLE' },
];

const availableVehicles = [
  { plate: 'B 4567 KXC', type: 'CDD Long Box 8T', status: 'Ready' },
  { plate: 'B 2233 KXI', type: 'Truck Fuso 15T', status: 'Ready' },
  { plate: 'B 4455 KXJ', type: 'Wingbox 18T', status: 'Ready' },
];

export const PlannerPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterDate, setFilterDate] = useState('2026-09-03');
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);

  const [newAssign, setNewAssign] = useState({
    driverCode: 'DRV-003',
    vehiclePlate: 'B 4567 KXC',
    origin: '',
    destination: '',
    scheduledDate: '2026-09-05',
    cargoDesc: '',
    weightTon: 5,
    customerName: '',
    orderRef: '',
  });

  const statusBadge = (s: AssignmentStatus) => {
    const map: Record<AssignmentStatus, { cls: string; icon: React.ReactNode; label: string }> = {
      SCHEDULED: { cls: 'bg-blue-100 text-blue-700', icon: <Clock size={11} />, label: 'Terjadwal' },
      ON_ROUTE: { cls: 'bg-indigo-100 text-indigo-700', icon: <Truck size={11} />, label: 'Di Jalan' },
      COMPLETED: { cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={11} />, label: 'Selesai' },
      CANCELLED: { cls: 'bg-rose-100 text-rose-700', icon: <AlertCircle size={11} />, label: 'Dibatalkan' },
      STANDBY: { cls: 'bg-amber-100 text-amber-700', icon: <Clock size={11} />, label: 'Standby' },
    };
    const d = map[s];
    return (
      <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit`}>
        {d.icon} {d.label}
      </span>
    );
  };

  const filtered = assignments.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = a.tripNo.toLowerCase().includes(q) || a.driverName.toLowerCase().includes(q) || a.customerName.toLowerCase().includes(q) || a.vehiclePlate.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'ALL' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const kpi = [
    { label: 'Total Trip Bulan Ini', val: assignments.length, sub: 'Per Sept 2026', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Driver Tersedia', val: availableDrivers.length, sub: 'Siap Ditugaskan', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Unit Armada Siap', val: availableVehicles.length, sub: 'Ready to Deploy', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Trip Hari Ini', val: assignments.filter(a => a.scheduledDate === filterDate).length, sub: filterDate, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const drv = availableDrivers.find(d => d.code === newAssign.driverCode)!;
    const veh = availableVehicles.find(v => v.plate === newAssign.vehiclePlate)!;
    const next: Assignment = {
      id: String(assignments.length + 1),
      tripNo: `TRIP-2026-09${String(assignments.length + 9).padStart(2, '0')}`,
      driverName: drv?.name || 'Andi Saputra',
      driverCode: newAssign.driverCode,
      vehiclePlate: newAssign.vehiclePlate,
      vehicleType: veh?.type || 'Truck',
      origin: newAssign.origin || 'Jakarta',
      destination: newAssign.destination || 'Surabaya',
      scheduledDate: newAssign.scheduledDate,
      estimatedArrival: newAssign.scheduledDate,
      cargoDesc: newAssign.cargoDesc || 'General Cargo',
      weightTon: newAssign.weightTon,
      status: 'SCHEDULED',
      customerName: newAssign.customerName || 'PT. Baru',
      orderRef: newAssign.orderRef || 'DO-2026-NEW',
    };
    setAssignments([next, ...assignments]);
    setShowModal(false);
    alert(`✅ Penugasan ${next.tripNo} berhasil dibuat!`);
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <CalendarCheck size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Planner & Penugasan Driver</h2>
            <p className="text-xs text-slate-500">Rencanakan jadwal trip, penugasan driver & armada kendaraan</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Export jadwal ke Excel')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Plus size={16} />
            <span>Buat Penugasan</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className={`text-[11px] font-bold uppercase text-slate-500`}>{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
            <div className={`text-[10px] mt-1 font-semibold ${k.color} ${k.bg} px-2 py-0.5 rounded-full w-fit`}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Driver & Vehicle Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 flex items-center gap-2">
            <User size={15} className="text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Driver Tersedia</h3>
            <span className="ml-auto bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">{availableDrivers.length} Driver</span>
          </div>
          <div className="divide-y divide-slate-100">
            {availableDrivers.map(d => (
              <div key={d.code} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">{d.name[0]}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{d.name}</div>
                    <div className="text-[10px] text-slate-400">{d.code}</div>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">Available</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 flex items-center gap-2">
            <Truck size={15} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Armada Siap Operasi</h3>
            <span className="ml-auto bg-indigo-100 text-indigo-700 font-bold text-[10px] px-2 py-0.5 rounded-full">{availableVehicles.length} Unit</span>
          </div>
          <div className="divide-y divide-slate-100">
            {availableVehicles.map(v => (
              <div key={v.plate} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Truck size={13} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{v.plate}</div>
                    <div className="text-[10px] text-slate-400">{v.type}</div>
                  </div>
                </div>
                <span className="bg-indigo-100 text-indigo-700 font-bold text-[10px] px-2 py-0.5 rounded-full">{v.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari No. Trip, Driver, Customer, Plat..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="SCHEDULED">Terjadwal</option>
            <option value="ON_ROUTE">Di Jalan</option>
            <option value="COMPLETED">Selesai</option>
            <option value="STANDBY">Standby</option>
            <option value="CANCELLED">Dibatalkan</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Penugasan Trip</h3>
          <span className="text-xs text-slate-500 font-medium">{filtered.length} penugasan ditemukan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">No. Trip</th>
                <th className="p-3.5">Driver & Armada</th>
                <th className="p-3.5">Rute Pengiriman</th>
                <th className="p-3.5">Muatan</th>
                <th className="p-3.5">Customer / Order</th>
                <th className="p-3.5">Jadwal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-blue-600">{a.tripNo}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{a.driverName}</div>
                    <div className="text-[11px] text-slate-400">{a.vehiclePlate} · {a.vehicleType}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <MapPin size={11} className="text-slate-400 shrink-0" />
                      {a.origin}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <ChevronRight size={11} />
                      {a.destination}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{a.cargoDesc}</div>
                    <div className="text-[11px] text-slate-400">{a.weightTon} Ton</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 truncate max-w-[130px]">{a.customerName}</div>
                    <div className="text-[11px] text-blue-500 font-mono">{a.orderRef}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{a.scheduledDate}</div>
                    <div className="text-[11px] text-slate-400">ETA: {a.estimatedArrival}</div>
                  </td>
                  <td className="p-3.5">{statusBadge(a.status)}</td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => alert(`Detail penugasan ${a.tripNo}`)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-[11px]"
                    >
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CalendarCheck size={18} className="text-blue-600" /> Buat Penugasan Trip Baru
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Driver</label>
                  <select value={newAssign.driverCode} onChange={e => setNewAssign({ ...newAssign, driverCode: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    {availableDrivers.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kendaraan</label>
                  <select value={newAssign.vehiclePlate} onChange={e => setNewAssign({ ...newAssign, vehiclePlate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    {availableVehicles.map(v => <option key={v.plate} value={v.plate}>{v.plate} ({v.type})</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kota Asal</label>
                  <input type="text" required placeholder="e.g. Jakarta (Priok)" value={newAssign.origin} onChange={e => setNewAssign({ ...newAssign, origin: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kota Tujuan</label>
                  <input type="text" required placeholder="e.g. Surabaya (Gresik)" value={newAssign.destination} onChange={e => setNewAssign({ ...newAssign, destination: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Berangkat</label>
                  <input type="date" value={newAssign.scheduledDate} onChange={e => setNewAssign({ ...newAssign, scheduledDate: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Berat Muatan (Ton)</label>
                  <input type="number" value={newAssign.weightTon} onChange={e => setNewAssign({ ...newAssign, weightTon: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Deskripsi Muatan</label>
                <input type="text" required placeholder="e.g. Spare Part, FMCG, Textile..." value={newAssign.cargoDesc} onChange={e => setNewAssign({ ...newAssign, cargoDesc: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Customer</label>
                  <input type="text" required placeholder="PT. ..." value={newAssign.customerName} onChange={e => setNewAssign({ ...newAssign, customerName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">No. Order Ref</label>
                  <input type="text" placeholder="DO-2026-XXXX" value={newAssign.orderRef} onChange={e => setNewAssign({ ...newAssign, orderRef: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-xs">Simpan Penugasan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
