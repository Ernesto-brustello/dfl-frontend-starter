import type { Livro, CreateLivroDto, UpdateLivroDto, LivroListParams } from "@/types/book.types";

const STORAGE_KEY = "dfl_livros_v1";

function now() {
  return new Date().toISOString();
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function readStorage(): Livro[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return JSON.parse(raw) as Livro[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

function writeStorage(data: Livro[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function seed(): Livro[] {
  const sample: Livro[] = [
    {
      id: uid(),
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      categoria: "Infantil",
      paginas: 96,
      publicadoEm: "1943-04-06",
      resumo: "Um piloto encontra um jovem príncipe em um deserto...",
      inStock: true,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: uid(),
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      categoria: "Clássico",
      paginas: 256,
      publicadoEm: "1899-01-01",
      resumo: "Obra-prima da literatura brasileira sobre ciúme e memória.",
      inStock: false,
      createdAt: now(),
      updatedAt: now(),
    },
  ];
  writeStorage(sample);
  return sample;
}

export function listLivros(params?: LivroListParams) {
  const all = readStorage();
  let filtered = all;
  if (params?.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (b) => b.titulo.toLowerCase().includes(q) || b.autor.toLowerCase().includes(q) || (b.resumo || "").toLowerCase().includes(q),
    );
  }
  if (params?.categoria) {
    filtered = filtered.filter((b) => b.categoria === params.categoria);
  }
  if (params?.autor) {
    filtered = filtered.filter((b) => b.autor === params.autor);
  }
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 10;
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  return Promise.resolve({ data: paginated, total: filtered.length });
}

export function getLivro(id: string) {
  const all = readStorage();
  const book = all.find((b) => b.id === id) || null;
  return Promise.resolve(book);
}

export function createLivro(dto: CreateLivroDto) {
  const all = readStorage();
  const b: Livro = {
    id: uid(),
    ...dto,
    inStock: dto.inStock ?? true,
    createdAt: now(),
    updatedAt: now(),
  } as Livro;
  all.unshift(b);
  writeStorage(all);
  return Promise.resolve(b);
}

export function updateLivro(dto: UpdateLivroDto) {
  const all = readStorage();
  const idx = all.findIndex((b) => b.id === (dto as any).id);
  if (idx === -1) return Promise.reject(new Error("Livro não encontrado"));
  const updated: Livro = { ...all[idx], ...(dto as any), updatedAt: now() } as Livro;
  all[idx] = updated;
  writeStorage(all);
  return Promise.resolve(updated);
}

export function deleteLivro(id: string) {
  const all = readStorage();
  const filtered = all.filter((b) => b.id !== id);
  writeStorage(filtered);
  return Promise.resolve(true);
}
