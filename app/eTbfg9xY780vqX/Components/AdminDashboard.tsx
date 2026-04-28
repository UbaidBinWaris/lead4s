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
import { TeamMembersView } from "@/app/admin/Components/TeamMembersView";
import { SubscribersView } from "@/app/admin/Components/SubscribersView";
import { PartnershipApplicationsView } from "@/app/admin/Components/PartnershipApplicationsView";
import { ContactMessagesView } from "@/app/admin/Components/ContactMessagesView";

export type View = "overview" | "blogs" | "jobs" | "industries" | "solutions" | "case-studies" | "team-members" | "subscribers" | "partnership" | "contact-messages";

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
      {activeView === "team-members" && <TeamMembersView />}
      {activeView === "subscribers"  && <SubscribersView />}
      {activeView === "partnership"   && <PartnershipApplicationsView />}
      {activeView === "contact-messages" && <ContactMessagesView />}
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
