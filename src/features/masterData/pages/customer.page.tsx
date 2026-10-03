import {
  AlertCircle,
  Building,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface Customer {
  code: string;
  name: string;
  type: string;
  pic: string;
  phone: string;
  email: string;
  city: string;
  totalOrders: number;
  totalRevenue: number;
  status: string;
  creditLimit: number;
  outstanding: number;
}

const customers: Customer[] = [
  {
    code: "CUST-001",
    name: "PT. ABC Indonesia",
    type: "CORPORATE",
    pic: "Budi Santoso",
    phone: "0812-3456-7890",
    email: "budi@abc-indonesia.co.id",
    city: "Jakarta",
    totalOrders: 142,
    totalRevenue: 8200000000,
    status: "ACTIVE",
    creditLimit: 5000000000,
    outstanding: 1250000000,
  },
  {
    code: "CUST-002",
    name: "PT. XYZ Nusantara",
    type: "CORPORATE",
    pic: "Agus Setiawan",
    phone: "0813-9876-5432",
    email: "agus@xyz-nusantara.co.id",
    city: "Surabaya",
    totalOrders: 98,
    totalRevenue: 5400000000,
    status: "ACTIVE",
    creditLimit: 3000000000,
    outstanding: 480000000,
  },
  {
    code: "CUST-003",
    name: "PT. Maju Bersama",
    type: "SME",
    pic: "Dewi Lestari",
    phone: "0815-1122-3344",
    email: "dewi@majubersama.co.id",
    city: "Bandung",
    totalOrders: 84,
    totalRevenue: 3200000000,
    status: "ACTIVE",
    creditLimit: 2000000000,
    outstanding: 380000000,
  },
  {
    code: "CUST-004",
    name: "PT. Sukses Makmur",
    type: "SME",
    pic: "Hendra Gunawan",
    phone: "0817-5566-7788",
    email: "hendra@suksesmakmur.co.id",
    city: "Semarang",
    totalOrders: 65,
    totalRevenue: 2100000000,
    status: "WATCH",
    creditLimit: 1500000000,
    outstanding: 420000000,
  },
  {
    code: "CUST-005",
    name: "PT. Sejahtera Abadi",
    type: "CORPORATE",
    pic: "Eko Purnama",
    phone: "0819-7788-9900",
    email: "eko@sejahteraabadi.co.id",
    city: "Medan",
    totalOrders: 57,
    totalRevenue: 4800000000,
    status: "ACTIVE",
    creditLimit: 4000000000,
    outstanding: 0,
  },
  {
    code: "CUST-006",
    name: "PT. Nusantara Jaya",
    type: "CORPORATE",
    pic: "Sari Dewi",
    phone: "0811-2233-4455",
    email: "sari@nusantarajaya.co.id",
    city: "Makassar",
    totalOrders: 43,
    totalRevenue: 3500000000,
    status: "ACTIVE",
    creditLimit: 2500000000,
    outstanding: 675000000,
  },
  {
    code: "CUST-007",
    name: "PT. Pangan Nusantara",
    type: "CORPORATE",
    pic: "Ahmad Fauzi",
    phone: "0812-1234-5678",
    email: "ahmad@pangannusantara.co.id",
    city: "Surabaya",
    totalOrders: 38,
    totalRevenue: 2900000000,
    status: "ACTIVE",
    creditLimit: 2000000000,
    outstanding: 0,
  },
  {
    code: "CUST-008",
    name: "PT. Motor Bersama",
    type: "SME",
    pic: "Rudi Santoso",
    phone: "0813-3344-5566",
    email: "rudi@motorbersama.co.id",
    city: "Jakarta",
    totalOrders: 29,
    totalRevenue: 1400000000,
    status: "WATCH",
    creditLimit: 1000000000,
    outstanding: 280000000,
  },
];

export const CustomerPage: React.FC = () => {
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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const custStatusBadge = (s: string) => {
    if (s === "ACTIVE")
      return (
        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit">
          <CheckCircle size={11} /> Active
        </span>
      );
    if (s === "WATCH")
      return (
        <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 w-fit">
          <AlertCircle size={11} /> Watch
        </span>
      );
    return (
      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold text-[11px]">
        {s}
      </span>
    );
  };

  const filteredCustomers = customers.filter((c) => {
    const q = search.toLowerCase();
    const match =
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.pic.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q);
    return match && (filterStatus === "ALL" || c.status === filterStatus);
  });

  const fmtRp = (n: number) => `Rp ${(n / 1000000).toLocaleString("id-ID")} Jt`;
  const fmtRpFull = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  const kpi = [
    { label: "Total Customer", val: customers.length, color: "text-slate-800" },
    {
      label: "Corporate",
      val: customers.filter((c) => c.type === "CORPORATE").length,
      color: "text-indigo-600",
    },
    {
      label: "SME",
      val: customers.filter((c) => c.type === "SME").length,
      color: "text-blue-600",
    },
    {
      label: "Watchlist",
      val: customers.filter((c) => c.status === "WATCH").length,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Data Customer</h2>
            <p className="text-xs text-slate-500">
              Database customer, PIC, dan histori transaksi
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              Swal.fire({
                icon: "success",
                title: "Informasi",
                text: "Export data customer",
              })
            }
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors"
          >
            <Download size={14} /> <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Plus size={16} /> <span>Tambah Customer</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-500">{k.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div> */}

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={16}
            className="text-slate-400 absolute left-3 top-2.5"
          />
          <input
            type="text"
            placeholder="Cari Kode, Nama, PIC, Kota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-50 h-10 border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none"
        >
          <option value="ALL">Semua Status</option>
          <option value="ACTIVE">Active</option>
          <option value="WATCH">Watchlist</option>
        </select>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Customer</h3>
          <span className="text-xs text-slate-500">
            {filteredCustomers.length} customer
          </span>
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
              {filteredCustomers
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage,
                )
                .map((c) => (
                  <tr
                    key={c.code}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-blue-600">{c.code}</div>
                      <div className="font-bold text-slate-900">{c.name}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-bold text-[10px] px-2 py-0.5 rounded ${c.type === "CORPORATE" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">
                        {c.pic}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Phone size={9} />
                        {c.phone}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-slate-700">
                        <MapPin size={10} className="text-slate-400" />
                        {c.city}
                      </div>
                    </td>
                    <td className="p-3.5 text-center font-bold text-slate-900">
                      {c.totalOrders}
                    </td>
                    <td className="p-3.5 text-right font-bold text-emerald-600">
                      {fmtRp(c.totalRevenue)}
                    </td>
                    <td className="p-3.5 text-right font-bold">
                      {c.outstanding > 0 ? (
                        <span className="text-rose-600">
                          {fmtRp(c.outstanding)}
                        </span>
                      ) : (
                        <span className="text-emerald-600">Lunas</span>
                      )}
                    </td>
                    <td className="p-3.5">{custStatusBadge(c.status)}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-0.5 justify-center w-full"
                      >
                        <Eye size={12} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {renderPagination(filteredCustomers.length)}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedCustomer.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {selectedCustomer.code}
                </div>
              </div>
              {custStatusBadge(selectedCustomer.status)}
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">
                    Tipe Customer
                  </div>
                  <div className="font-bold text-slate-800 mt-0.5">
                    {selectedCustomer.type}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Total Order</div>
                  <div className="font-bold text-slate-800 mt-0.5">
                    {selectedCustomer.totalOrders} Transaksi
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Kontak PIC</div>
                  <div className="font-bold text-slate-800 mt-0.5">
                    {selectedCustomer.pic}
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    {selectedCustomer.phone}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-slate-400 text-[10px]">Email</div>
                  <div className="font-bold text-slate-800 mt-0.5">
                    {selectedCustomer.email}
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    {selectedCustomer.city}
                  </div>
                </div>
              </div>

              {/* Financials */}
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-2">
                  Informasi Keuangan
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <span className="text-slate-500 font-medium">
                      Credit Limit
                    </span>
                    <span className="font-bold text-slate-800">
                      {fmtRpFull(selectedCustomer.creditLimit)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <span className="text-slate-500 font-medium">
                      Total Revenue
                    </span>
                    <span className="font-bold text-emerald-600">
                      {fmtRpFull(selectedCustomer.totalRevenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <span className="text-slate-500 font-medium">
                      Outstanding (Piutang)
                    </span>
                    <span
                      className={`font-bold ${selectedCustomer.outstanding > 0 ? "text-rose-600" : "text-emerald-600"}`}
                    >
                      {fmtRpFull(selectedCustomer.outstanding)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() =>
                  Swal.fire({
                    icon: "success",
                    title: "Informasi",
                    text: `Edit data customer: ${selectedCustomer.name}`,
                  })
                }
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 text-xs"
              >
                Edit Data
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building size={16} className="text-indigo-600" /> Tambah Customer
              Baru
            </h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Kode Customer
                  </label>
                  <input
                    type="text"
                    placeholder="CUST-XXX"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Tipe
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5">
                    <option>CORPORATE</option>
                    <option>SME</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Nama Perusahaan / Customer
                </label>
                <input
                  type="text"
                  placeholder="PT. ..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    PIC (Kontak)
                  </label>
                  <input
                    type="text"
                    placeholder="Nama PIC"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    No. Handphone
                  </label>
                  <input
                    type="text"
                    placeholder="08xx..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Kota
                  </label>
                  <input
                    type="text"
                    placeholder="Jakarta, dll"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Credit Limit (Rp)
                </label>
                <input
                  type="number"
                  placeholder="500000000"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    Swal.fire({
                      icon: "success",
                      title: "Informasi",
                      text: "Customer baru berhasil ditambahkan!",
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs hover:bg-indigo-700"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
