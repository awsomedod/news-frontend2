/**
 * SuggestedSourceItem component for displaying a single AI-suggested source
 */
export function SuggestedSourceItem({ source, index, isSelected, onToggle }) {
  return (
    <div
      className={`rounded-lg border p-3 transition-colors cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/20"
          : "border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
      }`}
      onClick={() => onToggle(index)}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(index)}
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
  );
}
