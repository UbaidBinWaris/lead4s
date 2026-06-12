"use client";

import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardLayout } from "@/app/eTbfg9xY780vqX/Components/DashboardLayout";
import { OverviewDashboard } from "@/app/eTbfg9xY780vqX/Components/OverviewDashboard";
import { BlogsView } from "@/app/eTbfg9xY780vqX/Components/BlogsView";
import { JobApplicationsView } from "@/app/eTbfg9xY780vqX/Components/JobApplicationsView";
import { IndustriesView } from "@/app/eTbfg9xY780vqX/Components/IndustriesView";
import { SolutionsView } from "@/app/eTbfg9xY780vqX/Components/SolutionsView";
import { CaseStudiesView } from "@/app/eTbfg9xY780vqX/Components/CaseStudiesView";
import { TeamMembersView } from "@/app/eTbfg9xY780vqX/Components/TeamMembersView";
import { SubscribersView } from "@/app/eTbfg9xY780vqX/Components/SubscribersView";
import { PartnershipApplicationsView } from "@/app/eTbfg9xY780vqX/Components/PartnershipApplicationsView";
import { ContactMessagesView } from "@/app/eTbfg9xY780vqX/Components/ContactMessagesView";
import { BuyerLeadsView } from "@/app/eTbfg9xY780vqX/Components/BuyerLeadsView";

export type View = "overview" | "blogs" | "jobs" | "industries" | "solutions" | "case-studies" | "team-members" | "subscribers" | "partnership" | "contact-messages" | "buyer-leads";

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
      {activeView === "buyer-leads" && <BuyerLeadsView />}
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
