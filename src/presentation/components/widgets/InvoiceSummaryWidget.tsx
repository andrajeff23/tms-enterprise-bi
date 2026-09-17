import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { InvoiceSummary } from '../../../shared/types/tms.types';

export const InvoiceSummaryWidget: React.FC<{
  summary: InvoiceSummary | null;
  onViewDetail?: () => void;
}> = ({ summary, onViewDetail }) => {
  if (!summary) return null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Invoice & Penagihan</h3>
        <p className="text-xs text-slate-500 mt-0.5">Ringkasan status invoice</p>
      </div>

      <div className="space-y-2 mt-3 text-xs">
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-slate-600 font-medium">Total Invoice</span>
          <span className="font-bold text-slate-900">{summary.totalRevenue}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-amber-700 font-medium">Belum Dibayar</span>
          <span className="font-bold text-amber-600">{summary.unpaid}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-emerald-700 font-medium">Sudah Dibayar</span>
          <span className="font-bold text-emerald-600">{summary.paid}</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-rose-700 font-medium">Overdue</span>
          <span className="font-bold text-rose-600">{summary.overdue}</span>
        </div>
      </div>

      <button
        onClick={onViewDetail}
        className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
      >
        <span>Lihat Detail</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
