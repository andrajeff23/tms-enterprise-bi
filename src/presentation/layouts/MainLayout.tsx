import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Footer } from "../components/common/Footer";
import { Sidebar } from "../components/common/Sidebar";
import { Topbar } from "../components/common/Topbar";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { DashboardPage } from "../pages/DashboardPage";
import { DeliveryOrderPage } from "../pages/DeliveryOrderPage";
import { FinancePage } from "../pages/FinancePage";
import { FleetManagementPage } from "../pages/FleetManagementPage";
import { MaintenancePage } from "../pages/MaintenancePage";
import { MasterDataPage } from "../pages/MasterDataPage";
import { OrderManagementPage } from "../pages/OrderManagementPage";
import { PenagihanPage } from "../pages/PenagihanPage";
import { PaymentPage } from "../pages/PaymentPage";
import { PlannerPage } from "../pages/PlannerPage";
import { PODPage } from "../pages/PODPage";
import { ReportsPage } from "../pages/ReportsPage";
import { SystemPage } from "../pages/SystemPage";
import { TrackingPage } from "../pages/TrackingPage";
import { UangJalanPage } from "../pages/UangJalanPage";
import { UnitRusakPage } from "../pages/UnitRusakPage";
import { VehiclePage } from "../pages/VehiclePage";

export const MainLayout: React.FC = () => {
  const activeTab = useSelector((state: RootState) => state.tms.activeTab);
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
          subtitle: "Kelola daftar pengiriman, penugasan armada, dan status order",
        };
      case "planner":
        return {
          title: "Planner & Penugasan",
          subtitle: "Rencanakan jadwal trip dan penugasan driver & armada",
        };
      case "delivery-order":
        return {
          title: "Delivery Order (DO)",
          subtitle: "Manajemen dokumen pengiriman, shipper & consignee",
        };
      case "uang-jalan":
        return {
          title: "Uang Jalan Driver",
          subtitle: "Pencairan, klaim biaya perjalanan, dan penyelesaian uang jalan",
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
          subtitle: "Jadwal servis, perbaikan kendaraan, dan work order mekanik",
        };
      case "unit-rusak":
        return {
          title: "Unit Rusak & Darurat",
          subtitle: "Laporan kerusakan, tingkat keparahan, dan progress perbaikan",
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
      case "driver":
        return {
          title: "Master Data Driver",
          subtitle: "Profil pengemudi, SIM, dan performa driver",
        };
      case "vehicle":
        return {
          title: "Master Data Kendaraan",
          subtitle: "Inventarisasi armada, spesifikasi teknis, dan dokumen kendaraan",
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
          subtitle: "Rekomendasi kecerdasan buatan untuk efisiensi rute & armada",
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
      case "planner":
        return <PlannerPage />;
      case "delivery-order":
        return <DeliveryOrderPage />;
      case "uang-jalan":
        return <UangJalanPage />;
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
    <div className="min-h-screen bg-[#F4F6F9] flex text-slate-800 antialiased font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Topbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1">{renderContent()}</main>
        <Footer />
      </div>
    </div>
  );
};
