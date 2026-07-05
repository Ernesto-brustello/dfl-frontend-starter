import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UserMenu } from "./UserMenu";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <nav className="mr-2 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100">
          Início
        </Link>
      </nav>
      <ThemeToggle />
      <UserMenu />
    </div>
  );
}
