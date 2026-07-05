import { SupplierList } from "@/components/suppliers";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui";
import { useGetSuppliers } from "@/hooks/useGetSuppliers";

export default function SuppliersPage() {
  const { data, isPending, isError, refetch } = useGetSuppliers();

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Fornecedores</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Lista simples sem paginação —{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">getSuppliers()</code> retorna{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">Supplier[]</code> direto.
        </p>
      </header>

      {isPending && <LoadingState />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isPending && !isError && data?.length === 0 && <EmptyState />}
      {!isPending && !isError && data && data.length > 0 && <SupplierList suppliers={data} />}
    </main>
  );
}
