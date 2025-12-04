import {
  GlobeAltIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

/**
 * SourceCard component for displaying a single news source
 */
export function SourceCard({ source, index, onRemove, isUpdating }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
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
          onClick={() => onRemove(index)}
          disabled={isUpdating}
          className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
