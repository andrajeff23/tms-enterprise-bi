// Infrastructure Repository Implementation
import type { ITMSDashboardRepository } from '../../domain/repositories/ITMSDashboardRepository';
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

export class TMSDashboardMockRepository implements ITMSDashboardRepository {
  async getKPIMetrics(): Promise<KPIMetric[]> {
    return [
      {
        id: '1',
        title: 'TOTAL ORDER',
        value: 512,
        subtext: 'dari periode lalu',
        trend: 12.5,
        trendDirection: 'up',
        color: 'blue',
        icon: 'Package'
      },
      {
        id: '2',
        title: 'DELIVERY ORDER',
        value: 487,
        subtext: 'dari periode lalu',
        trend: 10.8,
        trendDirection: 'up',
        color: 'green',
        icon: 'Truck'
      },
      {
        id: '3',
        title: 'ORDER SELESAI',
        value: 432,
        subtext: 'dari periode lalu',
        trend: 11.3,
        trendDirection: 'up',
        color: 'purple',
        icon: 'CheckCircle'
      },
      {
        id: '4',
        title: 'ON TIME DELIVERY',
        value: '92.4%',
        subtext: 'dari periode lalu',
        trend: 6.2,
        trendDirection: 'up',
        color: 'orange',
        icon: 'Clock'
      },
      {
        id: '5',
        title: 'TOTAL REVENUE',
        value: 'Rp 4,82 M',
        subtext: 'dari periode lalu',
        trend: 15.7,
        trendDirection: 'up',
        color: 'red',
        icon: 'DollarSign'
      },
      {
        id: '6',
        title: 'TOTAL UNIT AKTIF',
        value: 65,
        subtext: 'dari 89 unit',
        trend: 0,
        trendDirection: 'up',
        color: 'teal',
        icon: 'Truck'
      }
    ];
  }

  async getUnitStatusSummary(): Promise<UnitStatusSummary> {
    return {
      ready: { count: 22, percentage: 24.7 },
      operational: { count: 33, percentage: 37.1 },
      maintenance: { count: 12, percentage: 13.5 },
      broken: { count: 8, percentage: 9.0 },
      inactive: { count: 14, percentage: 15.7 },
      totalUnits: 89
    };
  }

  async getDeliveryStatusSummary(): Promise<DeliveryStatusSummary> {
    return {
      delivered: { count: 328, percentage: 67.3 },
      inProgress: { count: 98, percentage: 20.1 },
      pending: { count: 45, percentage: 9.2 },
      cancelled: { count: 16, percentage: 3.3 },
      totalDO: 487
    };
  }

  async getTopCustomers(): Promise<CustomerRanking[]> {
    return [
      { id: '1', rank: 1, name: 'PT. ABC Indonesia', revenueText: 'Rp 1,25 M', revenueValue: 1250000000, ordersCount: 142 },
      { id: '2', rank: 2, name: 'PT. XYZ Nusantara', revenueText: 'Rp 980 Jt', revenueValue: 980000000, ordersCount: 98 },
      { id: '3', rank: 3, name: 'PT. Maju Bersama', revenueText: 'Rp 760 Jt', revenueValue: 760000000, ordersCount: 84 },
      { id: '4', rank: 4, name: 'PT. Sukses Makmur', revenueText: 'Rp 540 Jt', revenueValue: 540000000, ordersCount: 65 },
      { id: '5', rank: 5, name: 'PT. Sejahtera Abadi', revenueText: 'Rp 380 Jt', revenueValue: 380000000, ordersCount: 48 }
    ];
  }

  async getTrendData(): Promise<TrendDataPoint[]> {
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
  }

  async getOnTimePerformanceData(): Promise<OnTimePerformanceData[]> {
    return [
      { period: 'Minggu 1', achievement: 85, target: 90 },
      { period: 'Minggu 2', achievement: 88, target: 90 },
      { period: 'Minggu 3', achievement: 92, target: 90 },
      { period: 'Minggu 4', achievement: 93, target: 90 },
      { period: 'Minggu 5', achievement: 90, target: 90 }
    ];
  }

  async getTopRoutes(): Promise<RouteRanking[]> {
    return [
      { id: 'r1', route: 'Jakarta - Surabaya', count: 78, revenueText: 'Rp 780 Jt' },
      { id: 'r2', route: 'Jakarta - Bandung', count: 65, revenueText: 'Rp 325 Jt' },
      { id: 'r3', route: 'Jakarta - Semarang', count: 52, revenueText: 'Rp 416 Jt' },
      { id: 'r4', route: 'Surabaya - Balikpapan', count: 41, revenueText: 'Rp 615 Jt' },
      { id: 'r5', route: 'Medan - Pekanbaru', count: 38, revenueText: 'Rp 342 Jt' }
    ];
  }

  async getMaintenanceReport(): Promise<MaintenanceReportPoint[]> {
    return [
      { period: 'Minggu 1', count: 12 },
      { period: 'Minggu 2', count: 18 },
      { period: 'Minggu 3', count: 8 },
      { period: 'Minggu 4', count: 14 },
      { period: 'Minggu 5', count: 20 }
    ];
  }

  async getDamagedUnits(): Promise<DamagedUnit[]> {
    return [
      { id: '1', plateNumber: 'B 9123 KXA', vehicleType: 'Truck', problem: 'Mesin Overheat', date: '31 Mei 2026', severity: 'HIGH', status: 'PENDING', technician: 'Budi Santoso' },
      { id: '2', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer', problem: 'Ban Pecah', date: '30 Mei 2026', severity: 'MEDIUM', status: 'REPAIRING', technician: 'Agus Wijaya' },
      { id: '3', plateNumber: 'B 4567 KXC', vehicleType: 'Truck', problem: 'Rem Blong', date: '29 Mei 2026', severity: 'HIGH', status: 'REPAIRING', technician: 'Joko Susilo' },
      { id: '4', plateNumber: 'B 1289 KXD', vehicleType: 'CDD', problem: 'Elektrikal', date: '29 Mei 2026', severity: 'LOW', status: 'PENDING', technician: 'Eko Prasetyo' },
      { id: '5', plateNumber: 'B 1122 KXE', vehicleType: 'Truck', problem: 'Radiator Bocor', date: '28 Mei 2026', severity: 'MEDIUM', status: 'DONE', technician: 'Rudi Hermawan' }
    ];
  }

  async getTravelExpenseSummary(): Promise<TravelExpenseSummary> {
    return {
      realizationText: 'Rp 1,56 M',
      targetText: 'dari Rp 2,00 M',
      percentage: 78
    };
  }

  async getInvoiceSummary(): Promise<InvoiceSummary> {
    return {
      totalRevenue: 'Rp 4,82 M',
      unpaid: 'Rp 1,65 M',
      paid: 'Rp 3,17 M',
      overdue: 'Rp 420 Jt'
    };
  }

  async getPaymentGaugeSummary(): Promise<PaymentGaugeSummary> {
    return {
      realizationText: 'Rp 3,17 M',
      targetText: 'dari Rp 3,73 M',
      percentage: 85
    };
  }

  async getOrders(): Promise<TransportOrder[]> {
    return [
      { id: 'ORD-001', orderNumber: 'DO-2026-0501', customerName: 'PT. ABC Indonesia', origin: 'Jakarta', destination: 'Surabaya', status: 'DELIVERED', driverName: 'Slamet Rahardjo', vehiclePlate: 'B 9123 KXA', date: '2026-05-31', revenue: 15000000 },
      { id: 'ORD-002', orderNumber: 'DO-2026-0502', customerName: 'PT. XYZ Nusantara', origin: 'Bandung', destination: 'Semarang', status: 'IN_PROGRESS', driverName: 'Budi Kurniawan', vehiclePlate: 'B 9876 KXB', date: '2026-05-31', revenue: 8500000 },
      { id: 'ORD-003', orderNumber: 'DO-2026-0503', customerName: 'PT. Maju Bersama', origin: 'Jakarta', destination: 'Medan', status: 'PENDING', driverName: 'Andi Saputra', vehiclePlate: 'B 4567 KXC', date: '2026-05-30', revenue: 22000000 },
      { id: 'ORD-004', orderNumber: 'DO-2026-0504', customerName: 'PT. Sukses Makmur', origin: 'Surabaya', destination: 'Balikpapan', status: 'DELIVERED', driverName: 'Hendra Gunawan', vehiclePlate: 'B 1289 KXD', date: '2026-05-29', revenue: 18000000 },
      { id: 'ORD-005', orderNumber: 'DO-2026-0505', customerName: 'PT. Sejahtera Abadi', origin: 'Semarang', destination: 'Makassar', status: 'CANCELLED', driverName: 'Dedi Setiawan', vehiclePlate: 'B 1122 KXE', date: '2026-05-28', revenue: 12000000 }
    ];
  }

  async getFleetUnits(): Promise<FleetUnit[]> {
    return [
      { id: 'U-01', plateNumber: 'B 9123 KXA', vehicleType: 'Truck Fuso Wingbox', brandModel: 'Mitsubishi Fuso FN', year: 2022, capacityTon: 18, status: 'OPERATIONAL', fuelLevelPercent: 82, speedKmh: 64, currentLocation: { lat: -6.2088, lng: 106.8456, address: 'Tol Jakarta-Cikampek KM 34' }, lastServiceDate: '2026-04-15' },
      { id: 'U-02', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer 40ft', brandModel: 'Hino 500 FL', year: 2021, capacityTon: 30, status: 'READY', fuelLevelPercent: 95, speedKmh: 0, currentLocation: { lat: -6.1214, lng: 106.7741, address: 'Pool Tanjung Priok, Jakarta' }, lastServiceDate: '2026-05-01' },
      { id: 'U-03', plateNumber: 'B 4567 KXC', vehicleType: 'CDD Long Box', brandModel: 'Isuzu Elf Giga', year: 2023, capacityTon: 8, status: 'MAINTENANCE', fuelLevelPercent: 45, speedKmh: 0, currentLocation: { lat: -6.3012, lng: 107.1523, address: 'Bengkel Resmi Cikarang' }, lastServiceDate: '2026-05-29' },
      { id: 'U-04', plateNumber: 'B 1289 KXD', vehicleType: 'Tronton Box', brandModel: 'Volvo FH16', year: 2023, capacityTon: 24, status: 'BROKEN', fuelLevelPercent: 30, speedKmh: 0, currentLocation: { lat: -6.9175, lng: 107.6191, address: 'Rest Area Tol Purbaleunyi KM 88' }, lastServiceDate: '2026-03-20' },
      { id: 'U-05', plateNumber: 'B 1122 KXE', vehicleType: 'CDE Box', brandModel: 'Mitsubishi Canter', year: 2020, capacityTon: 4, status: 'INACTIVE', fuelLevelPercent: 60, speedKmh: 0, currentLocation: { lat: -7.2575, lng: 112.7521, address: 'Pool Surabaya Barat' }, lastServiceDate: '2026-02-10' }
    ];
  }

  async getDrivers(): Promise<DriverProfile[]> {
    return [
      { id: 'DRV-101', name: 'Slamet Rahardjo', phone: '0812-9876-5432', licenseNumber: '920812345678', licenseType: 'SIM B2 Umum', status: 'ON_DUTY', performanceRating: 4.9, totalTrips: 184, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { id: 'DRV-102', name: 'Budi Kurniawan', phone: '0813-1122-3344', licenseNumber: '920887654321', licenseType: 'SIM B2 Umum', status: 'ON_DUTY', performanceRating: 4.7, totalTrips: 152, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { id: 'DRV-103', name: 'Andi Saputra', phone: '0815-5566-7788', licenseNumber: '920855443322', licenseType: 'SIM B1 Umum', status: 'AVAILABLE', performanceRating: 4.8, totalTrips: 210, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
    ];
  }
}
