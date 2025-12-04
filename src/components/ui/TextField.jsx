import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../utils/classNames";

/**
 * TextField component for form inputs with icon support
 */
export function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  rightIcon,
  onRightIconClick,
  autoComplete,
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <div
        className={classNames(
          "relative rounded-lg border bg-white dark:bg-gray-800",
          error
            ? "border-red-400 dark:border-red-500"
            : "border-gray-300 dark:border-gray-700",
          "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        )}
      >
        {icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </div>
        ) : null}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={classNames(
            "block w-full rounded-lg bg-transparent",
            "py-2.5 pr-10",
            icon ? "pl-10" : "pl-3",
            "text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm",
            "dark:text-gray-100 dark:placeholder:text-gray-500"
          )}
        />
        {rightIcon ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
          <ExclamationCircleIcon className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
