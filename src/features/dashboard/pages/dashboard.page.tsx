import { Loader2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../shared/lib/store";
import { useNavigationStore } from "../../../shared/lib/store/useNavigationStore";
import { DeliveryStatusDonutChart } from "../../../shared/components/charts/DeliveryStatusDonutChart";
import { MaintenanceBarChart } from "../../../shared/components/charts/MaintenanceBarChart";
import { OnTimeAreaChart } from "../../../shared/components/charts/OnTimeAreaChart";
import { TopRoutesBarChart } from "../../../shared/components/charts/TopRoutesBarChart";
import { TrendLineChart } from "../../../shared/components/charts/TrendLineChart";
import { KPICard } from "../../../shared/components/common/KPICard";
import { ArmadaStatusWidget } from "../../../shared/components/widgets/ArmadaStatusWidget";
import { GaugeWidget } from "../../../shared/components/widgets/GaugeWidget";
import { InvoiceSummaryWidget } from "../../../shared/components/widgets/InvoiceSummaryWidget";
import { TopCustomersWidget } from "../../../shared/components/widgets/TopCustomersWidget";
import { UnitRusakWidget } from "../../../shared/components/widgets/UnitRusakWidget";
import { useDashboard } from "../dashboard.hook";

export const DashboardPage: React.FC = () => {
  const state = useSelector((reduxState: RootState) => reduxState.tms);
  const { setActiveTab } = useNavigationStore();
  const { loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <Loader2 size={36} className="text-blue-600 animate-spin" />
        <p className="mt-3 text-sm font-semibold text-slate-600">
          Memuat data dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-6 bg-surface min-h-screen">
      {/* Row 1: 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {state.kpiMetrics.map((metric) => (
          <KPICard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Row 2: Armada Status, Status Pengiriman, Top 5 Customer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <ArmadaStatusWidget summary={state.unitStatusSummary} />
        </div>
        <div className="lg:col-span-4">
          <DeliveryStatusDonutChart summary={state.deliveryStatusSummary} />
        </div>
        <div className="lg:col-span-3">
          <TopCustomersWidget customers={state.topCustomers} />
        </div>
      </div>

      {/* Row 3: Trend Line Chart, On Time Area Chart, Top 5 Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <TrendLineChart data={state.trendData} />
        </div>
        <div className="lg:col-span-4">
          <OnTimeAreaChart data={state.onTimePerformanceData} />
        </div>
        <div className="lg:col-span-3">
          <TopRoutesBarChart routes={state.topRoutes} />
        </div>
      </div>

      {/* Row 4: Maintenance Bar Chart, Unit Rusak, Uang Jalan, Invoice Summary, Payment Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <MaintenanceBarChart
            data={state.maintenanceReport}
            onViewDetail={() => setActiveTab("maintenance")}
          />
        </div>
        <div>
          <UnitRusakWidget
            units={state.damagedUnits}
            onViewAll={() => setActiveTab("unit-rusak")}
          />
        </div>
        <div>
          <GaugeWidget
            title="Uang Jalan"
            subtitle="Realisasi vs Rencana"
            percentage={state.travelExpenseSummary?.percentage || 78}
            realizationText={
              state.travelExpenseSummary?.realizationText || "Rp 1,56 M"
            }
            targetText={
              state.travelExpenseSummary?.targetText || "dari Rp 2,00 M"
            }
            color="#10B981"
            onViewDetail={() => setActiveTab("uang-jalan")}
          />
        </div>
        <div>
          <InvoiceSummaryWidget
            summary={state.invoiceSummary}
            onViewDetail={() => setActiveTab("invoice")}
          />
        </div>
        <div>
          <GaugeWidget
            title="Payment"
            subtitle="Penerimaan pembayaran"
            percentage={state.paymentGaugeSummary?.percentage || 85}
            realizationText={
              state.paymentGaugeSummary?.realizationText || "Rp 3,17 M"
            }
            targetText={
              state.paymentGaugeSummary?.targetText || "dari Rp 3,73 M"
            }
            color="#2563EB"
            onViewDetail={() => setActiveTab("payment")}
          />
        </div>
      </div>
    </div>
  );
};
