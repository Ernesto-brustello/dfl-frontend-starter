import type { Livro } from "@/types/book.types";
import { useState } from "react";
import { LivroCard } from "./LivroCard";

interface LivroListProps {
  livros: Livro[];
  onEdit: (livro: Livro) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string) => void;
  deletingId?: string | null;
}

export function LivroList({ livros, onEdit, onDelete, onToggleStock, deletingId }: LivroListProps) {
  const [favoriteBooks, setFavoriteBooks] = useState<Record<string, boolean>>({});
  const livrosOrdenados = [...livros].sort(
    (firstBook, secondBook) =>
      Number(favoriteBooks[secondBook.id] ?? false) - Number(favoriteBooks[firstBook.id] ?? false),
  );

  function toggleFavorite(id: string) {
    setFavoriteBooks((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {livrosOrdenados.map((livro) => (
        <li key={livro.id}>
          <LivroCard
            livro={livro}
            isFavorite={favoriteBooks[livro.id] ?? false}
            onToggleFavorite={() => toggleFavorite(livro.id)}
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
