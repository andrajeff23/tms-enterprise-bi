import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDashboardData } from "../../shared/lib/store/tmsSlice";
import * as dashboardApi from "./dashboard.api";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const kpiMetrics = await dashboardApi.getKPIMetrics();
      const unitStatusSummary = await dashboardApi.getUnitStatusSummary();
      const deliveryStatusSummary = await dashboardApi.getDeliveryStatusSummary();
      const topCustomers = await dashboardApi.getTopCustomers();
      const trendData = await dashboardApi.getTrendData();
      const onTimePerformanceData = await dashboardApi.getOnTimePerformanceData();
      const topRoutes = await dashboardApi.getTopRoutes();
      const maintenanceReport = await dashboardApi.getMaintenanceReport();
      const damagedUnits = await dashboardApi.getDamagedUnits();
      const travelExpenseSummary = await dashboardApi.getTravelExpenseSummary();
      const invoiceSummary = await dashboardApi.getInvoiceSummary();
      const paymentGaugeSummary = await dashboardApi.getPaymentGaugeSummary();

      dispatch(
        setDashboardData({
          kpiMetrics,
          unitStatusSummary,
          deliveryStatusSummary,
          topCustomers,
          trendData,
          onTimePerformanceData,
          topRoutes,
          maintenanceReport,
          damagedUnits,
          travelExpenseSummary,
          invoiceSummary,
          paymentGaugeSummary,
        })
      );
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return { loading };
};
