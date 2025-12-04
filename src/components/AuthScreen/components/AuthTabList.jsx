import { Tab, TabList } from "@headlessui/react";
import { classNames } from "../../../utils/classNames";

/**
 * AuthTabList component for switching between Login and Sign Up tabs
 */
export function AuthTabList() {
  return (
    <TabList className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
      {["Login", "Sign Up"].map((tab) => (
        <Tab
          key={tab}
          className={({ selected }) =>
            classNames(
              "rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500",
              selected
                ? "bg-white text-gray-900 shadow dark:bg-gray-900 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            )
          }
        >
          {tab}
        </Tab>
      ))}
    </TabList>
  );
}
