import { Dialog } from "@/components/ui";
import type { CreateProductDto, Product } from "@/types";
import { ProductForm } from "./ProductForm";

interface ProductEditDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateProductDto) => void;
  isSubmitting?: boolean;
}

export function ProductEditDialog({
  product,
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: ProductEditDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Editar produto">
      {product && (
        <ProductForm
          initial={product}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
          hideTitle
          embedded
        />
      )}
    </Dialog>
  );
}
