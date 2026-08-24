export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  categoria?: string;
  paginas?: number;
  publicadoEm?: string | null;
  resumo?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateLivroDto = Omit<Livro, "id" | "createdAt" | "updatedAt">;
export type UpdateLivroDto = Partial<CreateLivroDto> & { id: string };

export type LivroListParams = {
  page?: number;
  perPage?: number;
  q?: string;
  categoria?: string;
  autor?: string;
};
