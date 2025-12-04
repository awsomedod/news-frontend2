import { Dialog, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 * SummaryModalHeader component with title and close button
 */
export function SummaryModalHeader({ onClose }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <DialogTitle
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 dark:text-white pr-4"
      >
        News Summary
      </DialogTitle>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-gray-300"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
