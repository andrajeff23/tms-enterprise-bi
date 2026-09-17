import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { OnTimePerformanceData } from '../../types/tms.types';

export const OnTimeAreaChart: React.FC<{ data: OnTimePerformanceData[] }> = ({
  data,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">
          Performa On Time Delivery
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Persentase pengiriman tepat waktu
        </p>
      </div>

      <div className="h-56 mt-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F1F5F9"
              vertical={false}
            />
            <XAxis
              dataKey="period"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              domain={[0, 100]}
              unit="%"
            />
            <Tooltip
              formatter={(value: any) => [`${value}%`, "On Time"]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="achievement"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#blueGradient)"
              dot={{ r: 5, fill: "#2563EB", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
