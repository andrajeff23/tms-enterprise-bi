import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';

interface GaugeWidgetProps {
  title: string;
  subtitle: string;
  percentage: number;
  realizationText: string;
  targetText: string;
  color?: string;
  onViewDetail?: () => void;
}

export const GaugeWidget: React.FC<GaugeWidgetProps> = ({
  title,
  subtitle,
  percentage,
  realizationText,
  targetText,
  color = '#10B981',
  onViewDetail
}) => {
  const data = [
    { name: 'Achieved', value: percentage, fill: color },
    { name: 'Remaining', value: 100 - percentage, fill: '#E2E8F0' }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex flex-col items-center justify-center my-1 relative">
        <div className="w-32 h-20 relative flex items-end justify-center overflow-hidden">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={42}
                outerRadius={58}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute bottom-1 flex flex-col items-center pointer-events-none">
            <span className="text-xl font-bold text-slate-900 leading-none">{percentage}%</span>
          </div>
        </div>

        <div className="text-center mt-2">
          <div className="text-xs font-bold text-slate-800">{realizationText}</div>
          <div className="text-[11px] text-slate-400 font-medium">{targetText}</div>
        </div>
      </div>

      <button
        onClick={onViewDetail}
        className="mt-2 pt-2 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
      >
        <span>Lihat Detail</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
