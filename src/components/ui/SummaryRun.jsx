import { useState } from "react";
import { SummaryCard } from "./SummaryCard";
import { SummaryModal } from "./SummaryModal";

/**
 * SummaryRun component for displaying a single summary run with date and summaries
 */
export function SummaryRun({ summaryRun }) {
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSummaryClick = (summary) => {
    setSelectedSummary(summary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSummary(null);
  };
  // Format the date string to be more readable
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  return (
    <div className="space-y-4">
      {/* Date and Time Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatDate(summaryRun.date_and_time)}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({summaryRun.summaries?.length || 0} summaries)
        </span>
      </div>

      {/* Summaries Grid */}
      <div className="space-y-3">
        {summaryRun.summaries?.map((summary, index) => (
          <SummaryCard
            key={index}
            summary={summary}
            onClick={handleSummaryClick}
          />
        )) || (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No summaries available for this run
          </p>
        )}
      </div>

      {/* Summary Modal */}
      <SummaryModal
        summary={selectedSummary}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
