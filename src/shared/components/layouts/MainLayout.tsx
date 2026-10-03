import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import HistoryPerjalananPage from "../../../features/customer/pages/history-perjalanan.page";
import StatusPerjalananPage from "../../../features/customer/pages/status-perjalanan.page";
import { AnalyticsPage } from "../../../features/dashboard/pages/analytics.page";
import { DashboardPage } from "../../../features/dashboard/pages/dashboard.page";
import { FinancePage } from "../../../features/finance/pages/finance.page";
import { PaymentPage } from "../../../features/finance/pages/payment.page";
import { PenagihanPage } from "../../../features/finance/pages/penagihan.page";
import { CustomerPage } from "../../../features/masterData/pages/customer.page";
import { DriverPage } from "../../../features/masterData/pages/driver.page";
import { MasterDataPage } from "../../../features/masterData/pages/master-data.page";
import { VehiclePage } from "../../../features/masterData/pages/vehicle.page";
import { DeliveryOrderPage } from "../../../features/operational/pages/delivery-order.page";
import { FleetManagementPage } from "../../../features/operational/pages/fleet-management.page";
import { MaintenancePage } from "../../../features/operational/pages/maintenance.page";
import { OrderManagementPage } from "../../../features/operational/pages/order-management.page";
import { PODPage } from "../../../features/operational/pages/pod.page";
import { TrackingPage } from "../../../features/operational/pages/tracking.page";
import { UangJalanPage } from "../../../features/operational/pages/uang-jalan.page";
import { UnitRusakPage } from "../../../features/operational/pages/unit-rusak.page";
import { ReportsPage } from "../../../features/system/pages/reports.page";
import { SystemPage } from "../../../features/system/pages/system.page";
import { useNavigationStore } from "../../lib/store/useNavigationStore";
import { Footer } from "../common/Footer";
import { Sidebar } from "../common/Sidebar";
import { Topbar } from "../common/Topbar";

export const MainLayout: React.FC = () => {
  const { activeTab } = useNavigationStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return {
          title: "Dashboard",
          subtitle: "Pantauan real-time operasional transportasi & logistik",
        };
      case "order-management":
        return {
          title: "Order Management",
          subtitle:
            "Kelola daftar pengiriman, penugasan armada, dan status order",
        };
      case "planner":
        return {
          title: "Planner & Penugasan",
          subtitle: "Rencanakan jadwal trip dan penugasan driver & armada",
        };
      case "time-line-customer":
        return {
          title: "Status Perjalanan",
          subtitle: "Status perjalanan customer dan history order",
        };
      case "delivery-order":
        return {
          title: "Delivery Order (DO)",
          subtitle: "Manajemen dokumen pengiriman, shipper & consignee",
        };
      case "uang-jalan":
        return {
          title: "Uang Jalan Driver",
          subtitle:
            "Pencairan, klaim biaya perjalanan, dan penyelesaian uang jalan",
        };
      case "pod":
        return {
          title: "Proof of Delivery (POD)",
          subtitle: "Bukti serah terima, tanda tangan, dan dokumentasi foto",
        };
      case "tracking":
        return {
          title: "Tracking & Monitoring",
          subtitle: "Pemantauan live posisi GPS kendaraan dan sensor armada",
        };
      case "fleet-management":
        return {
          title: "Fleet Management",
          subtitle: "Inventarisasi kendaraan, status operasional armada",
        };
      case "maintenance":
        return {
          title: "Maintenance & Work Order",
          subtitle:
            "Jadwal servis, perbaikan kendaraan, dan work order mekanik",
        };
      case "unit-rusak":
        return {
          title: "Unit Rusak & Darurat",
          subtitle:
            "Laporan kerusakan, tingkat keparahan, dan progress perbaikan",
        };
      case "invoice":
        return {
          title: "Invoice Management",
          subtitle: "Ringkasan invoice customer dan status penagihan",
        };
      case "payment":
        return {
          title: "Penerimaan Pembayaran",
          subtitle: "Rekam dan verifikasi pembayaran customer",
        };
      case "penagihan":
        return {
          title: "Penagihan & Collection",
          subtitle: "Monitor outstanding, follow up, dan janji bayar customer",
        };
      case "master-data":
        return {
          title: "Master Data All",
          subtitle: "Database customer, PIC, dan histori transaksi",
        };
      case "customer":
        return {
          title: "Data Customer",
          subtitle: "Database customer, PIC, dan histori transaksi",
        };
      case "driver":
        return {
          title: "Data Driver",
          subtitle: "Profil pengemudi, SIM, dan performa driver",
        };
      case "vehicle":
        return {
          title: "Data Kendaraan",
          subtitle:
            "Inventarisasi armada, spesifikasi teknis, dan dokumen kendaraan",
        };
      case "tarif":
        return {
          title: "Matriks Tarif",
          subtitle: "Penetapan tarif pengiriman per rute dan customer",
        };
      case "reports":
        return {
          title: "Laporan Operational & Finance",
          subtitle: "Pusat ekspor laporan dan dokumen analisis",
        };
      case "analytics":
        return {
          title: "Analytics & AI Predictive",
          subtitle:
            "Rekomendasi kecerdasan buatan untuk efisiensi rute & armada",
        };
      case "settings":
      case "user-management":
        return {
          title: "System & Security Settings",
          subtitle: "Manajemen pengguna, hak akses RBAC, dan audit trail",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Pantauan real-time operasional transportasi & logistik",
        };
    }
  };

  const pageInfo = getPageTitle();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage />;
      case "order-management":
        return <OrderManagementPage />;
      case "customer":
        return <CustomerPage />;
      case "delivery-order":
        return <DeliveryOrderPage />;
      case "uang-jalan":
        return <UangJalanPage />;
      case "time-line-customer":
        return <StatusPerjalananPage />;
      case "history-perjalanan":
        return <HistoryPerjalananPage />;
      case "pod":
        return <PODPage />;
      case "tracking":
        return <TrackingPage />;
      case "fleet-management":
        return <FleetManagementPage />;
      case "maintenance":
        return <MaintenancePage />;
      case "unit-rusak":
        return <UnitRusakPage />;
      case "invoice":
        return <FinancePage />;
      case "payment":
        return <PaymentPage />;
      case "penagihan":
        return <PenagihanPage />;
      case "master-data":
        return <MasterDataPage />;
      case "driver":
        return <DriverPage />;
      case "vehicle":
        return <VehiclePage />;
      case "reports":
        return <ReportsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "settings":
      case "user-management":
        return <SystemPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F4F6F9] flex text-slate-800 antialiased font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:pl-64 flex flex-col h-screen overflow-hidden">
        <Topbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="min-h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        <div className="shrink-0 z-30 relative">
          <Footer />
        </div>
      </div>
    </div>
  );
};
