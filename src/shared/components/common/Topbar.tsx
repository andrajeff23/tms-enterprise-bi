import {
  Bell,
  Calendar,
  ChevronDown,
  Download,
  Menu,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../lib/store';
import { setDateRange, setSelectedUnitFilter } from '../../lib/store/tmsSlice';
import { useAuth } from '../../../features/auth/auth.hook';

interface TopbarProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  title = "Dashboard",
  subtitle = "Pantauan real-time operasional transportasi & logistik",
  onMenuClick,
}) => {
  const dispatch = useDispatch();
  const dateRange = useSelector((state: RootState) => state.tms.dateRange);
  const selectedUnitFilter = useSelector(
    (state: RootState) => state.tms.selectedUnitFilter,
  );
  const notificationsCount = useSelector(
    (state: RootState) => state.tms.notificationsCount,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const { logout } = useAuth();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dateOptions = [
    "01 Mei 2026 - 31 Mei 2026",
    "01 Apr 2026 - 30 Apr 2026",
    "01 Mar 2026 - 31 Mar 2026",
    "Tahun 2026 (YTD)",
  ];

  const unitOptions = [
    "Semua Unit",
    "Wingbox",
    "Trailer",
    "CDD Long",
    "Tronton",
  ];

  const handleExport = (type: string) => {
    alert(`Laporan format ${type} berhasil diunduh!`);
    setShowExportModal(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-navy-900 border-b border-white/10 px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-slate-900/10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            <Calendar size={15} className="text-slate-300" />
            <span>{dateRange}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 text-xs">
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    dispatch(setDateRange(opt));
                    setShowDatePicker(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors ${dateRange === opt
                    ? "font-bold text-blue-600 bg-blue-50"
                    : "text-slate-700"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <select
            value={selectedUnitFilter}
            onChange={(e) => dispatch(setSelectedUnitFilter(e.target.value))}
            className="bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {unitOptions.map((u) => (
              <option key={u} value={u} className="bg-white text-slate-800">
                {u}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="text-slate-400 absolute right-2.5 top-2.5 pointer-events-none"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowExportModal(!showExportModal)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-md shadow-blue-600/30"
          >
            <Download size={15} />
            <span>Unduh Laporan</span>
            <ChevronDown size={14} className="text-blue-200" />
          </button>

          {showExportModal && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 text-xs">
              <button
                onClick={() => handleExport("Excel (.xlsx)")}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Export Excel</span>
                <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">
                  .XLSX
                </span>
              </button>
              <button
                onClick={() => handleExport("PDF (.pdf)")}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Export PDF</span>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                  .PDF
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

        <button
          onClick={() =>
            alert(`Anda memiliki ${notificationsCount} pemberitahuan baru.`)
          }
          className="relative p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Bell size={18} />
          {notificationsCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-navy-900 shadow-xs">
              {notificationsCount}
            </span>
          )}
        </button>

        <div className="relative">
          <div
            className="flex items-center gap-2 pl-2 cursor-pointer hover:opacity-90"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full shadow-md shadow-blue-600/30" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-600/30">
                <User size={16} />
              </div>
            )}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white">
              <span>{user?.name || "Administrator"}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-800 truncate">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || "admin@tms.com"}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
