import { useState, useEffect } from "react";
import { MobileSidebar } from "../MobileSidebar";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { TopBar } from "./components/TopBar";
import { MainContent } from "./components/MainContent";
import { NavList } from "./components/NavList";
import { NEWS_SERVICE_URL } from "../../api/news_service";

/**
 * DashboardScreen component - Main dashboard view for authenticated users
 */
export default function DashboardScreen({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userDataError, setUserDataError] = useState(null);
  const [sourcesUpdating, setSourcesUpdating] = useState(false);

  // Function to fetch user data from backend
  const fetchUserData = async () => {
    try {
      setUserDataLoading(true);
      setUserDataError(null);
      
      // Get JWT token from localStorage
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make API request to the user endpoint
      const response = await fetch(`${NEWS_SERVICE_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserDataError(error.message);
    } finally {
      setUserDataLoading(false);
    }
  };

  // Function to update sources via API
  const updateSources = async (newSources) => {
    try {
      setSourcesUpdating(true);
      
      // Get JWT token from localStorage
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make API request to update sources
      const response = await fetch(`${NEWS_SERVICE_URL}/update-sources`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sources: newSources }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update sources: ${response.status}`);
      }

      // Get the actual sources from the backend response
      const responseData = await response.json();
      const actualSources = responseData.new_sources || newSources;

      // Update local userData state with the actual sources returned by backend
      setUserData(prev => prev ? { ...prev, sources: actualSources } : null);
      
      return actualSources; // Return the actual sources for caller to use
      
    } catch (error) {
      console.error('Error updating sources:', error);
      alert(`Error updating sources: ${error.message}`);
      throw error; // Re-throw to handle in calling function
    } finally {
      setSourcesUpdating(false);
    }
  };

  // Function to handle news generation completion
  const handleNewsGenerated = async () => {
    // Refresh user data to show new summary runs
    await fetchUserData();
  };

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        nav={<NavList />}
        onLogout={onLogout}
      />

      {/* Desktop sidebar */}
      <DesktopSidebar onLogout={onLogout} />

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <TopBar 
          user={user} 
          onLogout={onLogout} 
          onOpenSidebar={() => setSidebarOpen(true)} 
        />

        {/* Content */}
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


