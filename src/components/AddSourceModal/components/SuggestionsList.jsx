import { PlusIcon } from "@heroicons/react/24/outline";
import { SuggestedSourceItem } from "./SuggestedSourceItem";

/**
 * SuggestionsList component for displaying AI-suggested sources
 */
export function SuggestionsList({
  suggestions,
  selectedSuggestions,
  onToggle,
  onAddSelected,
}) {
  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Suggested Sources ({selectedSuggestions.size} selected)
        </label>
        {selectedSuggestions.size > 0 && (
          <button
            onClick={onAddSelected}
            className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <PlusIcon className="h-3 w-3" />
            Add Selected ({selectedSuggestions.size})
          </button>
        )}
      </div>
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {suggestions.map((source, index) => (
          <SuggestedSourceItem
            key={index}
            source={source}
            index={index}
            isSelected={selectedSuggestions.has(index)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
