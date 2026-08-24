import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { useLivro } from "@/hooks/useLivros";

export default function LivroDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useLivro(id);
  const livro = (data as any) ?? null;

  if (isLoading) return <div>Carregando...</div>;
  if (!livro) return <div>Livro não encontrado</div>;

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{livro.titulo}</h2>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link to={`/livros/${livro.id}/editar`}>Editar</Link>
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Autor: {livro.autor}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Categoria: {livro.categoria}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Páginas: {livro.paginas ?? "-"}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Publicado em: {livro.publicadoEm ?? "-"}</p>
      <section className="prose max-w-none dark:prose-invert">{livro.resumo}</section>
    </main>
  );
}
