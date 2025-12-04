import { LockClosedIcon } from "@heroicons/react/24/outline";

/**
 * AuthLayout component wraps the authentication forms with consistent styling
 */
export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-blue-600/10 p-2.5 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20">
              <LockClosedIcon className="h-full w-full text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account or create a new one
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
