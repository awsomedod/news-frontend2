import { Dialog } from "@headlessui/react";

/**
 * ModalHeader component for the AddSourceModal
 */
export function ModalHeader() {
  return (
    <>
      <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-white">
        Add New Source
      </Dialog.Title>
      <Dialog.Description className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Add a new news source manually or get AI suggestions.
      </Dialog.Description>
    </>
  );
}

