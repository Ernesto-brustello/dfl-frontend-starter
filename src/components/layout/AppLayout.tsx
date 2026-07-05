import { Link, Outlet } from "react-router-dom";
import { HeaderActions } from "./HeaderActions";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">
            DFL Frontend Starter
          </Link>
          <HeaderActions />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}
