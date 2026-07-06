import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

export function RestrictedLoginPanel() {
  const { signIn, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("demo@devfellowship.com");

  if (isAuthenticated) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void signIn(email);
      }}
      className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
    >
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Login demo (stub)</p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Após entrar, veja o avatar no canto superior direito do header.
      </p>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2"
      />
      <Button type="submit" variant="neutral" disabled={isLoading} className="mt-3">
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
