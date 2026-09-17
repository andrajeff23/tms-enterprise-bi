import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';
import type { MaintenanceReportPoint } from '../../../shared/types/tms.types';

export const MaintenanceBarChart: React.FC<{
  data: MaintenanceReportPoint[];
  onViewDetail?: () => void;
}> = ({ data, onViewDetail }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Laporan Pemeliharaan</h3>
        <p className="text-xs text-slate-500 mt-0.5">Jumlah servis per periode</p>
      </div>

      <div className="h-36 mt-3 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <XAxis dataKey="period" stroke="#94A3B8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
            <Tooltip
              formatter={(value: any) => [`${value} Servis`, 'Jumlah']}
              contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '11px' }}
            />
            <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
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
