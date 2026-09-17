import React, { useState } from 'react';
import {
  Users, UserCheck, MapPin, Phone, Mail, Star, Plus,
  Search, Download, Eye, Tag, TrendingUp, CreditCard,
  Truck as TruckIcon, Gauge, Shield, Calendar, FileText, CheckCircle, AlertCircle,
  Database
} from 'lucide-react';

type MasterTab = 'CUSTOMER' | 'DRIVER' | 'VEHICLE' | 'TARIF';

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

const customers = [
  { code: 'CUST-001', name: 'PT. ABC Indonesia', type: 'CORPORATE', pic: 'Budi Santoso', phone: '0812-3456-7890', email: 'budi@abc-indonesia.co.id', city: 'Jakarta', totalOrders: 142, totalRevenue: 8200000000, status: 'ACTIVE', creditLimit: 5000000000, outstanding: 1250000000 },
  { code: 'CUST-002', name: 'PT. XYZ Nusantara', type: 'CORPORATE', pic: 'Agus Setiawan', phone: '0813-9876-5432', email: 'agus@xyz-nusantara.co.id', city: 'Surabaya', totalOrders: 98, totalRevenue: 5400000000, status: 'ACTIVE', creditLimit: 3000000000, outstanding: 480000000 },
  { code: 'CUST-003', name: 'PT. Maju Bersama', type: 'SME', pic: 'Dewi Lestari', phone: '0815-1122-3344', email: 'dewi@majubersama.co.id', city: 'Bandung', totalOrders: 84, totalRevenue: 3200000000, status: 'ACTIVE', creditLimit: 2000000000, outstanding: 380000000 },
  { code: 'CUST-004', name: 'PT. Sukses Makmur', type: 'SME', pic: 'Hendra Gunawan', phone: '0817-5566-7788', email: 'hendra@suksesmakmur.co.id', city: 'Semarang', totalOrders: 65, totalRevenue: 2100000000, status: 'WATCH', creditLimit: 1500000000, outstanding: 420000000 },
  { code: 'CUST-005', name: 'PT. Sejahtera Abadi', type: 'CORPORATE', pic: 'Eko Purnama', phone: '0819-7788-9900', email: 'eko@sejahteraabadi.co.id', city: 'Medan', totalOrders: 57, totalRevenue: 4800000000, status: 'ACTIVE', creditLimit: 4000000000, outstanding: 0 },
  { code: 'CUST-006', name: 'PT. Nusantara Jaya', type: 'CORPORATE', pic: 'Sari Dewi', phone: '0811-2233-4455', email: 'sari@nusantarajaya.co.id', city: 'Makassar', totalOrders: 43, totalRevenue: 3500000000, status: 'ACTIVE', creditLimit: 2500000000, outstanding: 675000000 },
  { code: 'CUST-007', name: 'PT. Pangan Nusantara', type: 'CORPORATE', pic: 'Ahmad Fauzi', phone: '0812-1234-5678', email: 'ahmad@pangannusantara.co.id', city: 'Surabaya', totalOrders: 38, totalRevenue: 2900000000, status: 'ACTIVE', creditLimit: 2000000000, outstanding: 0 },
  { code: 'CUST-008', name: 'PT. Motor Bersama', type: 'SME', pic: 'Rudi Santoso', phone: '0813-3344-5566', email: 'rudi@motorbersama.co.id', city: 'Jakarta', totalOrders: 29, totalRevenue: 1400000000, status: 'WATCH', creditLimit: 1000000000, outstanding: 280000000 },
];

const drivers = [
  { code: 'DRV-001', name: 'Slamet Rahardjo', sim: 'SIM B2 Umum', simNo: '920812345678', simExpiry: '2028-03-15', phone: '0812-9876-5432', city: 'Jakarta', status: 'ON_DUTY', rating: 4.9, totalTrips: 412, joinDate: '2020-03-10', vehiclePlate: 'B 9123 KXA', overspeedCount: 2 },
  { code: 'DRV-002', name: 'Budi Kurniawan', sim: 'SIM B2 Umum', simNo: '920887654321', simExpiry: '2027-08-20', phone: '0813-1122-3344', city: 'Surabaya', status: 'ON_DUTY', rating: 4.7, totalTrips: 356, joinDate: '2020-07-15', vehiclePlate: 'B 9876 KXB', overspeedCount: 5 },
  { code: 'DRV-003', name: 'Andi Saputra', sim: 'SIM B1 Umum', simNo: '920855443322', simExpiry: '2027-11-10', phone: '0815-5566-7788', city: 'Jakarta', status: 'OFF_DUTY', rating: 4.8, totalTrips: 298, joinDate: '2021-02-01', vehiclePlate: 'B 4567 KXC', overspeedCount: 1 },
  { code: 'DRV-004', name: 'Hendra Gunawan', sim: 'SIM B2 Umum', simNo: '920899887766', simExpiry: '2027-05-05', phone: '0817-4455-6677', city: 'Surabaya', status: 'BREAKDOWN', rating: 4.5, totalTrips: 245, joinDate: '2021-06-15', vehiclePlate: 'B 1289 KXD', overspeedCount: 8 },
  { code: 'DRV-005', name: 'Dedi Setiawan', sim: 'SIM B1 Umum', simNo: '920833221100', simExpiry: '2026-12-01', phone: '0812-3344-5566', city: 'Semarang', status: 'ON_DUTY', rating: 4.6, totalTrips: 187, joinDate: '2022-01-10', vehiclePlate: 'B 1122 KXE', overspeedCount: 3 },
  { code: 'DRV-006', name: 'Rudi Hermawan', sim: 'SIM B2 Umum', simNo: '920811223344', simExpiry: '2028-07-20', phone: '0819-5566-7788', city: 'Jakarta', status: 'ON_DUTY', rating: 4.8, totalTrips: 321, joinDate: '2020-11-20', vehiclePlate: 'B 3344 KXF', overspeedCount: 0 },
  { code: 'DRV-007', name: 'Eko Prasetyo', sim: 'SIM B2 Umum', simNo: '920877665544', simExpiry: '2027-09-15', phone: '0812-7788-9900', city: 'Surabaya', status: 'ON_DUTY', rating: 4.7, totalTrips: 278, joinDate: '2021-04-05', vehiclePlate: 'B 5566 KXG', overspeedCount: 4 },
  { code: 'DRV-008', name: 'Agus Wijaya', sim: 'SIM B1 Umum', simNo: '920844332211', simExpiry: '2026-10-30', phone: '0815-9900-1122', city: 'Bekasi', status: 'OFF_DUTY', rating: 4.4, totalTrips: 152, joinDate: '2022-05-20', vehiclePlate: 'B 7788 KXH', overspeedCount: 12 },
];

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

const tariffs = [
  { id: 'TRF-001', route: 'Jakarta → Surabaya', distance: '800 km', vehicleType: 'Truck Wingbox 18T', perKm: 12500, perTon: 450000, perTrip: 10000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
  { id: 'TRF-002', route: 'Jakarta → Bandung', distance: '180 km', vehicleType: 'CDD Long Box 8T', perKm: 10000, perTon: 250000, perTrip: 5000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
  { id: 'TRF-003', route: 'Jakarta → Semarang', distance: '450 km', vehicleType: 'Truck Wingbox 15T', perKm: 11000, perTon: 350000, perTrip: 8000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
  { id: 'TRF-004', route: 'Jakarta → Medan', distance: '1.800 km', vehicleType: 'Trailer 40ft', perKm: 13500, perTon: 500000, perTrip: 25000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
  { id: 'TRF-005', route: 'Surabaya → Makassar', distance: '1.500 km', vehicleType: 'Tronton Box 24T', perKm: 14000, perTon: 480000, perTrip: 22000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
  { id: 'TRF-006', route: 'Jakarta → Surabaya', distance: '800 km', vehicleType: 'Truck Wingbox 18T', perKm: 11000, perTon: 400000, perTrip: 9000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'PT. ABC Indonesia (Kontrak)' },
  { id: 'TRF-007', route: 'Jakarta → Balikpapan', distance: '2.200 km', vehicleType: 'Trailer 40ft', perKm: 14500, perTon: 520000, perTrip: 32000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
  { id: 'TRF-008', route: 'Jakarta → Denpasar', distance: '1.200 km', vehicleType: 'Tronton Box 24T', perKm: 13000, perTon: 460000, perTrip: 18000000, validFrom: '2026-01-01', validTo: '2026-12-31', customer: 'GENERAL' },
];

const fmtRp = (n: number) => `Rp ${(n / 1000000).toFixed(0)} Jt`;
const fmtRpFull = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MasterTab>('CUSTOMER');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleUnit | null>(null);

  const tabs: { id: MasterTab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'CUSTOMER', label: 'Customer', icon: <Users size={14} />, count: customers.length },
    { id: 'DRIVER', label: 'Driver', icon: <UserCheck size={14} />, count: drivers.length },
    { id: 'VEHICLE', label: 'Kendaraan', icon: <TruckIcon size={14} />, count: vehicles.length },
    { id: 'TARIF', label: 'Matriks Tarif', icon: <Tag size={14} />, count: tariffs.length },
  ];

  const filteredCustomers = customers.filter(c => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
  });

  const filteredDrivers = drivers.filter(d => {
    const q = search.toLowerCase();
    return d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || d.vehiclePlate.toLowerCase().includes(q);
  });

  const filteredTariffs = tariffs.filter(t => {
    const q = search.toLowerCase();
    return t.route.toLowerCase().includes(q) || t.vehicleType.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q);
  });

  const filteredVehicles = vehicles.filter(v => {
    const q = search.toLowerCase();
    const match = v.plateNumber.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.assignedDriver.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || v.status === filterStatus);
  });

  const custStatusBadge = (s: string) => {
    if (s === 'ACTIVE') return <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">Aktif</span>;
    return <span className="bg-amber-100 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-full">⚠ Watch</span>;
  };

  const driverStatusBadge = (s: string) => {
    const map: Record<string, string> = {
      ON_DUTY: 'bg-blue-100 text-blue-700',
      OFF_DUTY: 'bg-slate-100 text-slate-600',
      BREAKDOWN: 'bg-rose-100 text-rose-700',
    };
    const label: Record<string, string> = { ON_DUTY: 'Bertugas', OFF_DUTY: 'Off Duty', BREAKDOWN: 'Darurat' };
    return <span className={`${map[s] || 'bg-slate-100 text-slate-600'} font-bold text-[10px] px-2 py-0.5 rounded-full`}>{label[s] || s}</span>;
  };

  const ratingStars = (r: number) => (
    <span className="flex items-center gap-0.5">
      <Star size={11} className="text-amber-400 fill-amber-400" />
      <span className="font-bold text-slate-700">{r.toFixed(1)}</span>
    </span>
  );

  const vehicleStatusBadge = (s: VehicleStatus) => {
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

  const getModalTitle = () => {
    if (activeTab === 'CUSTOMER') return 'Tambah Customer Baru';
    if (activeTab === 'DRIVER') return 'Tambah Driver Baru';
    if (activeTab === 'VEHICLE') return 'Tambah Unit Armada Baru';
    return 'Tambah Tarif Rute';
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-md">
            <Database size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Master Data Management</h2>
            <p className="text-xs text-slate-500">Database Customer, Driver, Kendaraan dan Matriks Tarif pengiriman</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Export master data')} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            <Plus size={15} /> Tambah Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setSearch(''); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === t.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            {t.icon} {t.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* KPI Row */}
      {activeTab === 'CUSTOMER' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Customer', val: customers.length, color: 'text-slate-800' },
            { label: 'Customer Aktif', val: customers.filter(c => c.status === 'ACTIVE').length, color: 'text-emerald-600' },
            { label: 'Total Transaksi', val: customers.reduce((s, c) => s + c.totalOrders, 0), color: 'text-blue-600' },
            { label: 'Total Revenue', val: `Rp ${(customers.reduce((s, c) => s + c.totalRevenue, 0) / 1e9).toFixed(1)} M`, color: 'text-violet-600' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase">{k.label}</div>
              <div className={`text-2xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'DRIVER' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Driver', val: drivers.length, color: 'text-slate-800' },
            { label: 'Sedang Bertugas', val: drivers.filter(d => d.status === 'ON_DUTY').length, color: 'text-blue-600' },
            { label: 'Avg. Rating', val: `${(drivers.reduce((s, d) => s + d.rating, 0) / drivers.length).toFixed(1)}⭐`, color: 'text-amber-600' },
            { label: 'Total Trip (Kumulatif)', val: drivers.reduce((s, d) => s + d.totalTrips, 0).toLocaleString(), color: 'text-emerald-600' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase">{k.label}</div>
              <div className={`text-2xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
            </div>
          ))}
        </div>
      )}

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
              <div className={`text-2xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Search Filter */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-3">
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
      </div>

      {/* CUSTOMER TABLE */}
      {activeTab === 'CUSTOMER' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Daftar Customer</h3>
            <span className="text-xs text-slate-500">{filteredCustomers.length} customer</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Kode / Nama</th>
                  <th className="p-3.5">Tipe</th>
                  <th className="p-3.5">PIC</th>
                  <th className="p-3.5">Kota</th>
                  <th className="p-3.5 text-center">Total Order</th>
                  <th className="p-3.5 text-right">Total Revenue</th>
                  <th className="p-3.5 text-right">Outstanding</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map(c => (
                  <tr key={c.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-blue-600">{c.code}</div>
                      <div className="font-bold text-slate-900">{c.name}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${c.type === 'CORPORATE' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{c.type}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{c.pic}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1"><Phone size={9} />{c.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-slate-700"><MapPin size={10} className="text-slate-400" />{c.city}</div>
                    </td>
                    <td className="p-3.5 text-center font-bold text-slate-900">{c.totalOrders}</td>
                    <td className="p-3.5 text-right font-bold text-emerald-600">{fmtRp(c.totalRevenue)}</td>
                    <td className="p-3.5 text-right font-bold">
                      {c.outstanding > 0 ? <span className="text-rose-600">{fmtRp(c.outstanding)}</span> : <span className="text-emerald-600">Lunas</span>}
                    </td>
                    <td className="p-3.5">{custStatusBadge(c.status)}</td>
                    <td className="p-3.5 text-center">
                      <button onClick={() => alert(`Detail: ${c.name}\nEmail: ${c.email}\nCredit Limit: ${fmtRpFull(c.creditLimit)}`)} className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-0.5">
                        <Eye size={11} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DRIVER TABLE */}
      {activeTab === 'DRIVER' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Daftar Driver</h3>
            <span className="text-xs text-slate-500">{filteredDrivers.length} driver</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Kode / Nama</th>
                  <th className="p-3.5">Kendaraan</th>
                  <th className="p-3.5">SIM</th>
                  <th className="p-3.5">Kontak</th>
                  <th className="p-3.5 text-center">Rating</th>
                  <th className="p-3.5 text-center">Total Trip</th>
                  <th className="p-3.5 text-center">Overspeed</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDrivers.map(d => (
                  <tr key={d.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-indigo-600">{d.code}</div>
                      <div className="font-bold text-slate-900">{d.name}</div>
                      <div className="text-[10px] text-slate-400">Bergabung: {d.joinDate}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">{d.vehiclePlate}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-700">{d.sim}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{d.simNo}</div>
                      <div className="text-[10px] text-slate-400">Exp: {d.simExpiry}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-slate-700"><Phone size={10} className="text-slate-400" />{d.phone}</div>
                      <div className="flex items-center gap-1 text-slate-500 mt-0.5"><MapPin size={10} className="text-slate-400" />{d.city}</div>
                    </td>
                    <td className="p-3.5 text-center">{ratingStars(d.rating)}</td>
                    <td className="p-3.5 text-center font-bold text-slate-900">{d.totalTrips.toLocaleString()}</td>
                    <td className="p-3.5 text-center">
                      <span className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${d.overspeedCount > 8 ? 'bg-rose-100 text-rose-700' : d.overspeedCount > 3 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {d.overspeedCount}x
                      </span>
                    </td>
                    <td className="p-3.5">{driverStatusBadge(d.status)}</td>
                    <td className="p-3.5 text-center">
                      <button onClick={() => alert(`Detail Driver: ${d.name}\nSIM: ${d.simNo} | Exp: ${d.simExpiry}`)} className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] flex items-center gap-0.5">
                        <Eye size={11} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

      {/* TARIF TABLE */}
      {activeTab === 'TARIF' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Matriks Tarif Pengiriman</h3>
            <span className="text-xs text-slate-500">{filteredTariffs.length} tarif</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Rute</th>
                  <th className="p-3.5">Tipe Armada</th>
                  <th className="p-3.5 text-right">Per Km</th>
                  <th className="p-3.5 text-right">Per Ton</th>
                  <th className="p-3.5 text-right">Per Trip</th>
                  <th className="p-3.5">Berlaku</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTariffs.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-teal-600 font-mono">{t.id}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{t.route}</div>
                      <div className="text-[10px] text-slate-400">{t.distance}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{t.vehicleType}</td>
                    <td className="p-3.5 text-right font-bold text-slate-900">{`Rp ${t.perKm.toLocaleString('id-ID')}`}</td>
                    <td className="p-3.5 text-right font-bold text-slate-900">{fmtRp(t.perTon)}</td>
                    <td className="p-3.5 text-right font-bold text-blue-600">{fmtRp(t.perTrip)}</td>
                    <td className="p-3.5 text-slate-600">
                      <div>{t.validFrom}</div>
                      <div className="text-[10px] text-slate-400">s/d {t.validTo}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${t.customer === 'GENERAL' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
                        {t.customer}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button onClick={() => alert(`Edit tarif: ${t.id} - ${t.route}`)} className="text-teal-600 hover:text-teal-800 font-semibold text-[11px]">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
              <button onClick={() => alert(`Edit data kendaraan: ${selectedVehicle.plateNumber}`)} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 text-xs">Edit Data</button>
              <button onClick={() => setSelectedVehicle(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className={`bg-white border border-slate-200 rounded-2xl p-6 w-full ${activeTab === 'VEHICLE' ? 'max-w-md' : 'max-w-sm'} shadow-2xl`}>
            <h3 className="text-base font-bold text-slate-900 mb-4">{getModalTitle()}</h3>
            {activeTab === 'VEHICLE' ? (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};
