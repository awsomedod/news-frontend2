import { useState, useEffect } from "react";
import { NEWS_SERVICE_URL } from "../../../api/news_service";

/**
 * Custom hook for managing dashboard user data and sources
 */
export function useDashboardData() {
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userDataError, setUserDataError] = useState(null);
  const [sourcesUpdating, setSourcesUpdating] = useState(false);

  const fetchUserData = async () => {
    try {
      setUserDataLoading(true);
      setUserDataError(null);
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${NEWS_SERVICE_URL}/user`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to fetch user data: ${response.status}`);
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserDataError(error.message);
    } finally {
      setUserDataLoading(false);
    }
  };

  const updateSources = async (newSources) => {
    try {
      setSourcesUpdating(true);
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${NEWS_SERVICE_URL}/update-sources`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sources: newSources }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update sources: ${response.status}`);
      }
      const responseData = await response.json();
      const actualSources = responseData.new_sources || newSources;
      setUserData(prev => prev ? { ...prev, sources: actualSources } : null);
      return actualSources;
    } catch (error) {
      console.error('Error updating sources:', error);
      alert(`Error updating sources: ${error.message}`);
      throw error;
    } finally {
      setSourcesUpdating(false);
    }
  };

  useEffect(() => { fetchUserData(); }, []);

  return { userData, userDataLoading, userDataError, sourcesUpdating, fetchUserData, updateSources };
}

