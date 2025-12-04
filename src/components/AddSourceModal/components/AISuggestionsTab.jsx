import { TopicInput } from "./TopicInput";
import { SuggestionsList } from "./SuggestionsList";
import { useSuggestions } from "../hooks/useSuggestions";

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
  const { suggestionsLoading, selectedSuggestions, getSuggestions, toggleSelection, clearSelections } = 
    useSuggestions(persistedTopic, setPersistedSuggestions);

  const addSelectedSources = async () => {
    if (selectedSuggestions.size === 0) {
      alert('Please select at least one source');
      return;
    }
    const selectedSourcesArray = Array.from(selectedSuggestions).map(i => persistedSuggestions[i]);
    try {
      const proposedSources = [...selectedSourcesArray, ...sources];
      const actualSources = await onSourcesUpdate(proposedSources);
      const expectedCount = sources.length + selectedSourcesArray.length;
      if (actualSources.length < expectedCount) {
        alert(`${expectedCount - actualSources.length} source(s) were not added because they already exist`);
      }
      clearSelections();
      onCancel();
    } catch (error) {
      console.error('Error adding selected sources:', error);
    }
  };

  return (
    <div className={`transition-all duration-300 ease-in-out ${
      activeTab === 'suggest' ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-full opacity-0 absolute inset-0'
    }`}>
      <div className="space-y-4">
        <TopicInput topic={persistedTopic} setTopic={setPersistedTopic} onGetSuggestions={getSuggestions} isLoading={suggestionsLoading} />
        <SuggestionsList suggestions={persistedSuggestions} selectedSuggestions={selectedSuggestions} onToggle={toggleSelection} onAddSelected={addSelectedSources} />
      </div>
    </div>
  );
}
