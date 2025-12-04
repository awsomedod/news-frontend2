/**
 * SummaryCard component for displaying individual news summary
 */
export function SummaryCard({ summary, onClick }) {
  // Function to truncate text to approximately 2 lines
  const getTruncatedText = (text, maxLength = 120) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <div
      className="flex gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-gray-700 dark:hover:shadow-blue-900/20 active:scale-[0.98]"
      onClick={() => onClick && onClick(summary)}
    >
      {/* Summary Image */}
      <div className="flex-shrink-0">
        <img
          src={summary.image}
          alt={summary.title}
          className="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMjggMjBIMzZWMjhIMjhWMjBaIiBmaWxsPSIjOTQ5Rjc0Ii8+PHBhdGggZD0iTTIwIDM2SDQ0VjQ0SDIwVjM2WiIgZmlsbD0iIzk0OUY3NCIvPjwvc3ZnPg==";
          }}
        />
      </div>

      {/* Summary Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight mb-2">
          {summary.title}
        </h4>
        {summary.summary && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {getTruncatedText(summary.summary)}
          </p>
        )}
      </div>
    </div>
  );
}
