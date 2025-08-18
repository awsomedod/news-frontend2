import { classNames } from "../../utils/classNames";

/**
 * StatCard component for displaying statistics with optional delta
 */
export function StatCard({ label, value, delta, icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {delta != null && (
            <p className={classNames("mt-1 text-xs", delta >= 0 ? "text-emerald-600" : "text-red-500")}>
              {delta >= 0 ? "+" : ""}
              {delta}% vs last week
            </p>
          )}
        </div>
        <div className="rounded-lg bg-blue-600/10 p-2.5 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20">
          {icon}
        </div>
      </div>
    </div>
  );
}
