import { Info } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/10 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-medium">
      <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
        <Info size={14} className="text-blue-400" />
        <span>Data diperbarui terakhir: 31 Mei 2026 10:30 WIB</span>
      </div>

      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
        <span>TMS BI Dashboard</span>
        <span>|</span>
        <span>Transport Management System</span>
      </div>
    </footer>
  );
};
