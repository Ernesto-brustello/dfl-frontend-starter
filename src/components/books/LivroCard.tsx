import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import type { Livro } from "@/types/book.types";
import { formatDate } from "@/lib/date.utils";

interface LivroCardProps {
  livro: Livro;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onEdit: (livro: Livro) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string) => void;
  isDeleting?: boolean;
}

export function LivroCard({
  livro,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  onToggleStock,
  isDeleting,
}: LivroCardProps) {
  const isSoldOut = !livro.inStock;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{livro.titulo}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{livro.autor}</p>
          <span
            className={`mt-2 inline-block text-sm font-medium ${
              isSoldOut ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {isSoldOut ? "Esgotado" : "Disponível"}
          </span>
          {isFavorite && (
            <span className="mt-2 inline-block text-sm font-medium text-yellow-600">
              ★ Favorito
            </span>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
          <div>{livro.categoria}</div>
          <div>{livro.paginas ? `${livro.paginas} páginas` : "-"}</div>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Criado em {formatDate(livro.createdAt)} · Atualizado em {formatDate(livro.updatedAt)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link to={`/livros/${livro.id}`}>Ver</Link>
        </Button>
        <Button type="button" size="sm" onClick={onToggleFavorite}>
          {isFavorite ? "Desfavoritar" : "Favoritar"}
        </Button>
        <Button type="button" size="sm" onClick={() => onToggleStock(livro.id)}>
          {isSoldOut ? "Marcar disponível" : "Marcar esgotado"}
        </Button>
        <Button type="button" size="sm" onClick={() => onEdit(livro)}>
          Editar
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          disabled={isDeleting}
          onClick={() => onDelete(livro.id)}
        >
          Excluir
        </Button>
      </div>
    </article>
  );
}
