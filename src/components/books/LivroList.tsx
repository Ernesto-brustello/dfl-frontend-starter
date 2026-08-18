import type { Livro } from "@/types/book.types";
import { LivroCard } from "./LivroCard";

interface LivroListProps {
  livros: Livro[];
  onEdit: (livro: Livro) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string) => void;
  deletingId?: string | null;
}

export function LivroList({ livros, onEdit, onDelete, onToggleStock, deletingId }: LivroListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {livros.map((livro) => (
        <li key={livro.id}>
          <LivroCard
            livro={livro}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStock={onToggleStock}
            isDeleting={deletingId === livro.id}
          />
        </li>
      ))}
    </ul>
  );
}
