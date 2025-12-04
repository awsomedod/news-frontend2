/**
 * TopicInput component for entering a topic to get AI suggestions
 */
export function TopicInput({ topic, setTopic, onGetSuggestions, isLoading }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Topic
      </label>
      <div className="mt-1 flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="e.g., basketball, technology, politics"
          onKeyPress={(e) => e.key === 'Enter' && onGetSuggestions()}
        />
        <button
          onClick={onGetSuggestions}
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            'Get Suggestions'
          )}
        </button>
      </div>
    </div>
  );
}

