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
} from '../../shared/types/tms.types';

export const getKPIMetrics = async (): Promise<KPIMetric[]> => {
  return [
    { id: '1', title: 'TOTAL ORDER', value: 512, subtext: 'dari periode lalu', trend: 12.5, trendDirection: 'up', color: 'blue', icon: 'Package' },
    { id: '2', title: 'DELIVERY ORDER', value: 487, subtext: 'dari periode lalu', trend: 10.8, trendDirection: 'up', color: 'green', icon: 'Truck' },
    { id: '3', title: 'ORDER SELESAI', value: 432, subtext: 'dari periode lalu', trend: 11.3, trendDirection: 'up', color: 'purple', icon: 'CheckCircle' },
    { id: '4', title: 'ON TIME DELIVERY', value: '92.4%', subtext: 'dari periode lalu', trend: 6.2, trendDirection: 'up', color: 'orange', icon: 'Clock' },
    { id: '5', title: 'TOTAL REVENUE', value: 'Rp 4,82 M', subtext: 'dari periode lalu', trend: 15.7, trendDirection: 'up', color: 'red', icon: 'DollarSign' },
    { id: '6', title: 'TOTAL UNIT AKTIF', value: 65, subtext: 'dari 89 unit', trend: 0, trendDirection: 'up', color: 'teal', icon: 'Truck' }
  ];
};

export const getUnitStatusSummary = async (): Promise<UnitStatusSummary> => {
  return {
    ready: { count: 22, percentage: 24.7 },
    operational: { count: 33, percentage: 37.1 },
    maintenance: { count: 12, percentage: 13.5 },
    broken: { count: 8, percentage: 9.0 },
    inactive: { count: 14, percentage: 15.7 },
    totalUnits: 89
  };
};

export const getDeliveryStatusSummary = async (): Promise<DeliveryStatusSummary> => {
  return {
    delivered: { count: 328, percentage: 67.3 },
    inProgress: { count: 98, percentage: 20.1 },
    pending: { count: 45, percentage: 9.2 },
    cancelled: { count: 16, percentage: 3.3 },
    totalDO: 487
  };
};

export const getTopCustomers = async (): Promise<CustomerRanking[]> => {
  return [
    { id: '1', rank: 1, name: 'PT. ABC Indonesia', revenueText: 'Rp 1,25 M', revenueValue: 1250000000, ordersCount: 142 },
    { id: '2', rank: 2, name: 'PT. XYZ Nusantara', revenueText: 'Rp 980 Jt', revenueValue: 980000000, ordersCount: 98 },
    { id: '3', rank: 3, name: 'PT. Maju Bersama', revenueText: 'Rp 760 Jt', revenueValue: 760000000, ordersCount: 84 },
    { id: '4', rank: 4, name: 'PT. Sukses Makmur', revenueText: 'Rp 540 Jt', revenueValue: 540000000, ordersCount: 65 },
    { id: '5', rank: 5, name: 'PT. Sejahtera Abadi', revenueText: 'Rp 380 Jt', revenueValue: 380000000, ordersCount: 48 }
  ];
};

export const getTrendData = async (): Promise<TrendDataPoint[]> => {
  return [
    { day: '01', order: 120, deliveryOrder: 75 },
    { day: '04', order: 100, deliveryOrder: 60 },
    { day: '07', order: 190, deliveryOrder: 130 },
    { day: '10', order: 180, deliveryOrder: 110 },
    { day: '13', order: 240, deliveryOrder: 160 },
    { day: '16', order: 200, deliveryOrder: 125 },
    { day: '19', order: 220, deliveryOrder: 150 },
    { day: '22', order: 215, deliveryOrder: 135 },
    { day: '25', order: 260, deliveryOrder: 190 },
    { day: '28', order: 245, deliveryOrder: 175 },
    { day: '31', order: 270, deliveryOrder: 205 }
  ];
};

export const getOnTimePerformanceData = async (): Promise<OnTimePerformanceData[]> => {
  return [
    { period: 'Minggu 1', achievement: 85, target: 90 },
    { period: 'Minggu 2', achievement: 88, target: 90 },
    { period: 'Minggu 3', achievement: 92, target: 90 },
    { period: 'Minggu 4', achievement: 93, target: 90 },
    { period: 'Minggu 5', achievement: 90, target: 90 }
  ];
};

export const getTopRoutes = async (): Promise<RouteRanking[]> => {
  return [
    { id: 'r1', route: 'Jakarta - Surabaya', count: 78, revenueText: 'Rp 780 Jt' },
    { id: 'r2', route: 'Jakarta - Bandung', count: 65, revenueText: 'Rp 325 Jt' },
    { id: 'r3', route: 'Jakarta - Semarang', count: 52, revenueText: 'Rp 416 Jt' },
    { id: 'r4', route: 'Surabaya - Balikpapan', count: 41, revenueText: 'Rp 615 Jt' },
    { id: 'r5', route: 'Medan - Pekanbaru', count: 38, revenueText: 'Rp 342 Jt' }
  ];
};

export const getMaintenanceReport = async (): Promise<MaintenanceReportPoint[]> => {
  return [
    { period: 'Minggu 1', count: 12 },
    { period: 'Minggu 2', count: 18 },
    { period: 'Minggu 3', count: 8 },
    { period: 'Minggu 4', count: 14 },
    { period: 'Minggu 5', count: 20 }
  ];
};

export const getDamagedUnits = async (): Promise<DamagedUnit[]> => {
  return [
    { id: '1', plateNumber: 'B 9123 KXA', vehicleType: 'Truck', problem: 'Mesin Overheat', date: '31 Mei 2026', severity: 'HIGH', status: 'PENDING', technician: 'Budi Santoso' },
    { id: '2', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer', problem: 'Ban Pecah', date: '30 Mei 2026', severity: 'MEDIUM', status: 'REPAIRING', technician: 'Agus Wijaya' },
    { id: '3', plateNumber: 'B 4567 KXC', vehicleType: 'Truck', problem: 'Rem Blong', date: '29 Mei 2026', severity: 'HIGH', status: 'REPAIRING', technician: 'Joko Susilo' },
    { id: '4', plateNumber: 'B 1289 KXD', vehicleType: 'CDD', problem: 'Elektrikal', date: '29 Mei 2026', severity: 'LOW', status: 'PENDING', technician: 'Eko Prasetyo' },
    { id: '5', plateNumber: 'B 1122 KXE', vehicleType: 'Truck', problem: 'Radiator Bocor', date: '28 Mei 2026', severity: 'MEDIUM', status: 'DONE', technician: 'Rudi Hermawan' }
  ];
};

export const getTravelExpenseSummary = async (): Promise<TravelExpenseSummary> => {
  return { realizationText: 'Rp 1,56 M', targetText: 'dari Rp 2,00 M', percentage: 78 };
};

export const getInvoiceSummary = async (): Promise<InvoiceSummary> => {
  return { totalRevenue: 'Rp 4,82 M', unpaid: 'Rp 1,65 M', paid: 'Rp 3,17 M', overdue: 'Rp 420 Jt' };
};

export const getPaymentGaugeSummary = async (): Promise<PaymentGaugeSummary> => {
  return { realizationText: 'Rp 3,17 M', targetText: 'dari Rp 3,73 M', percentage: 85 };
};
