import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
  FleetUnit
} from '../shared/types/tms.types';

interface TMSState {
  dateRange: string;
  selectedUnitFilter: string;
  kpiMetrics: KPIMetric[];
  unitStatusSummary: UnitStatusSummary | null;
  deliveryStatusSummary: DeliveryStatusSummary | null;
  topCustomers: CustomerRanking[];
  trendData: TrendDataPoint[];
  onTimePerformanceData: OnTimePerformanceData[];
  topRoutes: RouteRanking[];
  maintenanceReport: MaintenanceReportPoint[];
  damagedUnits: DamagedUnit[];
  travelExpenseSummary: TravelExpenseSummary | null;
  invoiceSummary: InvoiceSummary | null;
  paymentGaugeSummary: PaymentGaugeSummary | null;
  orders: TransportOrder[];
  fleetUnits: FleetUnit[];
  notificationsCount: number;
  activeTab: string;
}

const initialState: TMSState = {
  dateRange: '01 Mei 2026 - 31 Mei 2026',
  selectedUnitFilter: 'Semua Unit',
  kpiMetrics: [],
  unitStatusSummary: null,
  deliveryStatusSummary: null,
  topCustomers: [],
  trendData: [],
  onTimePerformanceData: [],
  topRoutes: [],
  maintenanceReport: [],
  damagedUnits: [],
  travelExpenseSummary: null,
  invoiceSummary: null,
  paymentGaugeSummary: null,
  orders: [],
  fleetUnits: [],
  notificationsCount: 5,
  activeTab: 'dashboard'
};

export const tmsSlice = createSlice({
  name: 'tms',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<string>) => {
      state.dateRange = action.payload;
    },
    setSelectedUnitFilter: (state, action: PayloadAction<string>) => {
      state.selectedUnitFilter = action.payload;
    },
    setDashboardData: (state, action: PayloadAction<Partial<TMSState>>) => {
      return { ...state, ...action.payload };
    },
    addOrder: (state, action: PayloadAction<TransportOrder>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: TransportOrder['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    }
  }
});

export const {
  setDateRange,
  setSelectedUnitFilter,
  setDashboardData,
  addOrder,
  updateOrderStatus,
  setActiveTab
} = tmsSlice.actions;

export default tmsSlice.reducer;
