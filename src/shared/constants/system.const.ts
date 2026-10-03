import { SystemUser, AuditLog, SystemStatus, UserRole } from '../types/system.type';

export const SYSTEM_USERS: SystemUser[] = [
  { id: 'USR-001', name: 'Administrator System', email: 'admin@tmsbi.co.id', role: 'SUPER_ADMIN', phone: '0812-1234-0001', department: 'IT & System', lastLogin: '2026-09-03 09:45', status: 'ACTIVE', permissions: ['ALL'], createdDate: '2024-01-01' },
  { id: 'USR-002', name: 'Budi Hartono', email: 'budi.logistics@tmsbi.co.id', role: 'LOGISTICS_MANAGER', phone: '0812-1234-0002', department: 'Operations', lastLogin: '2026-09-03 08:30', status: 'ACTIVE', permissions: ['order', 'fleet', 'driver', 'planner', 'tracking'], createdDate: '2024-02-15' },
  { id: 'USR-003', name: 'Rina Dispatcher', email: 'rina.dispatch@tmsbi.co.id', role: 'DISPATCHER', phone: '0812-1234-0003', department: 'Operations', lastLogin: '2026-09-03 07:00', status: 'ACTIVE', permissions: ['order', 'planner', 'delivery-order', 'tracking'], createdDate: '2024-03-10' },
  { id: 'USR-004', name: 'Siti Rahayu', email: 'siti.finance@tmsbi.co.id', role: 'FINANCE_MANAGER', phone: '0812-1234-0004', department: 'Finance', lastLogin: '2026-09-03 09:00', status: 'ACTIVE', permissions: ['invoice', 'payment', 'penagihan', 'reports'], createdDate: '2024-01-20' },
  { id: 'USR-005', name: 'Agus Supervisor', email: 'agus.driver@tmsbi.co.id', role: 'DRIVER_SUPERVISOR', phone: '0812-1234-0005', department: 'Operations', lastLogin: '2026-09-02 18:00', status: 'ACTIVE', permissions: ['driver', 'tracking', 'pod', 'uang-jalan'], createdDate: '2024-04-05' },
  { id: 'USR-006', name: 'Joko Mekanik', email: 'joko.workshop@tmsbi.co.id', role: 'MECHANIC', phone: '0812-1234-0006', department: 'Workshop', lastLogin: '2026-09-03 06:30', status: 'ACTIVE', permissions: ['maintenance', 'unit-rusak', 'fleet-management'], createdDate: '2024-05-12' },
  { id: 'USR-007', name: 'Dewi Putri', email: 'dewi.ops@tmsbi.co.id', role: 'VIEWER', phone: '0812-1234-0007', department: 'Management', lastLogin: '2026-09-01 14:00', status: 'ACTIVE', permissions: ['dashboard', 'reports', 'analytics'], createdDate: '2024-06-01' },
  { id: 'USR-008', name: 'Hendra Lama', email: 'hendra.old@tmsbi.co.id', role: 'DISPATCHER', phone: '0812-1234-0008', department: 'Operations', lastLogin: '2026-07-15 09:00', status: 'INACTIVE', permissions: ['order', 'planner'], createdDate: '2023-09-10' },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'LOG-001', user: 'admin@tmsbi.co.id', action: 'LOGIN', target: 'System', time: '2026-09-03 09:45:12', ip: '192.168.1.100', status: 'SUCCESS' },
  { id: 'LOG-002', user: 'budi.logistics@tmsbi.co.id', action: 'CREATE_ORDER', target: 'DO-2026-09010', time: '2026-09-03 09:30:44', ip: '192.168.1.105', status: 'SUCCESS' },
  { id: 'LOG-003', user: 'siti.finance@tmsbi.co.id', action: 'APPROVE_PAYMENT', target: 'PAY-2026-09003', time: '2026-09-03 09:15:22', ip: '192.168.1.110', status: 'SUCCESS' },
  { id: 'LOG-004', user: 'rina.dispatch@tmsbi.co.id', action: 'UPDATE_TRIP', target: 'TRIP-2026-0902', time: '2026-09-03 08:55:08', ip: '192.168.1.102', status: 'SUCCESS' },
  { id: 'LOG-005', user: 'unknown@external.com', action: 'LOGIN', target: 'System', time: '2026-09-03 08:44:01', ip: '203.45.67.89', status: 'FAILED' },
  { id: 'LOG-006', user: 'admin@tmsbi.co.id', action: 'DELETE_USER', target: 'USR-009', time: '2026-09-03 08:30:15', ip: '192.168.1.100', status: 'SUCCESS' },
  { id: 'LOG-007', user: 'joko.workshop@tmsbi.co.id', action: 'CREATE_WORKORDER', target: 'WO-2026-09009', time: '2026-09-03 07:00:33', ip: '192.168.1.120', status: 'SUCCESS' },
  { id: 'LOG-008', user: 'agus.driver@tmsbi.co.id', action: 'VERIFY_POD', target: 'POD-2026-09002', time: '2026-09-03 06:55:41', ip: '192.168.1.115', status: 'SUCCESS' },
];

export const SYSTEM_STATUS: SystemStatus[] = [
  { name: 'API Server', status: 'ONLINE', uptime: '99.98%', latency: '12ms' },
  { name: 'Database PostgreSQL', status: 'ONLINE', uptime: '99.95%', latency: '5ms' },
  { name: 'GPS Tracking Service', status: 'ONLINE', uptime: '99.90%', latency: '45ms' },
  { name: 'AI Analytics Engine', status: 'ONLINE', uptime: '99.85%', latency: '120ms' },
  { name: 'Email Notification', status: 'ONLINE', uptime: '100%', latency: '230ms' },
  { name: 'WhatsApp Gateway', status: 'DEGRADED', uptime: '98.20%', latency: '850ms' },
];

export const ROLE_COLORS: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-rose-100 text-rose-700',
  LOGISTICS_MANAGER: 'bg-blue-100 text-blue-700',
  DISPATCHER: 'bg-indigo-100 text-indigo-700',
  FINANCE_MANAGER: 'bg-emerald-100 text-emerald-700',
  DRIVER_SUPERVISOR: 'bg-amber-100 text-amber-700',
  MECHANIC: 'bg-orange-100 text-orange-700',
  VIEWER: 'bg-slate-100 text-slate-600',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  LOGISTICS_MANAGER: 'Logistics Manager',
  DISPATCHER: 'Dispatcher',
  FINANCE_MANAGER: 'Finance Manager',
  DRIVER_SUPERVISOR: 'Driver Supervisor',
  MECHANIC: 'Mechanic',
  VIEWER: 'Viewer',
};
