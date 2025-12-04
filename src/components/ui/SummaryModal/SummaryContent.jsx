const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNNDIgMzBINTRWNDJINDJWMzBaIiBmaWxsPSIjOTQ5Rjc0Ii8+PHBhdGggZD0iTTMwIDU0SDY2VjY2SDMwVjU0WiIgZmlsbD0iIzk0OUY3NCIvPjwvc3ZnPg==';

/**
 * SummaryContent component displaying summary image, title, and text
 */
export function SummaryContent({ summary }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <img src={summary.image} alt={summary.title} className="w-24 h-24 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">{summary.title}</h4>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Full Summary</h5>
        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{summary.summary}</div>
      </div>
    </div>
  );
}

