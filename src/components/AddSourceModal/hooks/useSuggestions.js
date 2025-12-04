import { useState } from "react";
import { NEWS_SERVICE_URL } from "../../../api/news_service";

/**
 * Custom hook for managing AI source suggestions
 */
export function useSuggestions(persistedTopic, setPersistedSuggestions) {
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState(new Set());

  const getSuggestions = async () => {
    if (!persistedTopic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setSuggestionsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${NEWS_SERVICE_URL}/suggest-sources`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: persistedTopic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to get suggestions: ${response.status}`);
      }

      const data = await response.json();
      setPersistedSuggestions(data.sources || []);
      setSelectedSuggestions(new Set());
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert(`Error getting suggestions: ${error.message}`);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const toggleSelection = (index) => {
    const newSelected = new Set(selectedSuggestions);
    if (newSelected.has(index)) newSelected.delete(index);
    else newSelected.add(index);
    setSelectedSuggestions(newSelected);
  };

  const clearSelections = () => setSelectedSuggestions(new Set());

  return { suggestionsLoading, selectedSuggestions, getSuggestions, toggleSelection, clearSelections };
}

