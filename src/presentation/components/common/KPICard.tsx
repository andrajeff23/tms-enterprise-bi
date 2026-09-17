import React from 'react';
import { Package, Truck, CheckCircle2, Clock, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import type { KPIMetric } from '../../../shared/types/tms.types';

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package size={20} />,
  Truck: <Truck size={20} />,
  CheckCircle: <CheckCircle2 size={20} />,
  Clock: <Clock size={20} />,
  DollarSign: <DollarSign size={20} />
};

const themeStyles: Record<string, { bgIcon: string; titleColor: string }> = {
  blue: {
    bgIcon: 'bg-blue-100 text-blue-600',
    titleColor: 'text-slate-500'
  },
  green: {
    bgIcon: 'bg-emerald-100 text-emerald-600',
    titleColor: 'text-slate-500'
  },
  purple: {
    bgIcon: 'bg-purple-100 text-purple-600',
    titleColor: 'text-slate-500'
  },
  orange: {
    bgIcon: 'bg-amber-100 text-amber-600',
    titleColor: 'text-slate-500'
  },
  red: {
    bgIcon: 'bg-rose-100 text-rose-600',
    titleColor: 'text-slate-500'
  },
  teal: {
    bgIcon: 'bg-teal-100 text-teal-600',
    titleColor: 'text-slate-500'
  }
};

export const KPICard: React.FC<{ metric: KPIMetric }> = ({ metric }) => {
  const style = themeStyles[metric.color] || themeStyles.blue;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-bold tracking-wider uppercase ${style.titleColor}`}>
          {metric.title}
        </span>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${style.bgIcon}`}>
          {iconMap[metric.icon] || <Package size={20} />}
        </div>
      </div>

      <div className="mt-2">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</div>

        <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold">
          {metric.trend > 0 && (
            <span className="text-emerald-600 flex items-center gap-0.5">
              {metric.trendDirection === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>↗ {metric.trend}%</span>
            </span>
          )}
          <span className="text-slate-400 font-normal">{metric.subtext}</span>
        </div>
      </div>
    </div>
  );
};
