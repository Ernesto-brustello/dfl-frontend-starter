import { Link, useParams } from "react-router-dom";
import { ErrorState, LoadingState } from "@/components/ui";
import { PRODUCT_CATEGORY_LABELS } from "@/constants/product-category.constants";
import { useGetProduct } from "@/hooks/useGetProduct";
import { formatDate, formatDateTime } from "@/lib/date.utils";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isPending, isError, refetch } = useGetProduct(id ?? null);

  if (isPending) return <LoadingState message="Carregando produto..." />;
  if (isError || !product) {
    return (
      <main className="space-y-4">
        <ErrorState message="Produto não encontrado." onRetry={() => refetch()} />
        <Link to="/exemplo-crud" className="text-sm text-blue-600 underline dark:text-blue-400">
          Voltar à lista
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg space-y-6">
      <div>
        <Link
          to="/exemplo-crud"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          ← Voltar à lista
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Rota dedicada com <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useGetProduct</code>{" "}
          — padrão para tela de detalhe (<code className="rounded bg-gray-100 px-1 dark:bg-gray-800">/exemplo-detalhe/:id</code>
          ).
        </p>
      </div>

      <article className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500 dark:text-gray-400">Preço</dt>
            <dd className="font-semibold text-gray-900 dark:text-gray-100">
              {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500 dark:text-gray-400">Estoque</dt>
            <dd className="text-gray-900 dark:text-gray-100">{product.stock}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500 dark:text-gray-400">Categoria</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {PRODUCT_CATEGORY_LABELS[product.category]}
            </dd>
          </div>
          {product.supplierId && (
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500 dark:text-gray-400">Fornecedor (id)</dt>
              <dd className="text-gray-900 dark:text-gray-100">{product.supplierId}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500 dark:text-gray-400">Criado em</dt>
            <dd className="text-gray-900 dark:text-gray-100">{formatDate(product.createdAt)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500 dark:text-gray-400">Atualizado em</dt>
            <dd className="text-gray-900 dark:text-gray-100">{formatDateTime(product.updatedAt)}</dd>
          </div>
        </dl>
      </article>

        <Link
          to="/exemplo-crud"
          className="inline-flex rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Ver na lista (editar via dialog)
        </Link>
    </main>
  );
}
