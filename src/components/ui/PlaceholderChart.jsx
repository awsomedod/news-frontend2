/**
 * PlaceholderChart component for displaying a simple bar chart placeholder
 */
export function PlaceholderChart() {
  return (
    <div className="h-40 w-full">
      <div className="grid h-full grid-cols-12 items-end gap-2">
        {[35, 50, 28, 64, 44, 72, 60, 80, 52, 66, 48, 74].map((h, i) => (
          <div
            key={i}
            className="rounded-t-md bg-blue-600/70 dark:bg-blue-500/70"
            style={{ height: `${h}%` }}
            title={`${h}%`}
          />
        ))}
      </div>
    </div>
  );
}
