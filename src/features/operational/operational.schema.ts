export type DOStatus = 'DRAFT' | 'DISPATCHED' | 'IN_TRANSIT' | 'ARRIVED' | 'DELIVERED' | 'RETURNED';

export interface DeliveryOrder {
  id: string;
  doNumber: string;
  issueDate: string;
  customerName: string;
  shipper: string;
  consignee: string;
  originCity: string;
  destCity: string;
  cargoDesc: string;
  qty: number;
  unit: string;
  weightKg: number;
  volumeM3: number;
  driverName: string;
  vehiclePlate: string;
  status: DOStatus;
  specialNote: string;
}
