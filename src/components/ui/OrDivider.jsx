/**
 * OrDivider component for separating form sections
 */
export function OrDivider({ text = "or" }) {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          {text}
        </span>
      </div>
    </div>
  );
}
