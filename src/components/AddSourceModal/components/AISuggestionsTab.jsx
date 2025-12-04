import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SuggestedSourceItem } from "./SuggestedSourceItem";
import { NEWS_SERVICE_URL } from "../../../api/news_service";

/**
 * AISuggestionsTab component for getting AI-powered source suggestions
 */
export function AISuggestionsTab({ 
  activeTab, 
  persistedTopic, 
  setPersistedTopic, 
  persistedSuggestions, 
  setPersistedSuggestions,
  sources,
  onSourcesUpdate,
  onCancel
}) {
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
      
      if (!token) {
        throw new Error('No authentication token found');
      }

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
      setSelectedSuggestions(new Set()); // Clear previous selections
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert(`Error getting suggestions: ${error.message}`);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const toggleSuggestionSelection = (index) => {
    const newSelected = new Set(selectedSuggestions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedSuggestions(newSelected);
  };

  const addSelectedSources = async () => {
    if (selectedSuggestions.size === 0) {
      alert('Please select at least one source');
      return;
    }

    const selectedSourcesArray = Array.from(selectedSuggestions).map(index => persistedSuggestions[index]);
    
    try {
      // Add all selected sources at the top of the current sources list
      const proposedSources = [...selectedSourcesArray, ...sources];
      const actualSources = await onSourcesUpdate(proposedSources);
      
      // Check if any sources were filtered out due to duplicates
      const expectedCount = sources.length + selectedSourcesArray.length;
      const actualCount = actualSources.length;
      
      if (actualCount < expectedCount) {
        const filteredCount = expectedCount - actualCount;
        alert(`${filteredCount} source(s) were not added because they already exist (duplicate URLs)`);
      }
      
      // Clear selections and close modal
      setSelectedSuggestions(new Set());
      onCancel();
    } catch (error) {
      console.error('Error adding selected sources:', error);
    }
  };

  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${
        activeTab === 'suggest' 
          ? 'transform translate-x-0 opacity-100' 
          : 'transform -translate-x-full opacity-0 absolute inset-0'
      }`}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={persistedTopic}
              onChange={(e) => setPersistedTopic(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="e.g., basketball, technology, politics"
              onKeyPress={(e) => e.key === 'Enter' && getSuggestions()}
            />
            <button
              onClick={getSuggestions}
              disabled={suggestionsLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {suggestionsLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Get Suggestions'
              )}
            </button>
          </div>
        </div>

        {/* Suggested Sources */}
        {persistedSuggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Suggested Sources ({selectedSuggestions.size} selected)
              </label>
              {selectedSuggestions.size > 0 && (
                <button
                  onClick={addSelectedSources}
                  className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <PlusIcon className="h-3 w-3" />
                  Add Selected ({selectedSuggestions.size})
                </button>
              )}
            </div>
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {persistedSuggestions.map((source, index) => (
                <SuggestedSourceItem
                  key={index}
                  source={source}
                  index={index}
                  isSelected={selectedSuggestions.has(index)}
                  onToggle={toggleSuggestionSelection}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


