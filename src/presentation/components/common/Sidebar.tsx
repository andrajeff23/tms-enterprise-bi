import {
  AlertTriangle,
  BarChart3,
  Building2,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Database,
  FileCheck2,
  LayoutDashboard,
  LogOut,
  MapPin,
  Receipt,
  Settings,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  UserCheck,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setActiveTab } from "../../../store/tmsSlice";

interface SidebarItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  onClose?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  active,
  onClick,
  onClose,
}) => {
  const handleClick = () => {
    onClick();
    onClose?.();
  };
  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${active
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold"
        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
        }`}
    >
      <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
};

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open = false, onClose }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.tms.activeTab);

  const navSections = [
    {
      title: "OPERASIONAL",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
        },
        {
          id: "order-management",
          label: "Order Management",
          icon: <ClipboardList size={18} />,
        },
        {
          id: "planner",
          label: "Planner & Penugasan",
          icon: <CalendarCheck size={18} />,
        },
        {
          id: "delivery-order",
          label: "Delivery Order",
          icon: <Truck size={18} />,
        },
        {
          id: "tracking",
          label: "Tracking & Monitoring",
          icon: <MapPin size={18} />,
        },
        { id: "uang-jalan", label: "Uang Jalan", icon: <Wallet size={18} /> },
        {
          id: "pod",
          label: "Proof of Delivery",
          icon: <FileCheck2 size={18} />,
        },
      ],
    },
    {
      title: "FLEET & MAINTENANCE",
      items: [
        {
          id: "fleet-management",
          label: "Fleet Management",
          icon: <Truck size={18} />,
        },
        { id: "maintenance", label: "Maintenance", icon: <Wrench size={18} /> },
        {
          id: "unit-rusak",
          label: "Unit Rusak",
          icon: <AlertTriangle size={18} />,
        },
      ],
    },
    {
      title: "FINANCE",
      items: [
        { id: "invoice", label: "Invoice", icon: <Receipt size={18} /> },
        { id: "payment", label: "Payment", icon: <CreditCard size={18} /> },
        { id: "penagihan", label: "Penagihan", icon: <Building2 size={18} /> },
      ],
    },
    {
      title: "MASTER DATA",
      items: [
        { id: "master-data", label: "Master Data", icon: <Database size={18} /> },
        // { id: "driver", label: "Driver", icon: <UserCheck size={18} /> },
        // { id: "vehicle", label: "Vehicle / Unit", icon: <Truck size={18} /> },
        // { id: "tarif", label: "Tarif", icon: <Tag size={18} /> },
      ],
    },
    {
      title: "REPORTS & ANALYTICS",
      items: [
        { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
        { id: "analytics", label: "Analytics", icon: <Sparkles size={18} /> },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { id: "settings", label: "Settings", icon: <Settings size={18} /> },
        // {
        // id: "user-management",
        // label: "User Management",
        // icon: <ShieldCheck size={18} />,
        // },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-64 bg-navy-900 border-r border-white/10 text-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50 select-none overflow-y-auto custom-scrollbar transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        {/* Brand Header */}
        <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10 sticky top-0 bg-navy-900 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
            <Truck size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="font-bold text-white tracking-wide text-lg leading-none">
              TMS BI
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Transport Management System
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-3 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                {section.title}
              </div>
              {section.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  active={activeTab === item.id}
                  onClick={() => dispatch(setActiveTab(item.id))}
                  onClose={onClose}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Logout */}
        <div className="p-3 border-t border-white/10 sticky bottom-0 bg-navy-900">
          <button
            onClick={() => alert("Logged out successfully.")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-lg text-sm font-medium transition-all"
          >
            <LogOut size={18} className="text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
