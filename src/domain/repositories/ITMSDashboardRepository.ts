// Domain Repository Interface: ITMSDashboardRepository
import type {
  KPIMetric,
  UnitStatusSummary,
  DeliveryStatusSummary,
  CustomerRanking,
  TrendDataPoint,
  OnTimePerformanceData,
  RouteRanking,
  MaintenanceReportPoint,
  DamagedUnit,
  TravelExpenseSummary,
  InvoiceSummary,
  PaymentGaugeSummary,
  TransportOrder,
  FleetUnit,
  DriverProfile
} from '../../shared/types/tms.types';

export interface ITMSDashboardRepository {
  getKPIMetrics(): Promise<KPIMetric[]>;
  getUnitStatusSummary(): Promise<UnitStatusSummary>;
  getDeliveryStatusSummary(): Promise<DeliveryStatusSummary>;
  getTopCustomers(): Promise<CustomerRanking[]>;
  getTrendData(): Promise<TrendDataPoint[]>;
  getOnTimePerformanceData(): Promise<OnTimePerformanceData[]>;
  getTopRoutes(): Promise<RouteRanking[]>;
  getMaintenanceReport(): Promise<MaintenanceReportPoint[]>;
  getDamagedUnits(): Promise<DamagedUnit[]>;
  getTravelExpenseSummary(): Promise<TravelExpenseSummary>;
  getInvoiceSummary(): Promise<InvoiceSummary>;
  getPaymentGaugeSummary(): Promise<PaymentGaugeSummary>;
  getOrders(): Promise<TransportOrder[]>;
  getFleetUnits(): Promise<FleetUnit[]>;
  getDrivers(): Promise<DriverProfile[]>;
}
