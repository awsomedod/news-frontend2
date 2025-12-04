import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, HomeIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../utils/classNames";

/**
 * Navigation items configuration
 */
export const navigation = [
  { name: "Home", icon: <HomeIcon className="h-5 w-5" />, current: true },
];

/**
 * NavList component for rendering navigation items
 */
export function NavList() {
  return (
    <Fragment>
      {navigation.map((item) =>
        item.children ? (
          <li key={item.name}>
            <Disclosure>
              {({ open }) => (
                <div>
                  <Disclosure.Button
                    className={classNames(
                      "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                      item.current && "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDownIcon
                      className={classNames("h-4 w-4 transition", open ? "rotate-180" : "rotate-0")}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <ul className="mt-1 space-y-1 pl-8">
                      {item.children.map((sub) => (
                        <li key={sub.name}>
                          <button className="w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </li>
        ) : (
          <li key={item.name}>
            <button
              className={classNames(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                item.current && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              {item.icon}
              {item.name}
            </button>
          </li>
        )
      )}
    </Fragment>
  );
}


