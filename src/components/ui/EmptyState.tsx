interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "Nenhum item encontrado." }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
      {message}
    </div>
  );
}
