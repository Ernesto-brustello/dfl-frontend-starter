import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-gray-600">Página não encontrada.</p>
      <Link to="/" className="text-blue-600 underline">
        Voltar ao início
      </Link>
    </main>
  );
}
