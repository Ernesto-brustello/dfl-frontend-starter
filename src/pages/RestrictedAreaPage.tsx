import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function RestrictedAreaPage() {
  const { user, signOut } = useAuth();

  return (
    <main className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Área restrita</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Esta rota usa{" "}
        <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">ProtectedRoute</code>. Faça
        login na home — o avatar aparece no header. Troque{" "}
        <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">AuthContext</code> por Supabase
        Auth no futuro; páginas e header não precisam mudar.
      </p>

      {user ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-14 w-14 rounded-full border border-green-300 dark:border-green-700"
            />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">Olá, {user.name}!</p>
              <p className="text-sm text-green-700 dark:text-green-300">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="mt-4 rounded-md border border-green-600 px-4 py-2 text-sm text-green-800 hover:bg-green-100 dark:text-green-200 dark:hover:bg-green-900"
          >
            Sair
          </button>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          Você foi redirecionado porque não está autenticado. Use o login demo na home.
        </p>
      )}

      <Link to="/" className="text-blue-600 underline dark:text-blue-400">
        Voltar ao início
      </Link>
    </main>
  );
}

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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-3 rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900"
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
