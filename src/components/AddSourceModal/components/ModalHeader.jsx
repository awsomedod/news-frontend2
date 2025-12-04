import { DialogTitle, Description } from "@headlessui/react";

/**
 * ModalHeader component for the AddSourceModal
 */
export function ModalHeader() {
  return (
    <>
      <DialogTitle className="text-base font-semibold text-gray-900 dark:text-white">
        Add New Source
      </DialogTitle>
      <Description className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Add a new news source manually or get AI suggestions.
      </Description>
    </>
  );
}
