const fs = require('fs');

const masterPath = 'C:\\Users\\jefry\\.gemini\\antigravity\\scratch\\tms-bi-enterprise\\src\\presentation\\pages\\MasterDataPage.tsx';

let content = fs.readFileSync(masterPath, 'utf8');

// 1. Imports
content = content.replace(
  "import {\\n  Users, UserCheck, MapPin, Phone, Mail, Star, Plus,\\n  Search, Download, Eye, Tag, TrendingUp, CreditCard\\n} from 'lucide-react';",
  "import {\\n  Users, UserCheck, MapPin, Phone, Mail, Star, Plus,\\n  Search, Download, Eye, Tag, TrendingUp, CreditCard,\\n  Truck as TruckIcon, Gauge, Shield, Calendar, FileText, CheckCircle, AlertCircle\\n} from 'lucide-react';"
);

// 2. Tab Type
content = content.replace(
  "type MasterTab = 'CUSTOMER' | 'DRIVER' | 'TARIF';",
  "type MasterTab = 'CUSTOMER' | 'DRIVER' | 'VEHICLE' | 'TARIF';\\n\\ntype VehicleStatus = 'READY' | 'BEROPERASI' | 'MAINTENANCE' | 'RUSAK' | 'TIDAK_AKTIF';\\n\\ninterface VehicleUnit {\\n  id: string;\\n  plateNumber: string;\\n  vehicleType: string;\\n  brand: string;\\n  model: string;\\n  year: number;\\n  chassisNo: string;\\n  engineNo: string;\\n  capacityTon: number;\\n  fuelType: string;\\n  color: string;\\n  stnkExpiry: string;\\n  kirExpiry: string;\\n  insuranceExpiry: string;\\n  odometer: string;\\n  lastService: string;\\n  nextService: string;\\n  status: VehicleStatus;\\n  assignedDriver: string;\\n  baseLocation: string;\\n  purchaseDate: string;\\n  purchasePrice: number;\\n}"
);

// 3. Vehicles Data
const vehiclesData = \
const vehicles: VehicleUnit[] = [
  { id: '1', plateNumber: 'B 9123 KXA', vehicleType: 'Truck Wingbox', brand: 'Mitsubishi', model: 'Fuso FJ 2528 T', year: 2022, chassisNo: 'MHMFJ2528NB012345', engineNo: '4M50-NT-AB56789', capacityTon: 18, fuelType: 'Solar', color: 'Putih', stnkExpiry: '2027-03-15', kirExpiry: '2026-12-10', insuranceExpiry: '2026-12-31', odometer: '124,500 km', lastService: '2026-07-01', nextService: '2026-10-01', status: 'BEROPERASI', assignedDriver: 'Slamet Rahardjo', baseLocation: 'Pool Jakarta Utara', purchaseDate: '2022-01-15', purchasePrice: 850000000 },
  { id: '2', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer 40ft', brand: 'Hino', model: '500 FM 260 JD', year: 2021, chassisNo: 'JHDGLCH03MX017890', engineNo: 'J08E-VD-CD12345', capacityTon: 30, fuelType: 'Solar', color: 'Biru', stnkExpiry: '2026-11-20', kirExpiry: '2026-09-30', insuranceExpiry: '2026-11-30', odometer: '189,200 km', lastService: '2026-06-15', nextService: '2026-09-15', status: 'BEROPERASI', assignedDriver: 'Budi Kurniawan', baseLocation: 'Pool Surabaya', purchaseDate: '2021-03-20', purchasePrice: 1200000000 },
  { id: '3', plateNumber: 'B 4567 KXC', vehicleType: 'CDD Long Box', brand: 'Isuzu', model: 'Elf NLR 71L', year: 2023, chassisNo: 'MHCNLR71PLJ034567', engineNo: '4HL1-CD-EF67890', capacityTon: 8, fuelType: 'Solar', color: 'Merah', stnkExpiry: '2027-06-30', kirExpiry: '2027-01-15', insuranceExpiry: '2027-06-30', odometer: '45,800 km', lastService: '2026-09-01', nextService: '2026-12-01', status: 'MAINTENANCE', assignedDriver: 'Andi Saputra', baseLocation: 'Pool Jakarta Timur', purchaseDate: '2023-02-28', purchasePrice: 650000000 },
  { id: '4', plateNumber: 'B 1289 KXD', vehicleType: 'Tronton Box', brand: 'Volvo', model: 'FH16 540', year: 2023, chassisNo: 'YV2A3CDAB6B012678', engineNo: 'D13K540-AB34567', capacityTon: 24, fuelType: 'Solar', color: 'Hitam', stnkExpiry: '2027-07-10', kirExpiry: '2027-02-20', insuranceExpiry: '2027-07-10', odometer: '68,100 km', lastService: '2026-08-01', nextService: '2026-11-01', status: 'RUSAK', assignedDriver: 'Hendra Gunawan', baseLocation: 'Pool Surabaya', purchaseDate: '2023-05-10', purchasePrice: 1800000000 },
  { id: '5', plateNumber: 'B 1122 KXE', vehicleType: 'CDE Box', brand: 'Mitsubishi', model: 'Canter FE 74 HD', year: 2020, chassisNo: 'MHMFE747LK056789', engineNo: '4D34-3AT3-GH89012', capacityTon: 4, fuelType: 'Solar', color: 'Putih', stnkExpiry: '2026-12-05', kirExpiry: '2026-10-15', insuranceExpiry: '2026-12-05', odometer: '210,400 km', lastService: '2026-05-20', nextService: '2026-08-20', status: 'TIDAK_AKTIF', assignedDriver: 'Dedi Setiawan', baseLocation: 'Pool Semarang', purchaseDate: '2020-08-15', purchasePrice: 480000000 },
  { id: '6', plateNumber: 'B 3344 KXF', vehicleType: 'Truck Wingbox', brand: 'Mitsubishi', model: 'Fuso FN 527 ML', year: 2022, chassisNo: 'MHMFN527NB078901', engineNo: '6M70-NT-IJ23456', capacityTon: 15, fuelType: 'Solar', color: 'Putih', stnkExpiry: '2027-02-28', kirExpiry: '2026-11-30', insuranceExpiry: '2027-02-28', odometer: '98,300 km', lastService: '2026-07-15', nextService: '2026-10-15', status: 'BEROPERASI', assignedDriver: 'Rudi Hermawan', baseLocation: 'Pool Jakarta Utara', purchaseDate: '2022-04-10', purchasePrice: 780000000 },
  { id: '7', plateNumber: 'B 5566 KXG', vehicleType: 'Trailer 20ft', brand: 'Hino', model: '500 FG 235 JJ', year: 2022, chassisNo: 'JHDGLCH01NX090123', engineNo: 'J05E-TI-KL56789', capacityTon: 20, fuelType: 'Solar', color: 'Kuning', stnkExpiry: '2027-04-15', kirExpiry: '2026-12-01', insuranceExpiry: '2027-04-15', odometer: '145,600 km', lastService: '2026-08-10', nextService: '2026-11-10', status: 'READY', assignedDriver: 'Eko Prasetyo', baseLocation: 'Pool Surabaya', purchaseDate: '2022-06-30', purchasePrice: 1050000000 },
  { id: '8', plateNumber: 'B 7788 KXH', vehicleType: 'CDD Box', brand: 'Isuzu', model: 'Elf NMR 71L', year: 2021, chassisNo: 'MHCNMR71MKJ112345', engineNo: '4HK1-TC-MN12345', capacityTon: 8, fuelType: 'Solar', color: 'Hijau', stnkExpiry: '2026-10-25', kirExpiry: '2026-09-15', insuranceExpiry: '2026-10-25', odometer: '167,900 km', lastService: '2026-06-01', nextService: '2026-09-01', status: 'READY', assignedDriver: 'Agus Wijaya', baseLocation: 'Pool Bekasi', purchaseDate: '2021-10-05', purchasePrice: 590000000 },
];
\;
content = content.replace("const tariffs = [", vehiclesData + "\\nconst tariffs = [");

// 4. State
content = content.replace(
  "  const [showModal, setShowModal] = useState(false);",
  "  const [showModal, setShowModal] = useState(false);\\n  const [filterStatus, setFilterStatus] = useState('ALL');\\n  const [selectedVehicle, setSelectedVehicle] = useState<VehicleUnit | null>(null);"
);

// 5. Tabs
content = content.replace(
  "    { id: 'DRIVER', label: 'Driver', icon: <UserCheck size={14} />, count: drivers.length },",
  "    { id: 'DRIVER', label: 'Driver', icon: <UserCheck size={14} />, count: drivers.length },\\n    { id: 'VEHICLE', label: 'Kendaraan', icon: <TruckIcon size={14} />, count: vehicles.length },"
);

// 6. Filter Vehicles
content = content.replace(
  "  const filteredTariffs = tariffs.filter(t => {\\n    const q = search.toLowerCase();\\n    return t.route.toLowerCase().includes(q) || t.vehicleType.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q);\\n  });",
  "  const filteredTariffs = tariffs.filter(t => {\\n    const q = search.toLowerCase();\\n    return t.route.toLowerCase().includes(q) || t.vehicleType.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q);\\n  });\\n\\n  const filteredVehicles = vehicles.filter(v => {\\n    const q = search.toLowerCase();\\n    const match = v.plateNumber.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.assignedDriver.toLowerCase().includes(q);\\n    return match && (filterStatus === 'ALL' || v.status === filterStatus);\\n  });"
);

// 7. Status Badge
const statusCode = \
  const vehicleStatusBadge = (s: VehicleStatus) => {
    const map: Record<VehicleStatus, { cls: string; label: string }> = {
      READY: { cls: 'bg-emerald-100 text-emerald-700', label: '? Ready' },
      BEROPERASI: { cls: 'bg-blue-100 text-blue-700', label: '? Beroperasi' },
      MAINTENANCE: { cls: 'bg-amber-100 text-amber-700', label: '? Maintenance' },
      RUSAK: { cls: 'bg-rose-100 text-rose-700', label: '? Rusak' },
      TIDAK_AKTIF: { cls: 'bg-slate-100 text-slate-600', label: '? Tidak Aktif' },
    };
    const d = map[s];
    return <span className={\\\\ px-2.5 py-1 rounded-full font-bold text-[11px]\\\}>{d.label}</span>;
  };

  const docStatus = (expiry: string) => {
    const exp = new Date(expiry);
    const now = new Date('2026-09-03');
    const days = Math.floor((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0) return <span className="text-rose-600 font-bold text-[10px]">? Expired</span>;
    if (days < 60) return <span className="text-amber-600 font-bold text-[10px]">? {days}h lagi</span>;
    return <span className="text-emerald-600 font-bold text-[10px]">? {expiry}</span>;
  };
\;
content = content.replace(
  "  const getModalTitle = () => {\\n    if (activeTab === 'CUSTOMER') return 'Tambah Customer Baru';\\n    if (activeTab === 'DRIVER') return 'Tambah Driver Baru';\\n    return 'Tambah Tarif Rute';\\n  };",
  statusCode + "\\n  const getModalTitle = () => {\\n    if (activeTab === 'CUSTOMER') return 'Tambah Customer Baru';\\n    if (activeTab === 'DRIVER') return 'Tambah Driver Baru';\\n    if (activeTab === 'VEHICLE') return 'Tambah Unit Armada Baru';\\n    return 'Tambah Tarif Rute';\\n  };"
);

// 8. KPI VEHICLE
const kpiVehicle = \
      {activeTab === 'VEHICLE' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Armada', val: vehicles.length, color: 'text-slate-800' },
            { label: 'Siap / Beroperasi', val: vehicles.filter(v => v.status === 'READY' || v.status === 'BEROPERASI').length, color: 'text-emerald-600' },
            { label: 'Maintenance/Rusak', val: vehicles.filter(v => v.status === 'MAINTENANCE' || v.status === 'RUSAK').length, color: 'text-amber-600' },
            { label: 'Dokumen Hampir Exp.', val: vehicles.filter(v => { const d = new Date(v.stnkExpiry); const n = new Date('2026-09-03'); return Math.floor((d.getTime() - n.getTime()) / (1000 * 60 * 60 * 24)) < 60; }).length, color: 'text-rose-600' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase">{k.label}</div>
              <div className={\\\	ext-2xl font-extrabold mt-1 \\\\}>{k.val}</div>
            </div>
          ))}
        </div>
      )}
\;
content = content.replace(
  "      {/* Search Filter */}",
  kpiVehicle + "\\n      {/* Search Filter */}"
);

// 9. Search Filter UI
const searchFilterOriginal = \<div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search size={15} className="text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={activeTab === 'CUSTOMER' ? 'Cari nama, kode, kota...' : activeTab === 'DRIVER' ? 'Cari nama, kode, plat kendaraan...' : 'Cari rute, tipe kendaraan, customer...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
          />
        </div>
      </div>\;
const searchFilterNew = \<div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={activeTab === 'CUSTOMER' ? 'Cari nama, kode, kota...' : activeTab === 'DRIVER' ? 'Cari nama, kode, plat kendaraan...' : activeTab === 'VEHICLE' ? 'Cari plat, merk, model, driver...' : 'Cari rute, tipe kendaraan, customer...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
          />
        </div>
        {activeTab === 'VEHICLE' && (
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
            <option value="ALL">Semua Status</option>
            <option value="READY">Ready</option>
            <option value="BEROPERASI">Beroperasi</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="RUSAK">Rusak</option>
            <option value="TIDAK_AKTIF">Tidak Aktif</option>
          </select>
        )}
      </div>\;
content = content.replace(searchFilterOriginal, searchFilterNew);

// 10. Vehicle Table
const vehicleTable = \
      {/* VEHICLE TABLE */}
      {activeTab === 'VEHICLE' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Inventaris Kendaraan</h3>
            <span className="text-xs text-slate-500">{filteredVehicles.length} unit</span>
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
                {filteredVehicles.map(v => (
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
                    <td className="p-3.5">{vehicleStatusBadge(v.status)}</td>
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
      )}
\;
content = content.replace("      {/* TARIF TABLE */}", vehicleTable + "\\n      {/* TARIF TABLE */}");

// Vehicle Detail Modal
const vehicleModal = \
      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedVehicle.plateNumber}</h3>
                <div className="text-xs text-slate-500">{selectedVehicle.vehicleType} · {selectedVehicle.brand} {selectedVehicle.model}</div>
              </div>
              {vehicleStatusBadge(selectedVehicle.status)}
            </div>

            <div className="space-y-4 text-xs">
              {/* Specs */}
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">Spesifikasi Teknis</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Merk', selectedVehicle.brand], ['Model', selectedVehicle.model],
                    ['Tahun', selectedVehicle.year], ['Kapasitas', \\\\ Ton\\\],
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
                      {docStatus(v as string)}
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
                  <div className="font-bold text-blue-600 mt-0.5">{fmtRp(selectedVehicle.purchasePrice)}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
              <button onClick={() => alert(\\\Edit data kendaraan: \\\\)} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 text-xs">Edit Data</button>
              <button onClick={() => setSelectedVehicle(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Tutup</button>
            </div>
          </div>
        </div>
      )}
\;
content = content.replace("      {/* Add Modal */}", vehicleModal + "\\n      {/* Add Modal */}");

// 11. Add Modal Body
const addModalOriginal = \<div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {activeTab === 'CUSTOMER' ? 'Nama Perusahaan' : activeTab === 'DRIVER' ? 'Nama Lengkap' : 'Rute'}
                </label>
                <input type="text" placeholder="..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {activeTab === 'CUSTOMER' ? 'Nama PIC' : activeTab === 'DRIVER' ? 'No. SIM' : 'Tipe Armada'}
                </label>
                <input type="text" placeholder="..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">No. Telepon</label>
                <input type="text" placeholder="0812-XXXX-XXXX" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                <button onClick={() => { setShowModal(false); alert('Data berhasil ditambahkan!'); }} className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 text-xs">Simpan</button>
              </div>
            </div>\;
            
const addModalNew = \{activeTab === 'VEHICLE' ? (
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
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                  <button onClick={() => { setShowModal(false); alert('Data berhasil ditambahkan!'); }} className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 text-xs">Simpan</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    {activeTab === 'CUSTOMER' ? 'Nama Perusahaan' : activeTab === 'DRIVER' ? 'Nama Lengkap' : 'Rute'}
                  </label>
                  <input type="text" placeholder="..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    {activeTab === 'CUSTOMER' ? 'Nama PIC' : activeTab === 'DRIVER' ? 'No. SIM' : 'Tipe Armada'}
                  </label>
                  <input type="text" placeholder="..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">No. Telepon</label>
                  <input type="text" placeholder="0812-XXXX-XXXX" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Batal</button>
                  <button onClick={() => { setShowModal(false); alert('Data berhasil ditambahkan!'); }} className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 text-xs">Simpan</button>
                </div>
              </div>
            )}\;
content = content.replace(addModalOriginal, addModalNew);

fs.writeFileSync(masterPath, content, 'utf8');
