import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CheckCircle, Circle, Clock, Package, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

// Mock data for a single shipment
const shipmentData = {
  orderId: "SO-2024-09-001",
  driverName: "Slamet Rahardjo",
  plateNumber: "BK 9123 KXA",
  vehicleType: "Truck Wingbox 18T",
  currentLocation: {
    lat: 3.6012,
    lng: 98.6438,
    address: "Jl. Gatot Subroto, Medan",
  },
  route: [
    { lat: 3.5833, lng: 98.6667, address: "Gudang Asal, Medan" }, // Start
    { lat: 3.6012, lng: 98.6438, address: "Jl. Gatot Subroto, Medan" }, // Current
    { lat: 3.5956, lng: 98.5819, address: "Tujuan Akhir, Binjai" }, // End
  ],
  eta: "2026-09-03 18:00",
  timeline: [
    {
      status: "Pesanan Dibuat",
      timestamp: "2026-09-03 09:00",
      completed: true,
    },
    {
      status: "Menuju Lokasi Muat",
      timestamp: "2026-09-03 09:30",
      completed: true,
    },
    {
      status: "Proses Muat Barang",
      timestamp: "2026-09-03 11:00",
      completed: true,
    },
    {
      status: "Dalam Perjalanan ke Tujuan",
      timestamp: "2026-09-03 12:15",
      completed: true,
    },
    {
      status: "Tiba di Lokasi Tujuan",
      timestamp: "2026-09-03 17:45",
      completed: false,
    },
    {
      status: "Proses Bongkar Barang",
      timestamp: "2026-09-03 18:15",
      completed: false,
    },
    {
      status: "Pesanan Selesai",
      timestamp: "2026-09-03 19:00",
      completed: false,
    },
  ],
};

const createTruckIcon = () => {
  return L.divIcon({
    className: "custom-leaflet-icon",
    html: `<div style="background-color: #3b82f6; color: white; border-radius: 50%; padding: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border: 2px solid white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-9h-5V5h-7"></path><circle cx="18" cy="17" r="2"></circle><circle cx="6" cy="17" r="2"></circle></svg>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const StatusPerjalananPage: React.FC = () => {
  const [liveLocation, setLiveLocation] = useState(
    shipmentData.currentLocation,
  );

  // Simulate live location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLocation((prev) => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const routeCoordinates = shipmentData.route.map(
    (p) => [p.lat, p.lng] as [number, number],
  );
  const completedTimeline = shipmentData.timeline.filter((t) => t.completed);
  const lastCompletedStatus = completedTimeline[completedTimeline.length - 1];

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Status Perjalanan Pesanan
            </h2>
            <p className="text-sm text-slate-500">
              Lacak pengiriman Anda secara real-time.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">No. Pesanan</p>
            <p className="font-bold text-slate-800">{shipmentData.orderId}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Map */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl h-[600px] relative overflow-hidden shadow-lg z-0">
          <MapContainer
            center={[liveLocation.lat, liveLocation.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Route Polyline */}
            <Polyline
              positions={routeCoordinates}
              color="#3b82f6"
              weight={5}
              opacity={0.7}
            />

            {/* Start and End Markers */}
            <Marker
              position={[shipmentData.route[0].lat, shipmentData.route[0].lng]}
              icon={L.divIcon({
                className: "custom-point-icon",
                html: '<div class="bg-emerald-500 w-3 h-3 rounded-full border-2 border-white"></div>',
              })}
            />
            <Marker
              position={[shipmentData.route[2].lat, shipmentData.route[2].lng]}
              icon={L.divIcon({
                className: "custom-point-icon",
                html: '<div class="bg-rose-500 w-3 h-3 rounded-full border-2 border-white"></div>',
              })}
            />

            {/* Truck Marker */}
            <Marker
              position={[liveLocation.lat, liveLocation.lng]}
              icon={createTruckIcon()}
            >
              <Popup>
                <div className="text-xs font-sans p-1">
                  <div className="font-bold text-slate-900">
                    {shipmentData.plateNumber}
                  </div>
                  <div className="text-slate-600">
                    {shipmentData.driverName}
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-500 z-[400]">
            📍 Live GPS Tracking
          </div>
        </div>

        {/* Right Panel: Timeline and Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Driver Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <Truck size={16} className="text-blue-600" /> Informasi Pengemudi
              & Armada
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Pengemudi:</span>
                <span className="font-semibold text-slate-800">
                  {shipmentData.driverName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">No. Polisi:</span>
                <span className="font-semibold text-slate-800">
                  {shipmentData.plateNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tipe Kendaraan:</span>
                <span className="font-semibold text-slate-800">
                  {shipmentData.vehicleType}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <Package size={16} className="text-blue-600" /> Linimasa
              Perjalanan
            </h4>
            <div className="relative">
              {/* Dotted line */}
              <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-slate-200" />

              <div className="space-y-6">
                {shipmentData.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    <div>
                      {item.completed ? (
                        <CheckCircle
                          size={18}
                          className="text-emerald-500 bg-white"
                        />
                      ) : (
                        <Circle size={18} className="text-slate-300 bg-white" />
                      )}
                    </div>
                    <div className="flex-1 -mt-1">
                      <p
                        className={`font-semibold text-xs ${item.completed ? "text-slate-800" : "text-slate-400"}`}
                      >
                        {item.status}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ETA */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">
                  Estimasi Tiba di Tujuan
                </div>
                <div className="text-lg font-extrabold text-blue-600">
                  {shipmentData.eta.split(" ")[1]}
                </div>
                <div className="text-xs text-slate-400">
                  {shipmentData.eta.split(" ")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPerjalananPage;
