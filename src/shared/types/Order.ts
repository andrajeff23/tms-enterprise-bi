// Domain Entity: Order
import type { OrderStatus } from './tms.types';

export class Order {
  public readonly id: string;
  public readonly orderNumber: string;
  public readonly customerName: string;
  public readonly origin: string;
  public readonly destination: string;
  public status: OrderStatus;
  public driverName: string;
  public vehiclePlate: string;
  public readonly date: string;
  public revenue: number;

  constructor(
    id: string,
    orderNumber: string,
    customerName: string,
    origin: string,
    destination: string,
    status: OrderStatus,
    driverName: string,
    vehiclePlate: string,
    date: string,
    revenue: number
  ) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.customerName = customerName;
    this.origin = origin;
    this.destination = destination;
    this.status = status;
    this.driverName = driverName;
    this.vehiclePlate = vehiclePlate;
    this.date = date;
    this.revenue = revenue;
  }

  public markAsDelivered(): void {
    this.status = 'DELIVERED';
  }

  public cancel(): void {
    this.status = 'CANCELLED';
  }

  public assignDriverAndVehicle(driver: string, vehicle: string): void {
    this.driverName = driver;
    this.vehiclePlate = vehicle;
    this.status = 'IN_PROGRESS';
  }
}
