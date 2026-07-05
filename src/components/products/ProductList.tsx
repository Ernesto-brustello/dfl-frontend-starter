import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

export function ProductList({ products, onEdit, onDelete, deletingId }: ProductListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={deletingId === product.id}
          />
        </li>
      ))}
    </ul>
  );
}
