import { useEffect, useState } from "react";
import { Button, Input, formFieldClass } from "@/components/ui";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/enums/product-category.enum";
import { PRODUCT_CATEGORY_LABELS } from "@/constants/product-category.constants";
import { useGetSuppliers } from "@/hooks/useGetSuppliers";
import { cn } from "@/lib/utils";
import type { CreateProductDto, Product } from "@/types";

interface ProductFormProps {
  initial?: Product | null;
  onSubmit: (dto: CreateProductDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  /** Exibe botão "Voltar" — usado na tela de criação */
  showBackButton?: boolean;
  /** Oculta título interno — dialog já exibe o título */
  hideTitle?: boolean;
  /** Remove borda/fundo — formulário dentro do dialog */
  embedded?: boolean;
}

const emptyForm: CreateProductDto = {
  name: "",
  price: 0,
  stock: 0,
  category: PRODUCT_CATEGORIES[0],
  supplierId: "",
};

export function ProductForm({
  initial,
  onSubmit,
  onCancel,
  isSubmitting,
  showBackButton = false,
  hideTitle = false,
  embedded = false,
}: ProductFormProps) {
  const [form, setForm] = useState<CreateProductDto>(emptyForm);
  const { data: suppliers } = useGetSuppliers();
  const isEdit = Boolean(initial);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        price: initial.price,
        stock: initial.stock,
        category: initial.category,
        supplierId: initial.supplierId ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      supplierId: form.supplierId || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "space-y-4",
        !embedded &&
          "rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900",
      )}
    >
      {showBackButton && (
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="px-0">
          ← Voltar
        </Button>
      )}

      {!hideTitle && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {isEdit ? "Editar produto" : "Novo produto"}
        </h3>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nome
        </label>
        <Input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Preço (R$)
          </label>
          <Input
            id="price"
            type="number"
            min={0}
            step={0.01}
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>
        <div>
          <label
            htmlFor="stock"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Estoque
          </label>
          <Input
            id="stock"
            type="number"
            min={0}
            required
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="form-category"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Categoria
        </label>
        <select
          id="form-category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
          className={formFieldClass}
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {PRODUCT_CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="supplier"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Fornecedor
        </label>
        <select
          id="supplier"
          value={form.supplierId ?? ""}
          onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
          className={formFieldClass}
        >
          <option value="">Nenhum</option>
          {suppliers?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Lista simples via useGetSuppliers — padrão para selects (sem paginação).
        </p>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
        {!showBackButton && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
