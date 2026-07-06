import { useState } from "react";
import { ProductEditDialog, ProductFilters, ProductForm, ProductList } from "@/components/products";
import { Button, EmptyState, ErrorState, LoadingState, Pagination } from "@/components/ui";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import type { CreateProductDto, Product } from "@/types";

export default function ProductsPage() {
  const filters = useProductFilters();
  const { data, isPending, isError, refetch } = useGetProducts(filters.params);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreateSubmit = async (dto: CreateProductDto) => {
    await createMutation.mutateAsync(dto);
    setShowCreateForm(false);
  };

  const handleEditSubmit = async (dto: CreateProductDto) => {
    if (!editingProduct) return;
    await updateMutation.mutateAsync({ id: editingProduct.id, dto });
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este produto?")) return;
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Produtos</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Filtros em <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useState</code> ·
            dados em <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">React Query</code> ·
            editar em <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">Dialog</code> ·
            detalhe em <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">/exemplo-detalhe/:id</code>
          </p>
        </div>
        {!showCreateForm && (
          <Button type="button" onClick={() => setShowCreateForm(true)}>
            Novo produto
          </Button>
        )}
      </header>

      {showCreateForm && (
        <ProductForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setShowCreateForm(false)}
          isSubmitting={createMutation.isPending}
          showBackButton
        />
      )}

      {!showCreateForm && (
        <>
          <ProductFilters
            searchTerm={filters.searchTerm}
            category={filters.category}
            onSearchChange={filters.handleSearchChange}
            onCategoryChange={filters.handleCategoryChange}
          />

          {isPending && <LoadingState />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isPending && !isError && data?.data.length === 0 && (
            <EmptyState message="Nenhum produto encontrado com os filtros atuais." />
          )}
          {!isPending && !isError && data && data.data.length > 0 && (
            <>
              <ProductList
                products={data.data}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
              <Pagination
                page={data.page}
                totalPages={data.totalPages}
                total={data.total}
                onPageChange={filters.setPage}
              />
            </>
          )}
        </>
      )}

      <ProductEditDialog
        product={editingProduct}
        open={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditSubmit}
        isSubmitting={updateMutation.isPending}
      />
    </main>
  );
}
