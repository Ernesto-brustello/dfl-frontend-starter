import type { Supplier } from "@/types";
import { SupplierCard } from "./SupplierCard";

interface SupplierListProps {
  suppliers: Supplier[];
}

export function SupplierList({ suppliers }: SupplierListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {suppliers.map((supplier) => (
        <li key={supplier.id}>
          <SupplierCard supplier={supplier} />
        </li>
      ))}
    </ul>
  );
}
