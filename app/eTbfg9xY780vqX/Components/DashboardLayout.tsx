import type { ReactNode } from "react";
import { Sidebar } from "@/app/admin/Components/Sidebar";
import type { View } from "@/app/admin/Components/AdminDashboard";

type DashboardLayoutProps = {
  readonly activeView: View;
  readonly onNavigate: (view: View) => void;
  readonly children: ReactNode;
};

export function DashboardLayout({ activeView, onNavigate, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[hsl(0,0%,3.9%)]">
      {/* Fixed sidebar */}
      <div className="hidden w-[220px] shrink-0 border-r border-slate-800 lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto p-3">
          <Sidebar activeView={activeView} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Main content — fills all remaining width */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
