import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../../utils/classNames";

/**
 * UserMenu component - Dropdown menu for user actions
 */
export function UserMenu({ user, onLogout }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 rounded-full p-1 pl-2 pr-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800">
        <UserCircleIcon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
        <span className="hidden text-sm text-gray-700 dark:text-gray-200 sm:block">
          {user?.name || user?.username || "User"}
        </span>
        <ChevronDownIcon className="hidden h-4 w-4 text-gray-500 sm:block" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg focus:outline-none dark:border-gray-800 dark:bg-gray-900">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    "px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
                    active && "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  Signed in as
                  <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || "user@example.com"}
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800" />
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={classNames(
                    "flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 dark:text-red-400",
                    active && "bg-red-50 dark:bg-red-950/40"
                  )}
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}


