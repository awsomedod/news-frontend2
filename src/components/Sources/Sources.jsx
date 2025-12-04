import { useState } from "react";
import { AddSourceModal } from "../AddSourceModal";
import { EmptySourcesState } from "./EmptySourcesState";
import { SourceCard } from "./SourceCard";
import { AddSourceButton } from "./AddSourceButton";

/**
 * Sources component for managing news sources
 */
export function Sources({ sources = [], onSourcesUpdate, isUpdating = false }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSource, setNewSource] = useState({
    name: "",
    url: "",
    description: "",
  });
  const [addingSource, setAddingSource] = useState(false);
  const [persistedTopic, setPersistedTopic] = useState("");
  const [persistedSuggestions, setPersistedSuggestions] = useState([]);

  const removeSource = async (indexToRemove) => {
    if (isUpdating) return;
    try {
      await onSourcesUpdate(sources.filter((_, i) => i !== indexToRemove));
    } catch (error) {
      alert(
        "Failed to remove source. Please try again. Error: " + error.message
      );
    }
  };

  const addSource = async () => {
    if (addingSource || isUpdating) return;
    if (
      !newSource.name.trim() ||
      !newSource.url.trim() ||
      !newSource.description.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }
    setAddingSource(true);
    try {
      const actualSources = await onSourcesUpdate([newSource, ...sources]);
      if (actualSources.length === sources.length) {
        alert("Source not added: A source with this URL already exists");
        return;
      }
      setNewSource({ name: "", url: "", description: "" });
      setShowAddModal(false);
    } finally {
      setAddingSource(false);
    }
  };

  const modalProps = {
    newSource,
    setNewSource,
    onAdd: addSource,
    onCancel: () => setShowAddModal(false),
    isAdding: addingSource,
    sources,
    onSourcesUpdate,
    persistedTopic,
    setPersistedTopic,
    persistedSuggestions,
    setPersistedSuggestions,
  };

  if (!sources || sources.length === 0) {
    return (
      <>
        <EmptySourcesState
          onAddClick={() => setShowAddModal(true)}
          isUpdating={isUpdating}
        />
        {showAddModal && <AddSourceModal {...modalProps} />}
      </>
    );
  }

  return (
    <div className="space-y-4">
      <AddSourceButton
        onClick={() => setShowAddModal(true)}
        isUpdating={isUpdating}
      />
      {sources.map((source, index) => (
        <SourceCard
          key={index}
          source={source}
          index={index}
          onRemove={removeSource}
          isUpdating={isUpdating}
        />
      ))}
      {showAddModal && <AddSourceModal {...modalProps} />}
    </div>
  );
}
