import React, { useState } from 'react';
import { Plus, Truck, Wrench, AlertTriangle, Download, Search, Settings } from 'lucide-react';

export const FleetManagementPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'FLEET' | 'MAINTENANCE' | 'RUSAK'>('FLEET');

  const fleetData = [
    { plate: 'B 9123 KXA', type: 'Truck Fuso Wingbox', brand: 'Mitsubishi Fuso', year: 2022, cap: '18 Ton', status: 'Ready', odo: '124,500 km' },
    { plate: 'B 9876 KXB', type: 'Trailer 40ft', brand: 'Hino 500', year: 2021, cap: '30 Ton', status: 'Beroperasi', odo: '189,200 km' },
    { plate: 'B 4567 KXC', type: 'CDD Long Box', brand: 'Isuzu Elf', year: 2023, cap: '8 Ton', status: 'Maintenance', odo: '45,800 km' },
    { plate: 'B 1289 KXD', type: 'Tronton Box', brand: 'Volvo FH16', year: 2023, cap: '24 Ton', status: 'Rusak', odo: '68,100 km' },
    { plate: 'B 1122 KXE', type: 'CDE Box', brand: 'Mitsubishi Canter', year: 2020, cap: '4 Ton', status: 'Tidak Aktif', odo: '210,400 km' }
  ];

  const maintenanceData = [
    { id: 'WO-101', plate: 'B 4567 KXC', type: 'Preventive Maintenance', date: '29 Mei 2026', cost: 'Rp 4,500,000', tech: 'Budi Santoso', status: 'In Progress' },
    { id: 'WO-102', plate: 'B 9123 KXA', type: 'Ganti Oli & Filter', date: '15 Mei 2026', cost: 'Rp 2,200,000', tech: 'Agus Wijaya', status: 'Completed' },
    { id: 'WO-103', plate: 'B 9876 KXB', type: 'Spooring & Balancing', date: '10 Mei 2026', cost: 'Rp 1,800,000', tech: 'Joko Susilo', status: 'Completed' }
  ];

  const damagedUnits = [
    { plate: 'B 9123 KXA', type: 'Truck', problem: 'Mesin Overheat', date: '31 Mei 2026', severity: 'HIGH', tech: 'Budi Santoso' },
    { plate: 'B 9876 KXB', type: 'Trailer', problem: 'Ban Pecah', date: '30 Mei 2026', severity: 'MEDIUM', tech: 'Agus Wijaya' },
    { plate: 'B 4567 KXC', type: 'Truck', problem: 'Rem Blong', date: '29 Mei 2026', severity: 'HIGH', tech: 'Joko Susilo' },
    { plate: 'B 1289 KXD', type: 'CDD', problem: 'Elektrikal', date: '29 Mei 2026', severity: 'LOW', tech: 'Eko Prasetyo' },
    { plate: 'B 1122 KXE', type: 'Truck', problem: 'Radiator Bocor', date: '28 Mei 2026', severity: 'MEDIUM', tech: 'Rudi Hermawan' }
  ];

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Truck size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Fleet & Maintenance Management</h2>
            <p className="text-xs text-slate-500">Kelola inventaris armada, servis berkala, dan laporan unit rusak</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export data')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveSubTab('FLEET')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'FLEET' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck size={14} /> Daftar Armada
        </button>
        <button
          onClick={() => setActiveSubTab('MAINTENANCE')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'MAINTENANCE' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench size={14} /> Work Order Servis
        </button>
        <button
          onClick={() => setActiveSubTab('RUSAK')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'RUSAK' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle size={14} /> Unit Rusak
        </button>
      </div>

      {/* KPI Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Armada', val: fleetData.length, color: 'text-slate-800' },
          { label: 'Siap / Beroperasi', val: fleetData.filter(v => v.status === 'Ready' || v.status === 'Beroperasi').length, color: 'text-emerald-600' },
          { label: 'Sedang Servis', val: maintenanceData.filter(m => m.status === 'In Progress').length, color: 'text-blue-600' },
          { label: 'Unit Rusak', val: damagedUnits.length, color: 'text-rose-600' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div>

      {activeSubTab === 'FLEET' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Spesifikasi & Status Kendaraan</h3>
            <button
              onClick={() => alert('Registrasi unit baru')}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Plus size={14} />
              <span>Tambah Unit Armada</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Plat Nomor</th>
                  <th className="p-3.5">Tipe & Merk</th>
                  <th className="p-3.5">Tahun</th>
                  <th className="p-3.5">Kapasitas</th>
                  <th className="p-3.5">Odometer</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fleetData.map(v => (
                  <tr key={v.plate} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{v.plate}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{v.type}</div>
                      <div className="text-[11px] text-slate-400">{v.brand}</div>
                    </td>
                    <td className="p-3.5">{v.year}</td>
                    <td className="p-3.5 font-bold text-blue-600">{v.cap}</td>
                    <td className="p-3.5">{v.odo}</td>
                    <td className="p-3.5">
                      <span className={`font-bold px-2.5 py-1 rounded-full text-[11px] ${
                        v.status === 'Ready' || v.status === 'Beroperasi' ? 'bg-emerald-100 text-emerald-700' :
                        v.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                        v.status === 'Rusak' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'MAINTENANCE' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Riwayat Work Order & Pemeliharaan</h3>
            <button
              onClick={() => alert('Buat Work Order Pemeliharaan')}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Plus size={14} />
              <span>Buat Work Order</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">No. Work Order</th>
                  <th className="p-3.5">Plat Nomor</th>
                  <th className="p-3.5">Jenis Servis</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Biaya</th>
                  <th className="p-3.5">Teknisi</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {maintenanceData.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-blue-600">{m.id}</td>
                    <td className="p-3.5 font-bold text-slate-900">{m.plate}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{m.type}</td>
                    <td className="p-3.5">{m.date}</td>
                    <td className="p-3.5 font-bold text-slate-900">{m.cost}</td>
                    <td className="p-3.5">{m.tech}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[11px]">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'RUSAK' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Daftar Unit Rusak & Penanganan Emergency</h3>
            <button
              onClick={() => alert('Lapor Unit Rusak')}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <AlertTriangle size={14} />
              <span>Lapor Kerusakan</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Plat Nomor</th>
                  <th className="p-3.5">Tipe Kendaraan</th>
                  <th className="p-3.5">Kerusakan</th>
                  <th className="p-3.5">Tanggal Rusak</th>
                  <th className="p-3.5">Tingkat Bahaya</th>
                  <th className="p-3.5">Teknisi Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {damagedUnits.map(d => (
                  <tr key={d.plate} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-rose-600">{d.plate}</td>
                    <td className="p-3.5 font-medium">{d.type}</td>
                    <td className="p-3.5 font-bold text-slate-900">{d.problem}</td>
                    <td className="p-3.5">{d.date}</td>
                    <td className="p-3.5">
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        d.severity === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {d.severity} SEVERITY
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">{d.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
