import { ArrowRightOnRectangleIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { NavList } from "./NavList";

/**
 * DesktopSidebar component - Static sidebar for desktop screens
 */
export function DesktopSidebar({ onLogout }) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 py-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-9 items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-600/10 p-2 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20">
            <Squares2X2Icon className="h-full w-full text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-base font-semibold text-gray-900 dark:text-white">Dashboard</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="-mx-2 space-y-1">
            <NavList />
          </ul>
          <div className="mt-auto pt-4">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}


