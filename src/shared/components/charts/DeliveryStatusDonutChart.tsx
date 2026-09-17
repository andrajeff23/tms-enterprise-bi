import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { DeliveryStatusSummary } from '../../types/tms.types';

export const DeliveryStatusDonutChart: React.FC<{ summary: DeliveryStatusSummary | null }> = ({ summary }) => {
  if (!summary) return null;

  const data = [
    { name: 'Delivered', value: summary.delivered.count, percentage: summary.delivered.percentage, color: '#10B981' },
    { name: 'In Progress', value: summary.inProgress.count, percentage: summary.inProgress.percentage, color: '#2563EB' },
    { name: 'Pending', value: summary.pending.count, percentage: summary.pending.percentage, color: '#F59E0B' },
    { name: 'Cancelled', value: summary.cancelled.count, percentage: summary.cancelled.percentage, color: '#EF4444' }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Status Pengiriman</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-2">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value} Order`, 'Jumlah']} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-slate-900 leading-none">{summary.totalDO}</span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">Total DO</span>
          </div>
        </div>

        <div className="flex-1 space-y-2 w-full text-xs">
          {data.map(item => (
            <div key={item.name} className="flex items-center justify-between py-0.5 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-slate-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{item.value}</span>
                <span className="text-[11px] text-slate-500 font-medium">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
