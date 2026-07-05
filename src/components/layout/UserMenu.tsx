import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu do usuário"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-blue-500/40"
      >
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-9 w-9 rounded-full border border-gray-200 object-cover dark:border-gray-600"
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-100 px-4 pb-3 dark:border-gray-800">
            <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              signOut();
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
