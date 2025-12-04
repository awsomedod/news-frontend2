/**
 * WelcomeSection component - Welcome message for the user
 */
export function WelcomeSection({ user }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Welcome, {user?.name || user?.username || "there"}!
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Here is what's happening with your project today.
      </p>
    </div>
  );
}
