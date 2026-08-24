import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@/components/ui";
import { LivroList } from "@/components/books/LivroList";
import { useLivros, useDeleteLivro, useUpdateLivro } from "@/hooks/useLivros";
import type { Livro } from "@/types/book.types";

export default function LivrosPage() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useLivros({ q });
  const deleteMutation = useDeleteLivro();
  const updateMutation = useUpdateLivro();
  const navigate = useNavigate();

  const livros: Livro[] = (data as any)?.data ?? [];

  function handleEdit(b: Livro) {
    navigate(`/livros/${b.id}/editar`);
  }

  function handleToggleStock(id: string) {
    const livro = livros.find((item) => item.id === id);
    if (!livro) return;

    updateMutation.mutate({ id, inStock: !livro.inStock });
  }

  function handleDelete(id: string) {
    if (!confirm("Deseja excluir este livro?")) return;
    deleteMutation.mutate(id);
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Livros</h2>
        <div className="flex items-center gap-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar livros" />
          <Button asChild>
            <Link to="/livros/novo">Novo</Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <LivroList
          livros={livros}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStock={handleToggleStock}
          deletingId={null}
        />
      )}
    </main>
  );
}
