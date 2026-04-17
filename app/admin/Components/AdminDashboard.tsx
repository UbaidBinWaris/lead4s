"use client";

import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardLayout } from "@/app/admin/Components/DashboardLayout";
import { OverviewDashboard } from "@/app/admin/Components/OverviewDashboard";
import { BlogsView } from "@/app/admin/Components/BlogsView";
import { JobApplicationsView } from "@/app/admin/Components/JobApplicationsView";
import { IndustriesView } from "@/app/admin/Components/IndustriesView";
import { SolutionsView } from "@/app/admin/Components/SolutionsView";
import { CaseStudiesView } from "@/app/admin/Components/CaseStudiesView";

export type View = "overview" | "blogs" | "jobs" | "industries" | "solutions" | "case-studies";

function AdminDashboardInner() {
  const [activeView, setActiveView] = useState<View>("overview");

  return (
    <DashboardLayout activeView={activeView} onNavigate={setActiveView}>
      {activeView === "overview" && (
        <OverviewDashboard onNavigateToBlogs={() => setActiveView("blogs")} />
      )}
      {activeView === "blogs" && <BlogsView />}
      {activeView === "jobs" && <JobApplicationsView />}
      {activeView === "industries" && <IndustriesView />}
      {activeView === "solutions" && <SolutionsView />}
      {activeView === "case-studies" && <CaseStudiesView />}
    </DashboardLayout>
  );
}

export function AdminDashboard() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      })
  );

  const provider = useMemo(
    () => (
      <QueryClientProvider client={queryClient}>
        <AdminDashboardInner />
      </QueryClientProvider>
    ),
    [queryClient]
  );

  return provider;
}
