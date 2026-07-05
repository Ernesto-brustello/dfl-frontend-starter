import type { Supplier } from "@/types";

interface SupplierCardProps {
  supplier: Supplier;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{supplier.name}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            supplier.active
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {supplier.active ? "Ativo" : "Inativo"}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{supplier.email}</p>
    </article>
  );
}
