import { Fragment, useState } from "react";
import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
  PlusIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  HomeIcon,
  ChartBarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatCard({ label, value, delta, icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {delta != null && (
            <p className={classNames("mt-1 text-xs", delta >= 0 ? "text-emerald-600" : "text-red-500")}>
              {delta >= 0 ? "+" : ""}
              {delta}% vs last week
            </p>
          )}
        </div>
        <div className="rounded-lg bg-blue-600/10 p-2.5 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children, action }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PlaceholderChart() {
  return (
    <div className="h-40 w-full">
      <div className="grid h-full grid-cols-12 items-end gap-2">
        {[35, 50, 28, 64, 44, 72, 60, 80, 52, 66, 48, 74].map((h, i) => (
          <div
            key={i}
            className="rounded-t-md bg-blue-600/70 dark:bg-blue-500/70"
            style={{ height: `${h}%` }}
            title={`${h}%`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileSidebar({ open, setOpen, nav, onLogout }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/60" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 pt-6 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-blue-600/10 p-2 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20" />
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Dashboard</span>
                  </div>
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="-mx-2 space-y-1">
                    {nav}
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigation = [
    { name: "Home", icon: <HomeIcon className="h-5 w-5" />, current: true },
    {
      name: "Analytics",
      icon: <ChartBarIcon className="h-5 w-5" />,
      children: [
        { name: "Overview", current: false },
        { name: "Engagement", current: false },
        { name: "Conversions", current: false },
      ],
    },
    { name: "Tasks", icon: <ListBulletIcon className="h-5 w-5" />, current: false },
    { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" />, current: false },
  ];

  const NavList = () => (
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        nav={<NavList />}
        onLogout={onLogout}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 py-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-9 items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-blue-600/10 p-2 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20" />
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

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/80">
          <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                <BellIcon className="h-5 w-5" />
              </button>

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
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              "flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200",
                              active && "bg-gray-100 dark:bg-gray-800"
                            )}
                          >
                            <Cog6ToothIcon className="h-4 w-4" />
                            Settings
                          </button>
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
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome, {user?.name || user?.username || "there"}!
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Here is what's happening with your project today.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatCard
              label="Active Users"
              value="2,341"
              delta={12}
              icon={<UserCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            />
            <StatCard
              label="Sessions"
              value="8,902"
              delta={-3}
              icon={<ChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            />
            <StatCard
              label="Tasks"
              value="37"
              delta={8}
              icon={<ListBulletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card
                title="Traffic overview"
                action={
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Widget
                  </button>
                }
              >
                <PlaceholderChart />
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card title="Recent activity">
                <ul className="space-y-3">
                  {[
                    { id: 1, title: "New signup", detail: (user?.email || "user@example.com"), time: "2m ago" },
                    { id: 2, title: "Task completed", detail: "Design onboarding flow", time: "1h ago" },
                    { id: 3, title: "New comment", detail: "Review dashboard layout", time: "3h ago" },
                  ].map((item) => (
                    <li key={item.id} className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.detail}</p>
                      </div>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Sample modal */}
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/60" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-200 transform"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-white">
                    Add Widget
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    This is a sample modal using Headless UI Dialog.
                  </Dialog.Description>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Traffic trend"
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                      onClick={() => setModalOpen(false)}
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
