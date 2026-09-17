import type { TransportOrder, FleetUnit, DriverProfile } from '../../shared/types/tms.types';

export const getOrders = async (): Promise<TransportOrder[]> => {
  return [
    { id: 'ORD-001', orderNumber: 'DO-2026-0501', customerName: 'PT. ABC Indonesia', origin: 'Jakarta', destination: 'Surabaya', status: 'DELIVERED', driverName: 'Slamet Rahardjo', vehiclePlate: 'B 9123 KXA', date: '2026-05-31', revenue: 15000000 },
    { id: 'ORD-002', orderNumber: 'DO-2026-0502', customerName: 'PT. XYZ Nusantara', origin: 'Bandung', destination: 'Semarang', status: 'IN_PROGRESS', driverName: 'Budi Kurniawan', vehiclePlate: 'B 9876 KXB', date: '2026-05-31', revenue: 8500000 },
    { id: 'ORD-003', orderNumber: 'DO-2026-0503', customerName: 'PT. Maju Bersama', origin: 'Jakarta', destination: 'Medan', status: 'PENDING', driverName: 'Andi Saputra', vehiclePlate: 'B 4567 KXC', date: '2026-05-30', revenue: 22000000 },
    { id: 'ORD-004', orderNumber: 'DO-2026-0504', customerName: 'PT. Sukses Makmur', origin: 'Surabaya', destination: 'Balikpapan', status: 'DELIVERED', driverName: 'Hendra Gunawan', vehiclePlate: 'B 1289 KXD', date: '2026-05-29', revenue: 18000000 },
    { id: 'ORD-005', orderNumber: 'DO-2026-0505', customerName: 'PT. Sejahtera Abadi', origin: 'Semarang', destination: 'Makassar', status: 'CANCELLED', driverName: 'Dedi Setiawan', vehiclePlate: 'B 1122 KXE', date: '2026-05-28', revenue: 12000000 }
  ];
};

export const getFleetUnits = async (): Promise<FleetUnit[]> => {
  return [
    { id: 'U-01', plateNumber: 'B 9123 KXA', vehicleType: 'Truck Fuso Wingbox', brandModel: 'Mitsubishi Fuso FN', year: 2022, capacityTon: 18, status: 'OPERATIONAL', fuelLevelPercent: 82, speedKmh: 64, currentLocation: { lat: -6.2088, lng: 106.8456, address: 'Tol Jakarta-Cikampek KM 34' }, lastServiceDate: '2026-04-15' },
    { id: 'U-02', plateNumber: 'B 9876 KXB', vehicleType: 'Trailer 40ft', brandModel: 'Hino 500 FL', year: 2021, capacityTon: 30, status: 'READY', fuelLevelPercent: 95, speedKmh: 0, currentLocation: { lat: -6.1214, lng: 106.7741, address: 'Pool Tanjung Priok, Jakarta' }, lastServiceDate: '2026-05-01' },
    { id: 'U-03', plateNumber: 'B 4567 KXC', vehicleType: 'CDD Long Box', brandModel: 'Isuzu Elf Giga', year: 2023, capacityTon: 8, status: 'MAINTENANCE', fuelLevelPercent: 45, speedKmh: 0, currentLocation: { lat: -6.3012, lng: 107.1523, address: 'Bengkel Resmi Cikarang' }, lastServiceDate: '2026-05-29' },
    { id: 'U-04', plateNumber: 'B 1289 KXD', vehicleType: 'Tronton Box', brandModel: 'Volvo FH16', year: 2023, capacityTon: 24, status: 'BROKEN', fuelLevelPercent: 30, speedKmh: 0, currentLocation: { lat: -6.9175, lng: 107.6191, address: 'Rest Area Tol Purbaleunyi KM 88' }, lastServiceDate: '2026-03-20' },
    { id: 'U-05', plateNumber: 'B 1122 KXE', vehicleType: 'CDE Box', brandModel: 'Mitsubishi Canter', year: 2020, capacityTon: 4, status: 'INACTIVE', fuelLevelPercent: 60, speedKmh: 0, currentLocation: { lat: -7.2575, lng: 112.7521, address: 'Pool Surabaya Barat' }, lastServiceDate: '2026-02-10' }
  ];
};

export const getDrivers = async (): Promise<DriverProfile[]> => {
  return [
    { id: 'DRV-101', name: 'Slamet Rahardjo', phone: '0812-9876-5432', licenseNumber: '920812345678', licenseType: 'SIM B2 Umum', status: 'ON_DUTY', performanceRating: 4.9, totalTrips: 184, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { id: 'DRV-102', name: 'Budi Kurniawan', phone: '0813-1122-3344', licenseNumber: '920887654321', licenseType: 'SIM B2 Umum', status: 'ON_DUTY', performanceRating: 4.7, totalTrips: 152, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { id: 'DRV-103', name: 'Andi Saputra', phone: '0815-5566-7788', licenseNumber: '920855443322', licenseType: 'SIM B1 Umum', status: 'AVAILABLE', performanceRating: 4.8, totalTrips: 210, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
  ];
};
