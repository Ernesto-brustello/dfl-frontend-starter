import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
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
          <Button
            type="button"
            variant="secondary"
            onClick={signOut}
            className="mt-4 border-green-600 text-green-800 hover:bg-green-100 dark:text-green-200 dark:hover:bg-green-900"
          >
            Sair
          </Button>
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
