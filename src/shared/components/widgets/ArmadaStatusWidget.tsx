import React from 'react';
import { Truck, Wrench, AlertTriangle, CheckCircle, PowerOff } from 'lucide-react';
import type { UnitStatusSummary } from '../../types/tms.types';

export const ArmadaStatusWidget: React.FC<{ summary: UnitStatusSummary | null }> = ({ summary }) => {
  if (!summary) return null;

  const items = [
    {
      label: 'Ready',
      count: summary.ready.count,
      percent: summary.ready.percentage,
      icon: <CheckCircle size={18} className="text-emerald-600" />,
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      label: 'Beroperasi',
      count: summary.operational.count,
      percent: summary.operational.percentage,
      icon: <Truck size={18} className="text-blue-600" />,
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      label: 'Maintenance',
      count: summary.maintenance.count,
      percent: summary.maintenance.percentage,
      icon: <Wrench size={18} className="text-amber-600" />,
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      label: 'Rusak',
      count: summary.broken.count,
      percent: summary.broken.percentage,
      icon: <AlertTriangle size={18} className="text-rose-600" />,
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      label: 'Tidak Aktif',
      count: summary.inactive.count,
      percent: summary.inactive.percentage,
      icon: <PowerOff size={18} className="text-slate-500" />,
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200'
    }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Ringkasan Armada (Status Unit)</h3>
        <p className="text-xs text-slate-500 mt-0.5">Status unit operasional secara real-time</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
        {items.map(item => (
          <div
            key={item.label}
            className="bg-slate-50/70 border border-slate-200/70 rounded-lg p-3 flex flex-col items-center justify-center text-center hover:bg-slate-100/80 transition-colors"
          >
            <div className="mb-1.5">{item.icon}</div>
            <span className="text-[11px] font-semibold text-slate-500">{item.label}</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">{item.count} Unit</div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border mt-1 ${item.badgeBg}`}>
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
