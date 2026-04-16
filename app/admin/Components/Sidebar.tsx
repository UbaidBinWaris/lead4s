import {
  FaBuilding,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaPenNib,
  FaShieldAlt,
  FaUserTie,
} from "react-icons/fa";
import { LogoutButton } from "./LogoutButton";
import type { View } from "./AdminDashboard";

type SidebarProps = {
  readonly activeView: View;
  readonly onNavigate: (view: View) => void;
};

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col py-2">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-2.5 px-3 pt-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
          <FaShieldAlt className="h-3.5 w-3.5 text-blue-400" />
        </div>
        <span className="text-sm font-semibold text-white">CRM Admin</span>
      </div>

      {/* Primary nav */}
      <nav className="space-y-0.5 px-1">
        <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Main
        </p>
        <NavButton icon={FaChartBar} label="Dashboard" active={activeView === "overview"} onClick={() => onNavigate("overview")} />
        <NavButton icon={FaPenNib} label="Blogs" active={activeView === "blogs"} onClick={() => onNavigate("blogs")} />
        <NavButton icon={FaBuilding} label="Industries" active={activeView === "industries"} onClick={() => onNavigate("industries")} />
        <NavButton icon={FaUserTie} label="Applications" active={activeView === "jobs"} onClick={() => onNavigate("jobs")} />
      </nav>

      {/* Coming soon */}
      <nav className="mt-5 space-y-0.5 px-1">
        <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Soon
        </p>
        <NavSoon icon={FaClipboardList} label="Case Studies" />
        <NavSoon icon={FaCog} label="Settings" />
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-slate-800 px-1 pt-3">
        <LogoutButton />
      </div>
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-blue-600/15 font-medium text-blue-300"
          : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </button>
  );
}

function NavSoon({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex w-full cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{label}</span>
      <span className="ml-auto rounded-full bg-slate-800/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
        Soon
      </span>
    </div>
  );
}
