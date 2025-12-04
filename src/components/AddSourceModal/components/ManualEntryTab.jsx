/**
 * ManualEntryTab component for manually adding a new source
 */
export function ManualEntryTab({ newSource, setNewSource, activeTab }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        activeTab === "manual"
          ? "transform translate-x-0 opacity-100"
          : "transform translate-x-full opacity-0 absolute inset-0"
      }`}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            value={newSource.name}
            onChange={(e) =>
              setNewSource((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="e.g., ESPN"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            URL
          </label>
          <input
            type="url"
            value={newSource.url}
            onChange={(e) =>
              setNewSource((prev) => ({ ...prev, url: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="https://www.example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={newSource.description}
            onChange={(e) =>
              setNewSource((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Brief description of the source..."
          />
        </div>
      </div>
    </div>
  );
}
