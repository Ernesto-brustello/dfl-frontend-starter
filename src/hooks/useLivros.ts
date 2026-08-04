import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LivroListParams, CreateLivroDto, UpdateLivroDto, Livro } from "@/types/book.types";
import * as livrosService from "@/services/livros.service";

export function useLivros(params?: LivroListParams) {
  return useQuery({
    queryKey: ["livros", params ?? {}],
    queryFn: () => livrosService.listLivros(params),
  });
}

export function useLivro(id?: string) {
  return useQuery({
    queryKey: ["livro", id],
    queryFn: () => (id ? livrosService.getLivro(id) : Promise.resolve(null)),
    enabled: !!id,
  });
}

export function useCreateLivro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateLivroDto) => livrosService.createLivro(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livros"] }),
  });
}

export function useUpdateLivro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateLivroDto) => livrosService.updateLivro(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livros"] }),
  });
}

export function useDeleteLivro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => livrosService.deleteLivro(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livros"] }),
  });
}
