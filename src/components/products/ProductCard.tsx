import { PRODUCT_CATEGORY_LABELS } from "@/constants/product-category.constants";
import { formatDate } from "@/lib/date.utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, isDeleting }: ProductCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {PRODUCT_CATEGORY_LABELS[product.category]} · Estoque: {product.stock}
          </p>
        </div>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      </div>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Criado em {formatDate(product.createdAt)} · Atualizado em {formatDate(product.updatedAt)}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Editar
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(product.id)}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
