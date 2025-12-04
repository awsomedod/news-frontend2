import { useState } from "react";
import { MobileSidebar } from "../MobileSidebar";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { TopBar } from "./components/TopBar";
import { MainContent } from "./components/MainContent";
import { NavList } from "./components/NavList";
import { useDashboardData } from "./hooks/useDashboardData";

/**
 * DashboardScreen component - Main dashboard view for authenticated users
 */
export default function DashboardScreen({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    userData,
    userDataLoading,
    userDataError,
    sourcesUpdating,
    fetchUserData,
    updateSources,
  } = useDashboardData();

  const handleNewsGenerated = async () => {
    await fetchUserData();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        nav={<NavList />}
        onLogout={onLogout}
      />
      <DesktopSidebar onLogout={onLogout} />
      <div className="lg:pl-64">
        <TopBar
          user={user}
          onLogout={onLogout}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <MainContent
          user={user}
          userData={userData}
          userDataLoading={userDataLoading}
          userDataError={userDataError}
          sourcesUpdating={sourcesUpdating}
          updateSources={updateSources}
          fetchUserData={fetchUserData}
          handleNewsGenerated={handleNewsGenerated}
        />
      </div>
    </div>
  );
}
