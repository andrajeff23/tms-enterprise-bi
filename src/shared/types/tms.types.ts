// Shared TMS Types & Interfaces

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED';

export type UnitStatus = 'READY' | 'OPERATIONAL' | 'MAINTENANCE' | 'BROKEN' | 'INACTIVE';

export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  subtext: string;
  trend: number;
  trendDirection: 'up' | 'down';
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
  icon: string;
}

export interface UnitStatusSummary {
  ready: { count: number; percentage: number };
  operational: { count: number; percentage: number };
  maintenance: { count: number; percentage: number };
  broken: { count: number; percentage: number };
  inactive: { count: number; percentage: number };
  totalUnits: number;
}

export interface DeliveryStatusSummary {
  delivered: { count: number; percentage: number };
  inProgress: { count: number; percentage: number };
  pending: { count: number; percentage: number };
  cancelled: { count: number; percentage: number };
  totalDO: number;
}

export interface CustomerRanking {
  id: string;
  rank: number;
  name: string;
  revenueText: string;
  revenueValue: number;
  ordersCount: number;
}

export interface TrendDataPoint {
  day: string;
  order: number;
  deliveryOrder: number;
}

export interface OnTimePerformanceData {
  period: string;
  achievement: number;
  target: number;
}

export interface RouteRanking {
  id: string;
  route: string;
  count: number;
  revenueText: string;
}

export interface MaintenanceReportPoint {
  period: string;
  count: number;
}

export interface DamagedUnit {
  id: string;
  plateNumber: string;
  vehicleType: string;
  problem: string;
  date: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'REPAIRING' | 'DONE';
  technician?: string;
}

export interface TravelExpenseSummary {
  realizationText: string;
  targetText: string;
  percentage: number;
}

export interface InvoiceSummary {
  totalRevenue: string;
  unpaid: string;
  paid: string;
  overdue: string;
}

export interface PaymentGaugeSummary {
  realizationText: string;
  targetText: string;
  percentage: number;
}

export interface TransportOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: OrderStatus;
  driverName: string;
  vehiclePlate: string;
  date: string;
  revenue: number;
}

export interface FleetUnit {
  id: string;
  plateNumber: string;
  vehicleType: string;
  brandModel: string;
  year: number;
  capacityTon: number;
  status: UnitStatus;
  fuelLevelPercent: number;
  speedKmh: number;
  currentLocation: { lat: number; lng: number; address: string };
  lastServiceDate: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseType: string;
  status: 'AVAILABLE' | 'ON_DUTY' | 'OFF';
  performanceRating: number;
  totalTrips: number;
  avatarUrl: string;
}
