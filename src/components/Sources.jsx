import { useState } from "react";
import { PlusIcon, GlobeAltIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { AddSourceModal } from "./AddSourceModal";

/**
 * Sources component for managing news sources
 */
export function Sources({ sources = [], onSourcesUpdate, isUpdating = false }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSource, setNewSource] = useState({ name: '', url: '', description: '' });
  const [addingSource, setAddingSource] = useState(false);
  // Persist AI suggestions across modal open/close
  const [persistedTopic, setPersistedTopic] = useState('');
  const [persistedSuggestions, setPersistedSuggestions] = useState([]);

  const removeSource = async (indexToRemove) => {
    if (isUpdating) return;
    
    const updatedSources = sources.filter((_, index) => index !== indexToRemove);
    try {
      await onSourcesUpdate(updatedSources);
    } catch (error) {
      console.error('Error removing source:', error);
      alert('Failed to remove source. Please try again.');
    }
  };

  const addSource = async () => {
    if (addingSource || isUpdating) return;
    
    // Validate form
    if (!newSource.name.trim() || !newSource.url.trim() || !newSource.description.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    setAddingSource(true);
    try {
      const proposedSources = [newSource, ...sources];
      const actualSources = await onSourcesUpdate(proposedSources);
      
      // Check if the source was filtered out due to duplicate URL
      if (actualSources.length === sources.length) {
        alert('Source not added: A source with this URL already exists');
        return; // Don't close modal or clear form if source wasn't added
      }
      
      setNewSource({ name: '', url: '', description: '' });
      setShowAddModal(false);
    } finally {
      setAddingSource(false);
    }
  };

  if (!sources || sources.length === 0) {
    return (
      <div className="text-center py-12">
        <GlobeAltIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">No sources added yet</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Add a source to get started
        </p>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={isUpdating}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PlusIcon className="h-4 w-4" />
          Add Source
        </button>
        {showAddModal && (
          <AddSourceModal
            newSource={newSource}
            setNewSource={setNewSource}
            onAdd={addSource}
            onCancel={() => setShowAddModal(false)}
            isAdding={addingSource}
            sources={sources}
            onSourcesUpdate={onSourcesUpdate}
            persistedTopic={persistedTopic}
            setPersistedTopic={setPersistedTopic}
            persistedSuggestions={persistedSuggestions}
            setPersistedSuggestions={setPersistedSuggestions}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowAddModal(true)}
        disabled={isUpdating}
        className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-blue-950/20"
      >
        <PlusIcon className="mx-auto h-6 w-6 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Add Source
        </span>
      </button>

      {sources.map((source, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {source.name}
                </h4>
              </div>
              {source.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {source.description}
                </p>
              )}
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <span className="truncate">{source.url}</span>
                  <ArrowTopRightOnSquareIcon className="h-3 w-3 flex-shrink-0" />
                </a>
              )}
            </div>
            <button
              onClick={() => removeSource(index)}
              disabled={isUpdating}
              className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      {showAddModal && (
        <AddSourceModal
          newSource={newSource}
          setNewSource={setNewSource}
          onAdd={addSource}
          onCancel={() => setShowAddModal(false)}
          isAdding={addingSource}
          sources={sources}
          onSourcesUpdate={onSourcesUpdate}
          persistedTopic={persistedTopic}
          setPersistedTopic={setPersistedTopic}
          persistedSuggestions={persistedSuggestions}
          setPersistedSuggestions={setPersistedSuggestions}
        />
      )}
    </div>
  );
}
