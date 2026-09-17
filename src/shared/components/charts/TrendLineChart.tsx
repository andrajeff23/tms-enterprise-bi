import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { TrendDataPoint } from '../../types/tms.types';

export const TrendLineChart: React.FC<{ data: TrendDataPoint[] }> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Trend Order & Delivery Order</h3>
          <p className="text-xs text-slate-500 mt-0.5">Perbandingan order vs delivery order</p>
        </div>
      </div>

      <div className="h-56 mt-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[0, 300]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
            />
            <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '0px' }} />
            <Line
              type="monotone"
              dataKey="order"
              name="Order"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#2563EB' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="deliveryOrder"
              name="Delivery Order"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#10B981' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
