import { PlusIcon } from "@heroicons/react/24/outline";

/**
 * AddSourceButton component - dashed button to add a new source
 */
export function AddSourceButton({ onClick, isUpdating }) {
  return (
    <button
      onClick={onClick}
      disabled={isUpdating}
      className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-blue-950/20"
    >
      <PlusIcon className="mx-auto h-6 w-6 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
        Add Source
      </span>
    </button>
  );
}

