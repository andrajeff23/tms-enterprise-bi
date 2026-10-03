import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
  Shield,
  Truck as TruckIcon,
} from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

type DriverStatus = "ON_DUTY" | "BREAKDOWN" | "OFF_DUTY";

interface Driver {
  code: string;
  name: string;
  sim: string;
  simNo: string;
  simExpiry: string;
  phone: string;
  city: string;
  status: DriverStatus;
  rating: number;
  totalTrips: number;
  joinDate: Date;
  vehiclePlate: string;
  shppingpoint: string;
  overspeedCount: number;
}

const drivers: Driver[] = [
  {
    code: "DRV-001",
    name: "Slamet Rahardjo",
    sim: "SIM B2 Umum",
    simNo: "920812345678",
    simExpiry: "2028-03-15",
    phone: "0812-9876-5432",
    city: "Jakarta",
    status: "ON_DUTY",
    rating: 4.9,
    totalTrips: 412,
    joinDate: new Date(),
    vehiclePlate: "B 9123 KXA",
    overspeedCount: 2,
    shppingpoint: "BI123",
  },
  {
    code: "DRV-002",
    name: "Budi Kurniawan",
    sim: "SIM B2 Umum",
    simNo: "920887654321",
    simExpiry: "2027-08-20",
    phone: "0813-1122-3344",
    city: "Surabaya",
    status: "ON_DUTY",
    rating: 4.7,
    totalTrips: 356,
    joinDate: new Date(),
    vehiclePlate: "B 9876 KXB",
    overspeedCount: 5,
    shppingpoint: "BI23",
  },
  {
    code: "DRV-003",
    name: "Andi Saputra",
    sim: "SIM B1 Umum",
    simNo: "920855443322",
    simExpiry: "2027-11-10",
    phone: "0815-5566-7788",
    city: "Jakarta",
    status: "OFF_DUTY",
    rating: 4.8,
    totalTrips: 298,
    joinDate: new Date(),
    vehiclePlate: "B 4567 KXC",
    overspeedCount: 1,
    shppingpoint: "DT221",
  },
  {
    code: "DRV-004",
    name: "Hendra Gunawan",
    sim: "SIM B2 Umum",
    simNo: "920899887766",
    simExpiry: "2027-05-05",
    phone: "0817-4455-6677",
    city: "Surabaya",
    status: "BREAKDOWN",
    rating: 4.5,
    totalTrips: 245,
    joinDate: new Date(),
    vehiclePlate: "B 1289 KXD",
    overspeedCount: 8,
    shppingpoint: "DT14",
  },
  {
    code: "DRV-005",
    name: "Dedi Setiawan",
    sim: "SIM B1 Umum",
    simNo: "920833221100",
    simExpiry: "2026-12-01",
    phone: "0812-3344-5566",
    city: "Semarang",
    status: "ON_DUTY",
    rating: 4.6,
    totalTrips: 187,
    joinDate: new Date(),
    vehiclePlate: "B 1122 KXE",
    overspeedCount: 3,
    shppingpoint: "BI80",
  },
  {
    code: "DRV-006",
    name: "Rudi Hermawan",
    sim: "SIM B2 Umum",
    simNo: "920811223344",
    simExpiry: "2028-07-20",
    phone: "0819-5566-7788",
    city: "Jakarta",
    status: "ON_DUTY",
    rating: 4.8,
    totalTrips: 321,
    joinDate: new Date(),
    vehiclePlate: "B 3344 KXF",
    overspeedCount: 0,
    shppingpoint: "BI85",
  },
  {
    code: "DRV-007",
    name: "Eko Prasetyo",
    sim: "SIM B2 Umum",
    simNo: "920877665544",
    simExpiry: "2027-09-15",
    phone: "0812-7788-9900",
    city: "Surabaya",
    status: "ON_DUTY",
    rating: 4.7,
    totalTrips: 278,
    joinDate: new Date(),
    vehiclePlate: "B 5566 KXG",
    overspeedCount: 4,
    shppingpoint: "BI55",
  },
  {
    code: "DRV-008",
    name: "Agus Wijaya",
    sim: "SIM B1 Umum",
    simNo: "920844332211",
    simExpiry: "2026-10-30",
    phone: "0815-9900-1122",
    city: "Bekasi",
    status: "OFF_DUTY",
    rating: 4.4,
    totalTrips: 152,
    joinDate: new Date(),
    vehiclePlate: "B 7788 KXH",
    overspeedCount: 12,
    shppingpoint: "BI117",
  },
];

const docStatus = (expiry: string) => {
  const exp = new Date(expiry);
  const now = new Date("2026-09-03");
  const days = Math.floor(
    (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days < 0)
    return (
      <span className="text-rose-600 font-bold text-[10px]">✗ Expired</span>
    );
  if (days < 60)
    return (
      <span className="text-amber-600 font-bold text-[10px]">
        ⚠ {days}h lagi
      </span>
    );
  return (
    <span className="text-emerald-600 font-bold text-[10px]">✓ {expiry}</span>
  );
};

export const DriverPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedVehicle, setSelectedVehicle] = useState<Driver | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const statusBadge = (s: DriverStatus) => {
    const map: Record<DriverStatus, { cls: string; label: string }> = {
      ON_DUTY: { cls: "bg-emerald-100 text-emerald-700", label: "On Duty" },
      OFF_DUTY: { cls: "bg-blue-100 text-blue-700", label: "Off Duty" },
      BREAKDOWN: { cls: "bg-amber-100 text-amber-700", label: "Breakdown" },
    };
    const d = map[s];
    return (
      <span
        className={`${d.cls} px-2.5 py-1 rounded-full font-bold text-[11px]`}
      >
        {d.label}
      </span>
    );
  };

  const filtered = drivers.filter((v) => {
    const q = search.toLowerCase();
    const match =
      v.name.toLowerCase().includes(q) ||
      v.code.toLowerCase().includes(q) ||
      v.vehiclePlate.toLowerCase().includes(q) ||
      v.simNo.toLowerCase().includes(q) ||
      v.phone.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q);
    return match && (filterStatus === "ALL" || v.status === filterStatus);
  });

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
            <TruckIcon size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Data Driver / Sopir
            </h2>
            <p className="text-xs text-slate-500">
              Daftar Semua Driver / Sopir Belawan Indah
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              Swal.fire({
                icon: "success",
                title: "Informasi",
                text: "Export data kendaraan",
              })
            }
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors"
          >
            <Download size={14} /> <span>Export</span>
          </button>
        </div>
      </div>

      {/* KPI 
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div>*/}

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={16}
            className="text-slate-400 absolute left-3 top-2.5"
          />
          <input
            type="text"
            placeholder="Cari Plat, Merk, Model, Driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-50 h-10 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none"
        >
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
          <h3 className="font-bold text-slate-900 text-sm">
            Inventaris Kendaraan
          </h3>
          <span className="text-xs text-slate-500">{filtered.length} unit</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Kode / Nama</th>
                <th className="p-3.5">Kendaraan</th>
                <th className="p-3.5 text-center">SIM</th>
                <th className="p-3.5 text-center">No. Handphone</th>
                <th className="p-3.5 text-center">Pool</th>
                <th className="p-3.5 text-center">Rating</th>
                <th className="p-3.5 text-center">Total Trip</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage,
                )
                .map((v) => (
                  <tr
                    key={v.code}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{v.name}</div>
                      <div className="text-[11px] text-slate-400">{v.code}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">
                        {v.shppingpoint}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {v.vehiclePlate}
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-blue-600">{v.simNo}</span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-blue-600">{v.phone}</span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-blue-600">{v.city}</span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-blue-600">
                        {v.rating}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-blue-600">
                        {v.totalTrips}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-blue-600">
                        {v.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => setSelectedVehicle(v)}
                        className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-semibold text-[11px]"
                      >
                        <Eye size={12} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {renderPagination(filtered.length)}
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedVehicle.shppingpoint}
                </h3>
                <div className="text-xs text-slate-500">
                  {selectedVehicle.vehiclePlate} · {selectedVehicle.code}{" "}
                </div>
              </div>
              {statusBadge(selectedVehicle.status)}
            </div>

            <div className="space-y-4 text-xs">
              {/* Specs */}
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">
                  Data Driver
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Driver", selectedVehicle.name],
                    ["Shipping Point", selectedVehicle.shppingpoint],
                    ["PoSol", selectedVehicle.city],
                    ["Rating", selectedVehicle.rating],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-slate-50 rounded-lg p-2.5">
                      <div className="text-slate-400 text-[10px]">{k}</div>
                      <div className="font-bold text-slate-800 mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identification */}
              <div className="space-y-4 text-xs">
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">
                  Data SIM
                </div>
                <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">No. SIM</span>
                    <span className="font-mono font-bold text-slate-700">
                      {selectedVehicle.simNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SIM Expired</span>
                    <span className="font-mono font-bold text-slate-700">
                      {selectedVehicle.simExpiry}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">
                Statistik Driver
              </div>
              <div className="space-y-2">
                {[
                  ["Rating", selectedVehicle.rating],
                  ["Total Trips", selectedVehicle.totalTrips],
                  ["Status", selectedVehicle.status],
                  ["Overspeed", selectedVehicle.overspeedCount],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between bg-slate-50 rounded-lg p-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <Shield size={13} className="text-slate-400" />
                      <span className="font-semibold text-slate-700">{k}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
