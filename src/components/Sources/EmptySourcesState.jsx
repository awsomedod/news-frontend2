import { GlobeAltIcon, PlusIcon } from "@heroicons/react/24/outline";

/**
 * EmptySourcesState component shown when no sources are added
 */
export function EmptySourcesState({ onAddClick, isUpdating }) {
  return (
    <div className="text-center py-12">
      <GlobeAltIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
        No sources added yet
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Add a source to get started
      </p>
      <button
        onClick={onAddClick}
        disabled={isUpdating}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusIcon className="h-4 w-4" />
        Add Source
      </button>
    </div>
  );
}
