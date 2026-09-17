import { ArrowRight } from "lucide-react";
import React from "react";
import type { DamagedUnit } from '../../types/tms.types';

export const UnitRusakWidget: React.FC<{
  units: DamagedUnit[];
  onViewAll?: () => void;
}> = ({ units, onViewAll }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Unit Rusak</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Daftar unit dengan kerusakan terbaru
        </p>
      </div>

      <div className="space-y-2 mt-3 overflow-y-auto max-h-36 pr-1 custom-scrollbar">
        {units.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">
                    {item.plateNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    ({item.vehicleType})
                  </span>
                </div>
                <span className="text-slate-600 text-[11px] font-medium">
                  {item.problem}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
              {item.date}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onViewAll}
        className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
      >
        <span>Lihat Semua</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
