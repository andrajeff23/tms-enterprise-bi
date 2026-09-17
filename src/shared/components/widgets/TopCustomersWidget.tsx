import React from "react";
import type { CustomerRanking } from '../../types/tms.types';

export const TopCustomersWidget: React.FC<{ customers: CustomerRanking[] }> = ({
  customers,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Top 5 Customer</h3>
        <p className="text-xs text-slate-500 mt-0.5">Berdasarkan nilai order</p>
      </div>

      <div className="space-y-3 mt-4">
        {customers.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0 text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-[11px]">
                {c.rank}
              </span>
              <span className="font-semibold text-slate-800">{c.name}</span>
            </div>
            <span className="font-bold text-slate-900">{c.revenueText}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
