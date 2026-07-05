interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Página {page} de {totalPages} — {total} itens no total
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800"
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
