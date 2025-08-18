import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { NEWS_SERVICE_URL } from "../api/news_service";

/**
 * AddSourceModal component for adding new sources manually or with AI suggestions
 */
export function AddSourceModal({ 
  newSource, 
  setNewSource, 
  onAdd, 
  onCancel, 
  isAdding, 
  sources, 
  onSourcesUpdate,
  persistedTopic,
  setPersistedTopic,
  persistedSuggestions,
  setPersistedSuggestions
}) {
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'suggest'
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
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/60" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-150 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-2"
            >
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-white">
                  Add New Source
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Add a new news source manually or get AI suggestions.
                </Dialog.Description>

                {/* Tab Navigation */}
                <div className="mt-4 flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                  <button
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
                      activeTab === 'manual'
                        ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    Manual Entry
                  </button>
                  <button
                    onClick={() => setActiveTab('suggest')}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
                      activeTab === 'suggest'
                        ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    AI Suggestions
                  </button>
                </div>

                {/* Tab Content */}
                <div className="mt-4 relative">
                  <div className="relative overflow-hidden">
                    {/* Manual Entry Tab */}
                    <div 
                      className={`transition-all duration-300 ease-in-out ${
                        activeTab === 'manual' 
                          ? 'transform translate-x-0 opacity-100' 
                          : 'transform translate-x-full opacity-0 absolute inset-0'
                      }`}
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            value={newSource.name}
                            onChange={(e) => setNewSource(prev => ({ ...prev, name: e.target.value }))}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            placeholder="e.g., ESPN"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            URL
                          </label>
                          <input
                            type="url"
                            value={newSource.url}
                            onChange={(e) => setNewSource(prev => ({ ...prev, url: e.target.value }))}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            placeholder="https://www.example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <textarea
                            value={newSource.description}
                            onChange={(e) => setNewSource(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            placeholder="Brief description of the source..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* AI Suggestions Tab */}
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
                                <div
                                  key={index}
                                  className={`rounded-lg border p-3 transition-colors cursor-pointer ${
                                    selectedSuggestions.has(index)
                                      ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/20'
                                      : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
                                  }`}
                                  onClick={() => toggleSuggestionSelection(index)}
                                >
                                  <div className="flex items-start gap-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedSuggestions.has(index)}
                                      onChange={() => toggleSuggestionSelection(index)}
                                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {source.name}
                                      </h4>
                                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                        {source.description}
                                      </p>
                                      <p className="mt-1 text-xs text-blue-600 dark:text-blue-400 truncate">
                                        {source.url}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={onCancel}
                    disabled={isAdding}
                  >
                    Cancel
                  </button>
                  {activeTab === 'manual' && (
                    <button
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={onAdd}
                      disabled={isAdding}
                    >
                      {isAdding ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <PlusIcon className="h-4 w-4" />
                      )}
                      {isAdding ? 'Adding...' : 'Add Source'}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
