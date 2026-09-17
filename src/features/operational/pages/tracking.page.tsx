import React, { useState, useEffect } from 'react';
import {
  MapPin, Navigation, Gauge, BatteryCharging, AlertTriangle,
  ShieldCheck, Fuel, Thermometer, Wind, Activity, Search,
  Radio
} from 'lucide-react';
import type { FleetUnit } from '../../../shared/types/tms.types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const fleetList: (FleetUnit & { driverName: string; routeFrom: string; routeTo: string; eta: string; tempEngine: number; loadPercent: number })[] = [
  {
    id: 'U-01', plateNumber: 'B 9123 KXA', vehicleType: 'Truck Wingbox 18T',
    brandModel: 'Mitsubishi Fuso FN', year: 2022, capacityTon: 18,
    status: 'OPERATIONAL', fuelLevelPercent: 82, speedKmh: 64,
    currentLocation: { lat: -6.333215026507522, lng: 107.17739344210707, address: 'Tol Jakarta-Cikampek KM 34' },
    lastServiceDate: '2026-07-01', driverName: 'Slamet Rahardjo',
    routeFrom: 'Jakarta', routeTo: 'Surabaya', eta: '2026-09-04 08:00', tempEngine: 88, loadPercent: 87,
  },
  {
    id: 'U-02', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer 40ft',
    brandModel: 'Hino 500 FL', year: 2021, capacityTon: 30,
    status: 'READY', fuelLevelPercent: 95, speedKmh: 0,
    currentLocation: { lat: -6.1214, lng: 106.7741, address: 'Pool Tanjung Priok, Jakarta Utara' },
    lastServiceDate: '2026-06-15', driverName: 'Budi Kurniawan',
    routeFrom: 'Jakarta', routeTo: 'Semarang', eta: '-', tempEngine: 25, loadPercent: 0,
  },
  {
    id: 'U-03', plateNumber: 'B 4567 KXC', vehicleType: 'CDD Long Box 8T',
    brandModel: 'Isuzu Elf NLR', year: 2023, capacityTon: 8,
    status: 'MAINTENANCE', fuelLevelPercent: 45, speedKmh: 0,
    currentLocation: { lat: -6.3012, lng: 107.1523, address: 'Bengkel Resmi Isuzu, Cikarang' },
    lastServiceDate: '2026-09-01', driverName: 'Andi Saputra',
    routeFrom: '-', routeTo: '-', eta: '-', tempEngine: 22, loadPercent: 0,
  },
  {
    id: 'U-04', plateNumber: 'B 1289 KXD', vehicleType: 'Tronton Box 24T',
    brandModel: 'Volvo FH16 540', year: 2023, capacityTon: 24,
    status: 'BROKEN', fuelLevelPercent: 30, speedKmh: 0,
    currentLocation: { lat: -6.9175, lng: 107.6191, address: 'Rest Area Tol Purbaleunyi KM 88' },
    lastServiceDate: '2026-08-01', driverName: 'Hendra Gunawan',
    routeFrom: '-', routeTo: 'Balikpapan', eta: 'Tertunda', tempEngine: 35, loadPercent: 85,
  },
  {
    id: 'U-05', plateNumber: 'B 3344 KXF', vehicleType: 'Truck Wingbox 15T',
    brandModel: 'Mitsubishi Fuso FN', year: 2022, capacityTon: 15,
    status: 'OPERATIONAL', fuelLevelPercent: 61, speedKmh: 78,
    currentLocation: { lat: -2.962665177357141, lng: 104.63021960640992, address: 'Tol Lintas Sumatera, Palembang' },
    lastServiceDate: '2026-07-15', driverName: 'Rudi Hermawan',
    routeFrom: 'Jakarta', routeTo: 'Medan', eta: '2026-09-08 14:00', tempEngine: 91, loadPercent: 93,
  },
  {
    id: 'U-06', plateNumber: 'B 5566 KXG', vehicleType: 'Trailer 20ft',
    brandModel: 'Hino 500 FG', year: 2022, capacityTon: 20,
    status: 'OPERATIONAL', fuelLevelPercent: 72, speedKmh: 55,
    currentLocation: { lat: -6.8712, lng: 109.1353, address: 'Tol Pejagan-Pemalang KM 12' },
    lastServiceDate: '2026-08-10', driverName: 'Eko Prasetyo',
    routeFrom: 'Surabaya', routeTo: 'Makassar', eta: '2026-09-04 20:00', tempEngine: 85, loadPercent: 95,
  },
  {
    id: 'U-07', plateNumber: 'B 7788 KXH', vehicleType: 'CDD Box 8T',
    brandModel: 'Isuzu Elf NMR', year: 2021, capacityTon: 8,
    status: 'READY', fuelLevelPercent: 88, speedKmh: 0,
    currentLocation: { lat: -6.2615, lng: 106.9793, address: 'Pool Bekasi Timur' },
    lastServiceDate: '2026-06-01', driverName: 'Agus Wijaya',
    routeFrom: '-', routeTo: '-', eta: '-', tempEngine: 24, loadPercent: 0,
  },
  {
    id: 'U-08', plateNumber: 'B 1122 KXE', vehicleType: 'CDE Box 4T',
    brandModel: 'Mitsubishi Canter FE', year: 2020, capacityTon: 4,
    status: 'OPERATIONAL', fuelLevelPercent: 55, speedKmh: 48,
    currentLocation: { lat: -7.0051, lng: 110.4381, address: 'Jl. Raya Semarang - Solo KM 8' },
    lastServiceDate: '2026-05-20', driverName: 'Dedi Setiawan',
    routeFrom: 'Semarang', routeTo: 'Solo', eta: '2026-09-03 16:00', tempEngine: 86, loadPercent: 72,
  },
];

type AlertItem = { plate: string; type: string; msg: string; severity: 'HIGH' | 'MEDIUM' };

const alerts: AlertItem[] = [
  { plate: 'B 9123 KXA', type: 'OVERSPEED', msg: 'Kecepatan melebihi 80 km/h di zona 60 km/h', severity: 'HIGH' },
  { plate: 'B 5566 KXG', type: 'ENGINE_TEMP', msg: 'Suhu mesin mendekati batas atas 91°C', severity: 'MEDIUM' },
  { plate: 'B 1289 KXD', type: 'BREAKDOWN', msg: 'Kendaraan tidak bergerak lebih dari 2 jam di jalan', severity: 'HIGH' },
  { plate: 'B 3344 KXF', type: 'FUEL_LOW', msg: 'Level tangki BBM turun di bawah 30%', severity: 'MEDIUM' },
];

const getStatusColorHex = (status: string) => {
  if (status === 'OPERATIONAL') return '#3b82f6';
  if (status === 'READY') return '#10b981';
  if (status === 'MAINTENANCE') return '#f59e0b';
  if (status === 'BROKEN') return '#f43f5e';
  return '#64748b';
};

const createTruckIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; color: white; border-radius: 50%; padding: 5px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 2px solid white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-9h-5V5h-7"></path><circle cx="18" cy="17" r="2"></circle><circle cx="6" cy="17" r="2"></circle></svg>
           </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
};

export const TrackingPage: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState(fleetList[0]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [liveSpeed, setLiveSpeed] = useState(selectedUnit.speedKmh);

  useEffect(() => {
    if (selectedUnit.status === 'OPERATIONAL') {
      const interval = setInterval(() => {
        setLiveSpeed(prev => {
          const jitter = (Math.random() - 0.5) * 8;
          return Math.max(0, Math.min(120, prev + jitter));
        });
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setLiveSpeed(0);
    }
  }, [selectedUnit]);

  const filteredList = fleetList.filter(u => {
    const q = search.toLowerCase();
    const match = u.plateNumber.toLowerCase().includes(q) || u.driverName.toLowerCase().includes(q) || u.vehicleType.toLowerCase().includes(q);
    return match && (filterStatus === 'ALL' || u.status === filterStatus);
  });

  const statusColor = (s: string) => {
    if (s === 'OPERATIONAL') return 'bg-blue-100 text-blue-700';
    if (s === 'READY') return 'bg-emerald-100 text-emerald-700';
    if (s === 'MAINTENANCE') return 'bg-amber-100 text-amber-700';
    if (s === 'BROKEN') return 'bg-rose-100 text-rose-700';
    return 'bg-slate-100 text-slate-600';
  };

  const fuelColor = (p: number) => p > 50 ? 'bg-emerald-500' : p > 25 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Navigation size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Real-Time Fleet GPS Tracking & Monitoring</h2>
            <p className="text-xs text-slate-500">Pantau lokasi kendaraan, kecepatan, BBM, dan alert geofence secara live</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live GPS Stream · {fleetList.filter(u => u.status === 'OPERATIONAL').length} unit aktif
          </span>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white border border-rose-200 rounded-xl shadow-xs overflow-hidden">
          <div className="px-4 py-2.5 border-b border-rose-100 flex items-center gap-2 bg-rose-50">
            <AlertTriangle size={14} className="text-rose-600" />
            <span className="font-bold text-rose-700 text-xs">Alerts Aktif ({alerts.length})</span>
          </div>
          <div className="divide-y divide-slate-100">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50/60 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${a.severity === 'HIGH' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="font-bold text-slate-800 text-xs w-28 shrink-0">{a.plate}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${a.severity === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{a.type}</span>
                <span className="text-[11px] text-slate-600">{a.msg}</span>
                <button onClick={() => alert(`Konfirmasi alert: ${a.plate} - ${a.msg}`)} className="ml-auto text-[11px] font-semibold text-blue-600 hover:text-blue-800 shrink-0">Acknowledge</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Fleet List Panel */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-3 space-y-2">
            <div className="relative">
              <Search size={14} className="text-slate-400 absolute left-2.5 top-2.5" />
              <input type="text" placeholder="Cari plat, driver, tipe..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none" />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
              <option value="ALL">Semua Status</option>
              <option value="OPERATIONAL">Beroperasi</option>
              <option value="READY">Standby</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="BROKEN">Rusak</option>
            </select>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2">
              <Radio size={13} className="text-blue-500" />
              <span className="font-bold text-slate-900 text-xs">Daftar Unit Armada</span>
              <span className="ml-auto bg-blue-50 text-blue-600 font-bold text-[10px] px-1.5 py-0.5 rounded">{filteredList.length} unit</span>
            </div>
            <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">
              {filteredList.map(unit => (
                <div
                  key={unit.id}
                  onClick={() => { setSelectedUnit(unit); setLiveSpeed(unit.speedKmh); }}
                  className={`p-3 cursor-pointer transition-all ${selectedUnit.id === unit.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-slate-50/70 border-l-2 border-l-transparent'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs">{unit.plateNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(unit.status)}`}>{unit.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mb-1">{unit.vehicleType} · {unit.driverName}</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <MapPin size={9} className="text-slate-400 shrink-0" />
                    <span className="truncate">{unit.currentLocation.address}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-[10px]">
                      <Gauge size={10} className="text-blue-400" />
                      <span className="font-bold text-slate-700">{unit.status === 'OPERATIONAL' ? `${Math.round(liveSpeed === unit.speedKmh ? liveSpeed : unit.speedKmh)} km/h` : '0 km/h'}</span>
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${fuelColor(unit.fuelLevelPercent)}`} style={{ width: `${unit.fuelLevelPercent}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">{unit.fuelLevelPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map + Detail Panel */}
        <div className="lg:col-span-8 space-y-4">
          {/* Real Map using OpenStreetMap via Leaflet */}
          <div className="bg-white border border-slate-200 rounded-xl h-[450px] relative overflow-hidden shadow-lg z-0">
            <MapContainer
              center={[selectedUnit.currentLocation.lat, selectedUnit.currentLocation.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <MapUpdater center={[selectedUnit.currentLocation.lat, selectedUnit.currentLocation.lng]} />

              {fleetList.map(unit => (
                <Marker
                  key={unit.id}
                  position={[unit.currentLocation.lat, unit.currentLocation.lng]}
                  icon={createTruckIcon(getStatusColorHex(unit.status))}
                >
                  <Popup>
                    <div className="text-xs font-sans p-1 min-w-[150px]">
                      <div className="font-bold text-slate-900 text-sm mb-1">{unit.plateNumber}</div>
                      <div className="text-slate-600 mb-2">{unit.driverName} - {unit.vehicleType}</div>
                      <span className="font-semibold px-2 py-1 bg-slate-100 text-[10px] rounded mb-2 inline-block">{unit.status}</span>
                      <div className="text-slate-500 mt-1">{unit.currentLocation.address}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Location overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-lg text-slate-800 text-xs z-[400] max-w-[260px]">
              <div className="font-bold flex items-center gap-1.5 text-blue-600 mb-1">
                <MapPin size={13} />
                <span className="truncate">{selectedUnit.currentLocation.address}</span>
              </div>
              <div className="text-[10px] text-slate-500">GPS: {selectedUnit.currentLocation.lat.toFixed(4)}°, {selectedUnit.currentLocation.lng.toFixed(4)}°</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Driver: {selectedUnit.driverName}</div>
              {selectedUnit.routeTo !== '-' && <div className="text-[10px] text-amber-600 font-semibold mt-0.5">→ {selectedUnit.routeTo} · ETA: {selectedUnit.eta}</div>}
            </div>

            {/* Geofence badge */}
            <div className={`absolute bottom-5 left-4 backdrop-blur-md border shadow-lg rounded-lg px-3 py-2 text-xs font-bold flex items-center gap-1.5 z-[400] ${selectedUnit.status === 'BROKEN' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
              <ShieldCheck size={14} />
              <span>{selectedUnit.status === 'BROKEN' ? 'Geofence Violated - Breakdown' : 'Geofence Route Normal'}</span>
            </div>

            {/* Map label */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-500 z-[400]">
              📍 Live GPS via OpenStreetMap
            </div>
          </div>

          {/* Sensor Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Kecepatan', value: `${Math.round(liveSpeed)} km/h`, icon: <Gauge size={18} />, bg: 'bg-blue-50', color: 'text-blue-600', sub: selectedUnit.status === 'OPERATIONAL' ? 'Live · Bergerak' : 'Stop' },
              { label: 'Level BBM', value: `${selectedUnit.fuelLevelPercent}%`, icon: <Fuel size={18} />, bg: 'bg-emerald-50', color: selectedUnit.fuelLevelPercent < 30 ? 'text-rose-600' : 'text-emerald-600', sub: selectedUnit.fuelLevelPercent < 30 ? '⚠ Low Fuel!' : 'Aman' },
              { label: 'Suhu Mesin', value: `${selectedUnit.tempEngine}°C`, icon: <Thermometer size={18} />, bg: 'bg-amber-50', color: selectedUnit.tempEngine > 90 ? 'text-rose-600' : 'text-amber-600', sub: selectedUnit.tempEngine > 90 ? '⚠ Overheat!' : 'Normal' },
              { label: 'Muatan', value: `${selectedUnit.loadPercent}%`, icon: <Activity size={18} />, bg: 'bg-violet-50', color: 'text-violet-600', sub: `dari ${selectedUnit.capacityTon} ton` },
            ].map(c => (
              <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex items-center gap-3">
                <div className={`p-2.5 ${c.bg} ${c.color} rounded-xl`}>{c.icon}</div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold">{c.label}</div>
                  <div className={`text-lg font-extrabold ${c.color}`}>{c.value}</div>
                  <div className="text-[10px] text-slate-400">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trip Info */}
          {selectedUnit.status === 'OPERATIONAL' && selectedUnit.routeTo !== '-' && (
            <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-xs">
              <h4 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-2">
                <Navigation size={13} className="text-blue-600" /> Info Trip Aktif
              </h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-slate-400 text-[10px]">Asal</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedUnit.routeFrom}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-slate-400 text-[10px]">Tujuan</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedUnit.routeTo}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                  <div className="text-blue-400 text-[10px]">Estimasi Tiba</div>
                  <div className="font-bold text-blue-700 mt-0.5">{selectedUnit.eta}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
