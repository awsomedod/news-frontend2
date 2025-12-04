import { Bars3Icon } from "@heroicons/react/24/outline";
import { UserMenu } from "./UserMenu";

/**
 * TopBar component - Sticky top navigation bar
 */
export function TopBar({ user, onLogout, onOpenSidebar }) {
  return (
    <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="lg:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={onOpenSidebar}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
}


