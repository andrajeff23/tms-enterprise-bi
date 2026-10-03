import daysjs from "dayjs";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  BookCopy,
  ChevronLeft,
  ChevronRight,
  Map,
  Search,
  X,
} from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

// Mock data for customer's trip history
const tripHistoryData = [
  {
    orderId: "SO-2024-08-123",
    orderDate: "2026-08-15",
    origin: "Gudang Medan",
    destination: "Gudang Pekanbaru",
    status: "Selesai",
    vehicle: "Truck Wingbox BK 9123 KXA",
    route: [
      { lat: 3.5833, lng: 98.6667 },
      { lat: 0.5071, lng: 101.4478 },
    ],
  },
  {
    orderId: "SO-2024-08-115",
    orderDate: "2026-08-10",
    origin: "Gudang Jakarta",
    destination: "Gudang Surabaya",
    status: "Selesai",
    vehicle: "Trailer B 9876 KXB",
    route: [
      { lat: -6.2088, lng: 106.8456 },
      { lat: -7.2575, lng: 112.7521 },
    ],
  },
  {
    orderId: "SO-2024-07-098",
    orderDate: "2026-07-20",
    origin: "Gudang Medan",
    destination: "Gudang Palembang",
    status: "Selesai",
    vehicle: "Tronton B 3344 KXF",
    route: [
      { lat: 3.5833, lng: 98.6667 },
      { lat: -2.9761, lng: 104.7754 },
    ],
  },
  {
    orderId: "SO-2024-07-081",
    orderDate: "2026-07-05",
    origin: "Gudang Semarang",
    destination: "Gudang Solo",
    status: "Dibatalkan",
    vehicle: "CDE Box B 1122 KXE",
    route: [
      { lat: -6.9667, lng: 110.4167 },
      { lat: -7.5667, lng: 110.8167 },
    ],
  },
  {
    orderId: "SO-2024-06-075",
    orderDate: "2026-06-25",
    origin: "Gudang Surabaya",
    destination: "Gudang Makassar",
    status: "Selesai",
    vehicle: "Trailer B 5566 KXG",
    route: [
      { lat: -7.2575, lng: 112.7521 },
      { lat: -5.1477, lng: 119.4167 },
    ],
  },
];

type Trip = (typeof tripHistoryData)[0];

const getStatusChip = (status: string) => {
  switch (status) {
    case "Selesai":
      return "bg-emerald-100 text-emerald-700";
    case "Dibatalkan":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const HistoryPerjalananPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const itemsPerPage = 5;

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const filteredData = tripHistoryData.filter((trip) => {
    const matchesSearch =
      trip.orderId.toLowerCase().includes(search.toLowerCase()) ||
      trip.origin.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || trip.status === filterStatus;
    let matchDate = true;
    if (filterStartDate || filterEndDate) {
      const orderDate = daysjs(trip.orderDate);
      if (filterStartDate && orderDate.isBefore(filterStartDate, "day")) {
        matchDate = false;
      }
      if (filterEndDate && orderDate.isAfter(filterEndDate, "day")) {
        matchDate = false;
      }
    }
    return matchesSearch && matchesStatus && matchDate;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const filtered = filteredData.filter((o) => {
    const q = search.toLowerCase();
    const match =
      o.orderId.toLowerCase().includes(q) ||
      o.origin.toLowerCase().includes(q) ||
      o.destination.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q);
    const matchStatus = filterStatus === "ALL" || o.status === filterStatus;

    let matchDate = true;
    if (filterStartDate || filterEndDate) {
      const orderDate = daysjs(o.orderDate);
      if (filterStartDate && orderDate.isBefore(filterStartDate, "day")) {
        matchDate = false;
      }
      if (filterEndDate && orderDate.isAfter(filterEndDate, "day")) {
        matchDate = false;
      }
    }

    return match && matchStatus && matchDate;
  });

  const renderPagination = (dataLength: number) => {
    const totalPages = Math.ceil(dataLength / itemsPerPage);
    return (
      <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan{" "}
          <span className="font-bold text-slate-800">
            {dataLength === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          -{" "}
          <span className="font-bold text-slate-800">
            {Math.min(currentPage * itemsPerPage, dataLength)}
          </span>{" "}
          dari <span className="font-bold text-slate-800">{dataLength}</span>{" "}
          data
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <BookCopy size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Riwayat Perjalanan
            </h2>
            <p className="text-xs text-slate-500">
              Lihat semua riwayat pesanan pengiriman Anda.
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Customer</p>
          <p className="font-bold text-slate-800">PT. Sinar Dunia (Contoh)</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header & Actions */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search
              size={16}
              className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Cari No. Pesanan, Rute..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 h-10 border border-slate-200 text-xs rounded-lg pl-9 pr-3 py-2.5 focus:outline-none"
            />
          </div>
          {/* Date Filters */}
          <div className="relative w-full sm:w-auto">
            <DatePicker
              selected={filterStartDate}
              onChange={(date: Date | null) => setFilterStartDate(date)}
              placeholderText="Tanggal Mulai"
              className="w-full h-10 bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <span className="text-xs text-slate-500 px-1">s/d</span>

          <div className="relative w-full sm:w-auto">
            <DatePicker
              selected={filterEndDate}
              onChange={(date: Date | null) => setFilterEndDate(date)}
              placeholderText="Tanggal Selesai"
              className="w-full h-10 bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          {/* Button Reset*/}
          <button
            onClick={() => {
              setSearch("");
              setFilterStatus("ALL");
              setFilterStartDate(null);
              setFilterEndDate(null);
            }}
            className="
                        h-10
                        w-[135px]
                        bg-slate-50
                        border border-slate-300
                        text-xs
                        font-medium
                        text-slate-700
                        rounded-lg
                        px-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500/20
                      "
          >
            Reset Tanggal
          </button>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border h-10 border-slate-200 px-3 py-2.5 rounded-lg hover:bg-slate-100 focus:outline-none"
            >
              <option value="ALL">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3">No. Pesanan</th>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">Rute</th>
                <th className="px-6 py-3">Kendaraan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((trip) => (
                <tr
                  key={trip.orderId}
                  className="bg-white border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {trip.orderId}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{trip.orderDate}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="font-semibold">
                      {trip.origin} → {trip.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{trip.vehicle}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(trip.status)}`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewDetails(trip)}
                      className="flex items-center justify-center mx-auto gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <Map size={14} />
                      <span>Detail</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderPagination(filtered.length)}
      </div>

      {/* Modal for Trip Details */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-slate-800">
                Detail Perjalanan: {selectedTrip.orderId}
              </h3>
              <button
                onClick={() => setSelectedTrip(null)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full overflow-hidden">
              <div className="p-4 space-y-3 overflow-y-auto">
                <h4 className="font-semibold text-sm text-slate-700">
                  Informasi Pesanan
                </h4>
                <div className="text-xs space-y-1.5">
                  <p>
                    <span className="text-slate-500">Tanggal:</span>{" "}
                    <span className="font-semibold text-slate-800">
                      {selectedTrip.orderDate}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-500">Rute:</span>{" "}
                    <span className="font-semibold text-slate-800">
                      {selectedTrip.origin} → {selectedTrip.destination}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-500">Kendaraan:</span>{" "}
                    <span className="font-semibold text-slate-800">
                      {selectedTrip.vehicle}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-500">Status:</span>{" "}
                    <span
                      className={`font-semibold ${getStatusChip(selectedTrip.status).split(" ").slice(1).join(" ")}`}
                    >
                      {selectedTrip.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-slate-100 h-full min-h-[300px] p-2">
                <MapContainer
                  bounds={
                    selectedTrip.route as unknown as L.LatLngBoundsExpression
                  }
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Polyline
                    positions={selectedTrip.route as L.LatLngExpression[]}
                    color="#3b82f6"
                  />
                  <Marker
                    position={selectedTrip.route[0] as L.LatLngExpression}
                  />
                  <Marker
                    position={selectedTrip.route[1] as L.LatLngExpression}
                  />
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPerjalananPage;
