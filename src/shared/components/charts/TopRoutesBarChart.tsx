import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RouteRanking } from '../../types/tms.types';

export const TopRoutesBarChart: React.FC<{ routes: RouteRanking[] }> = ({
  routes,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">Top 5 Rute</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Berdasarkan jumlah pengiriman
        </p>
      </div>

      <div className="h-56 mt-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={routes}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
          >
            <XAxis
              type="number"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="route"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              width={110}
            />
            <Tooltip
              formatter={(value: any) => [`${value} Pengiriman`, "Jumlah"]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
              {routes.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? "#2563EB"
                      : index === 1
                        ? "#3B82F6"
                        : index === 2
                          ? "#06B6D4"
                          : index === 3
                            ? "#10B981"
                            : "#34D399"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
