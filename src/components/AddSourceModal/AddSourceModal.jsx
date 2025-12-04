import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ModalHeader } from "./components/ModalHeader";
import { ModalFooter } from "./components/ModalFooter";
import { ModalTabs } from "./components/ModalTabs";
import { ManualEntryTab } from "./components/ManualEntryTab";
import { AISuggestionsTab } from "./components/AISuggestionsTab";

/**
 * AddSourceModal component for adding new sources manually or with AI suggestions
 */
export function AddSourceModal({ 
  newSource, setNewSource, onAdd, onCancel, isAdding, sources, 
  onSourcesUpdate, persistedTopic, setPersistedTopic, persistedSuggestions, setPersistedSuggestions
}) {
  const [activeTab, setActiveTab] = useState('manual');

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-200" enterFrom="opacity-0" enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-900/60" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="transition ease-in-out duration-200 transform" enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0" leave="transition ease-in-out duration-150 transform" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-2">
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <ModalHeader />
                <ModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="mt-4 relative">
                  <div className="relative overflow-hidden">
                    <ManualEntryTab newSource={newSource} setNewSource={setNewSource} activeTab={activeTab} />
                    <AISuggestionsTab activeTab={activeTab} persistedTopic={persistedTopic} setPersistedTopic={setPersistedTopic}
                      persistedSuggestions={persistedSuggestions} setPersistedSuggestions={setPersistedSuggestions}
                      sources={sources} onSourcesUpdate={onSourcesUpdate} onCancel={onCancel} />
                  </div>
                </div>
                <ModalFooter onCancel={onCancel} onAdd={onAdd} isAdding={isAdding} showAddButton={activeTab === 'manual'} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
