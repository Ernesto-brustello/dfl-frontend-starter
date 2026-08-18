import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { useLivro, useCreateLivro, useUpdateLivro } from "@/hooks/useLivros";
import type { CreateLivroDto } from "@/types/book.types";

export default function LivroFormPage() {
  const { id } = useParams();
  const { data } = useLivro(id as string);
  const livro = (data as any) ?? null;
  const [form, setForm] = useState<CreateLivroDto>({ titulo: "", autor: "", inStock: true });
  const create = useCreateLivro();
  const update = useUpdateLivro();
  const navigate = useNavigate();

  useEffect(() => {
    if (livro) {
      setForm({
        titulo: livro.titulo,
        autor: livro.autor,
        categoria: livro.categoria,
        paginas: livro.paginas,
        publicadoEm: livro.publicadoEm,
        resumo: livro.resumo,
        inStock: livro.inStock ?? true,
      });
    }
  }, [livro]);

  function handleChange<K extends keyof CreateLivroDto>(k: K, v: any) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (id) {
      update.mutate({ ...(form as any), id });
      navigate(`/livros/${id}`);
    } else {
      create.mutate(form as any, { onSuccess: () => navigate("/livros") });
    }
  }

  return (
    <main>
      <h2 className="text-xl font-semibold">{id ? "Editar livro" : "Novo livro"}</h2>
      <form className="mt-4 space-y-3 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <Input value={form.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Autor</label>
          <Input value={form.autor} onChange={(e) => handleChange("autor", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <Input value={form.categoria ?? ""} onChange={(e) => handleChange("categoria", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Páginas</label>
          <Input value={form.paginas ? String(form.paginas) : ""} onChange={(e) => handleChange("paginas", Number(e.target.value) || undefined)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Publicado em</label>
          <Input value={form.publicadoEm ?? ""} onChange={(e) => handleChange("publicadoEm", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Resumo</label>
          <textarea className="w-full rounded border p-2" value={form.resumo ?? ""} onChange={(e) => handleChange("resumo", e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Salvar</Button>
          <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </div>
      </form>
    </main>
  );
}
