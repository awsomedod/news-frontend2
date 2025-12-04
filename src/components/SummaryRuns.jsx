import { SummaryRun } from "./ui/SummaryRun";

/**
 * SummaryRuns component for displaying all summary runs
 */
export function SummaryRuns({ summaryRuns = [] }) {
  // Sort summary runs by date_and_time (most recent first)
  const sortedSummaryRuns = [...summaryRuns].sort((a, b) => {
    const dateA = new Date(a.date_and_time);
    const dateB = new Date(b.date_and_time);
    return dateB - dateA; // Descending order (newest first)
  });

  if (!summaryRuns || summaryRuns.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          No Summary Runs Available
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Summary runs will appear here when they become available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Summary Runs
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {sortedSummaryRuns.length} run
          {sortedSummaryRuns.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Summary Runs List */}
      <div className="space-y-6">
        {sortedSummaryRuns.map((summaryRun, index) => (
          <SummaryRun key={index} summaryRun={summaryRun} />
        ))}
      </div>
    </div>
  );
}
