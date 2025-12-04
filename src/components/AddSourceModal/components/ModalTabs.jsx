/**
 * ModalTabs component for switching between Manual Entry and AI Suggestions
 */
export function ModalTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mt-4 flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
      <button
        onClick={() => setActiveTab("manual")}
        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
          activeTab === "manual"
            ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        }`}
      >
        Manual Entry
      </button>
      <button
        onClick={() => setActiveTab("suggest")}
        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
          activeTab === "suggest"
            ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        }`}
      >
        AI Suggestions
      </button>
    </div>
  );
}
