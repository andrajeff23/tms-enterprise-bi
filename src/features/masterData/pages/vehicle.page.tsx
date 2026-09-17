import React, { useState } from 'react';
import {
  Truck as TruckIcon, Plus, Search, Download, Eye,
  Calendar, Gauge, Shield, FileText, CheckCircle, AlertCircle
} from 'lucide-react';

type VehicleStatus = 'READY' | 'BEROPERASI' | 'MAINTENANCE' | 'RUSAK' | 'TIDAK_AKTIF';

interface VehicleUnit {
  id: string;
  plateNumber: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  chassisNo: string;
  engineNo: string;
  capacityTon: number;
  fuelType: string;
  color: string;
  stnkExpiry: string;
  kirExpiry: string;
  insuranceExpiry: string;
  odometer: string;
  lastService: string;
  nextService: string;
  status: VehicleStatus;
  assignedDriver: string;
  baseLocation: string;
  purchaseDate: string;
  purchasePrice: number;
}

const dummyVehicles: VehicleUnit[] = [
  { id: '1', plateNumber: 'B 9123 KXA', vehicleType: 'Truck Wingbox', brand: 'Mitsubishi', model: 'Fuso FJ 2528 T', year: 2022, chassisNo: 'MHMFJ2528NB012345', engineNo: '4M50-NT-AB56789', capacityTon: 18, fuelType: 'Solar', color: 'Putih', stnkExpiry: '2027-03-15', kirExpiry: '2026-12-10', insuranceExpiry: '2026-12-31', odometer: '124,500 km', lastService: '2026-07-01', nextService: '2026-10-01', status: 'BEROPERASI', assignedDriver: 'Slamet Rahardjo', baseLocation: 'Pool Jakarta Utara', purchaseDate: '2022-01-15', purchasePrice: 850000000 },
  { id: '2', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer 40ft', brand: 'Hino', model: '500 FM 260 JD', year: 2021, chassisNo: 'JHDGLCH03MX017890', engineNo: 'J08E-VD-CD12345', capacityTon: 30, fuelType: 'Solar', color: 'Biru', stnkExpiry: '2026-11-20', kirExpiry: '2026-09-30', insuranceExpiry: '2026-11-30', odometer: '189,200 km', lastService: '2026-06-15', nextService: '2026-09-15', status: 'BEROPERASI', assignedDriver: 'Budi Kurniawan', baseLocation: 'Pool Surabaya', purchaseDate: '2021-03-20', purchasePrice: 1200000000 },
  { id: '3', plateNumber: 'B 4567 KXC', vehicleType: 'CDD Long Box', brand: 'Isuzu', model: 'Elf NLR 71L', year: 2023, chassisNo: 'MHCNLR71PLJ034567', engineNo: '4HL1-CD-EF67890', capacityTon: 8, fuelType: 'Solar', color: 'Merah', stnkExpiry: '2027-06-30', kirExpiry: '2027-01-15', insuranceExpiry: '2027-06-30', odometer: '45,800 km', lastService: '2026-09-01', nextService: '2026-12-01', status: 'MAINTENANCE', assignedDriver: 'Andi Saputra', baseLocation: 'Pool Jakarta Timur', purchaseDate: '2023-02-28', purchasePrice: 650000000 },
  { id: '4', plateNumber: 'B 1289 KXD', vehicleType: 'Tronton Box', brand: 'Volvo', model: 'FH16 540', year: 2023, chassisNo: 'YV2A3CDAB6B012678', engineNo: 'D13K540-AB34567', capacityTon: 24, fuelType: 'Solar', color: 'Hitam', stnkExpiry: '2027-07-10', kirExpiry: '2027-02-20', insuranceExpiry: '2027-07-10', odometer: '68,100 km', lastService: '2026-08-01', nextService: '2026-11-01', status: 'RUSAK', assignedDriver: 'Hendra Gunawan', baseLocation: 'Pool Surabaya', purchaseDate: '2023-05-10', purchasePrice: 1800000000 },
  { id: '5', plateNumber: 'B 1122 KXE', vehicleType: 'CDE Box', brand: 'Mitsubishi', model: 'Canter FE 74 HD', year: 2020, chassisNo: 'MHMFE747LK056789', engineNo: '4D34-3AT3-GH89012', capacityTon: 4, fuelType: 'Solar', color: 'Putih', stnkExpiry: '2026-12-05', kirExpiry: '2026-10-15', insuranceExpiry: '2026-12-05', odometer: '210,400 km', lastService: '2026-05-20', nextService: '2026-08-20', status: 'TIDAK_AKTIF', assignedDriver: 'Dedi Setiawan', baseLocation: 'Pool Semarang', purchaseDate: '2020-08-15', purchasePrice: 480000000 },
  { id: '6', plateNumber: 'B 3344 KXF', vehicleType: 'Truck Wingbox', brand: 'Mitsubishi', model: 'Fuso FN 527 ML', year: 2022, chassisNo: 'MHMFN527NB078901', engineNo: '6M70-NT-IJ23456', capacityTon: 15, fuelType: 'Solar', color: 'Putih', stnkExpiry: '2027-02-28', kirExpiry: '2026-11-30', insuranceExpiry: '2027-02-28', odometer: '98,300 km', lastService: '2026-07-15', nextService: '2026-10-15', status: 'BEROPERASI', assignedDriver: 'Rudi Hermawan', baseLocation: 'Pool Jakarta Utara', purchaseDate: '2022-04-10', purchasePrice: 780000000 },
  { id: '7', plateNumber: 'B 5566 KXG', vehicleType: 'Trailer 20ft', brand: 'Hino', model: '500 FG 235 JJ', year: 2022, chassisNo: 'JHDGLCH01NX090123', engineNo: 'J05E-TI-KL56789', capacityTon: 20, fuelType: 'Solar', color: 'Kuning', stnkExpiry: '2027-04-15', kirExpiry: '2026-12-01', insuranceExpiry: '2027-04-15', odometer: '145,600 km', lastService: '2026-08-10', nextService: '2026-11-10', status: 'READY', assignedDriver: 'Eko Prasetyo', baseLocation: 'Pool Surabaya', purchaseDate: '2022-06-30', purchasePrice: 1050000000 },
  { id: '8', plateNumber: 'B 7788 KXH', vehicleType: 'CDD Box', brand: 'Isuzu', model: 'Elf NMR 71L', year: 2021, chassisNo: 'MHCNMR71MKJ112345', engineNo: '4HK1-TC-MN12345', capacityTon: 8, fuelType: 'Solar', color: 'Hijau', stnkExpiry: '2026-10-25', kirExpiry: '2026-09-15', insuranceExpiry: '2026-10-25', odometer: '167,900 km', lastService: '2026-06-01', nextService: '2026-09-01', status: 'READY', assignedDriver: 'Agus Wijaya', baseLocation: 'Pool Bekasi', purchaseDate: '2021-10-05', purchasePrice: 590000000 },
];

export const VehiclePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleUnit | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const statusBadge = (s: VehicleStatus) => {
    const map: Record<VehicleStatus, { cls: string; label: string }> = {
      READY: { cls: 'bg-emerald-100 text-emerald-700', label: '✓ Ready' },
      BEROPERASI: { cls: 'bg-blue-100 text-blue-700', label: '⟳ Beroperasi' },
      MAINTENANCE: { cls: 'bg-amber-100 text-amber-700', label: '⚙ Maintenance' },
      RUSAK: { cls: 'bg-rose-100 text-rose-700', label: '✗ Rusak' },
      TIDAK_AKTIF: { cls: 'bg-slate-100 text-slate-600', label: '○ Tidak Aktif' },
    };
    const d = map[s];
    return <span className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px]`}>{d.label}</span>;
  };

  const docStatus = (expiry: string) => {
    const exp = new Date(expiry);
    const now = new Date('2026-09-03');
    const days = Math.floor((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0) return <span className="text-rose-600 font-bold text-[10px]">✗ Expired</span>;
    if (days < 60) return <span className="text-amber-600 font-bold text-[10px]">⚠ {days}h lagi</span>;
    return <span className="text-emerald-600 font-bold text-[10px]">✓ {expiry}</span>;
  };

  const filtered = dummyVehicles.filter(v => {
    const q = search.toLowerCase();
    const match = v.plateNumber.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.assignedDriver.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || v.status === filterStatus);
  });

  const fmt = (n: number) => `Rp ${(n / 1000000).toFixed(0)} Jt`;

  const kpi = [
    { label: 'Total Armada', val: dummyVehicles.length, color: 'text-slate-800' },
    { label: 'Siap / Beroperasi', val: dummyVehicles.filter(v => v.status === 'READY' || v.status === 'BEROPERASI').length, color: 'text-emerald-600' },
    { label: 'Maintenance/Rusak', val: dummyVehicles.filter(v => v.status === 'MAINTENANCE' || v.status === 'RUSAK').length, color: 'text-amber-600' },
    { label: 'Dokumen Hampir Exp.', val: dummyVehicles.filter(v => { const d = new Date(v.stnkExpiry); const n = new Date('2026-09-03'); return Math.floor((d.getTime() - n.getTime()) / (1000 * 60 * 60 * 24)) < 60; }).length, color: 'text-rose-600' },
  ];

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
            <TruckIcon size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Master Data Kendaraan / Unit</h2>
            <p className="text-xs text-slate-500">Inventarisasi armada, spesifikasi teknis, dan dokumen kendaraan</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export data kendaraan')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> <span>Export</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={16} /> <span>Tambah Unit</span>
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
          <input type="text" placeholder="Cari Plat, Merk, Model, Driver..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
          <option value="ALL">Semua Status</option>
          <option value="READY">Ready</option>
          <option value="BEROPERASI">Beroperasi</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="RUSAK">Rusak</option>
          <option value="TIDAK_AKTIF">Tidak Aktif</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Inventaris Kendaraan</h3>
          <span className="text-xs text-slate-500">{filtered.length} unit</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Plat / Tipe</th>
                <th className="p-3.5">Merk & Model</th>
                <th className="p-3.5 text-center">Kapasitas</th>
                <th className="p-3.5">Driver</th>
                <th className="p-3.5">Pool</th>
                <th className="p-3.5">STNK Exp.</th>
                <th className="p-3.5">KIR Exp.</th>
                <th className="p-3.5">Odometer</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{v.plateNumber}</div>
                    <div className="text-[11px] text-slate-400">{v.vehicleType}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{v.brand}</div>
                    <div className="text-[11px] text-slate-400">{v.model} · {v.year}</div>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="font-bold text-blue-600">{v.capacityTon} Ton</span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">{v.assignedDriver}</td>
                  <td className="p-3.5 text-slate-600">{v.baseLocation}</td>
                  <td className="p-3.5">{docStatus(v.stnkExpiry)}</td>
                  <td className="p-3.5">{docStatus(v.kirExpiry)}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Gauge size={11} className="text-slate-400" />
                      {v.odometer}
                    </div>
                  </td>
                  <td className="p-3.5">{statusBadge(v.status)}</td>
                  <td className="p-3.5 text-center">
                    <button onClick={() => setSelectedVehicle(v)} className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-semibold text-[11px]">
                      <Eye size={12} /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedVehicle.plateNumber}</h3>
                <div className="text-xs text-slate-500">{selectedVehicle.vehicleType} · {selectedVehicle.brand} {selectedVehicle.model}</div>
              </div>
              {statusBadge(selectedVehicle.status)}
            </div>

            <div className="space-y-4 text-xs">
              {/* Specs */}
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">Spesifikasi Teknis</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Merk', selectedVehicle.brand], ['Model', selectedVehicle.model],
                    ['Tahun', selectedVehicle.year], ['Kapasitas', `${selectedVehicle.capacityTon} Ton`],
                    ['Bahan Bakar', selectedVehicle.fuelType], ['Warna', selectedVehicle.color],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-slate-50 rounded-lg p-2.5">
                      <div className="text-slate-400 text-[10px]">{k}</div>
                      <div className="font-bold text-slate-800 mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identification */}
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">Nomor Identifikasi</div>
                <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between"><span className="text-slate-400">No. Chassis</span><span className="font-mono font-bold text-slate-700">{selectedVehicle.chassisNo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">No. Mesin</span><span className="font-mono font-bold text-slate-700">{selectedVehicle.engineNo}</span></div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">Dokumen Kendaraan</div>
                <div className="space-y-2">
                  {[
                    ['STNK', selectedVehicle.stnkExpiry],
                    ['KIR', selectedVehicle.kirExpiry],
                    ['Asuransi', selectedVehicle.insuranceExpiry],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-slate-50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2">
                        <Shield size={13} className="text-slate-400" />
                        <span className="font-semibold text-slate-700">{k}</span>
                      </div>
                      {docStatus(v)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Service & Finance */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Odometer</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedVehicle.odometer}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Servis Berikutnya</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedVehicle.nextService}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Driver Assigned</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedVehicle.assignedDriver}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Harga Perolehan</div>
                  <div className="font-bold text-blue-600 mt-0.5">{fmt(selectedVehicle.purchasePrice)}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
              <button onClick={() => alert(`Edit data kendaraan: ${selectedVehicle.plateNumber}`)} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 text-xs">Edit Data</button>
              <button onClick={() => setSelectedVehicle(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4">Tambah Unit Armada Baru</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nomor Plat</label>
                  <input type="text" placeholder="B XXXX XXX" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tipe Kendaraan</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>Truck Wingbox</option><option>Trailer</option><option>CDD</option><option>CDE</option><option>Tronton</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Merk</label>
                  <input type="text" placeholder="Mitsubishi, Hino, dll." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tahun</label>
                  <input type="number" placeholder="2024" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Kapasitas (Ton)</label>
                  <input type="number" placeholder="18" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Harga Beli (Rp)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs">Batal</button>
                <button onClick={() => { setShowAddModal(false); alert('Unit armada berhasil ditambahkan!'); }} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg text-xs">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
