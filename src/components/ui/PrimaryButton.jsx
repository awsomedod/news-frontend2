import { classNames } from "../../utils/classNames";
import { LoadingSpinner } from "./LoadingSpinner";

/**
 * PrimaryButton component for form submissions
 */
export function PrimaryButton({ children, loading, className = "", ...props }) {
  return (
    <button
      className={classNames(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm",
        "hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70",
        "transition-colors duration-200",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {children}
      {loading ? <LoadingSpinner /> : null}
    </button>
  );
}


