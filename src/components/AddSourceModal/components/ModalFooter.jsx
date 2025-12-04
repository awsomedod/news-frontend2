import { PlusIcon } from "@heroicons/react/24/outline";

/**
 * ModalFooter component with Cancel and Add buttons
 */
export function ModalFooter({ onCancel, onAdd, isAdding, showAddButton }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button
        className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        onClick={onCancel}
        disabled={isAdding}
      >
        Cancel
      </button>
      {showAddButton && (
        <button
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onAdd}
          disabled={isAdding}
        >
          {isAdding ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
          {isAdding ? "Adding..." : "Add Source"}
        </button>
      )}
    </div>
  );
}
