export type UserRole = 'SUPER_ADMIN' | 'LOGISTICS_MANAGER' | 'DISPATCHER' | 'FINANCE_MANAGER' | 'DRIVER_SUPERVISOR' | 'MECHANIC' | 'VIEWER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  department: string;
  lastLogin: string;
  status: UserStatus;
  permissions: string[];
  createdDate: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  ip: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface SystemStatus {
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  uptime: string;
  latency: string;
}
