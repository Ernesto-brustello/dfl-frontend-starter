import { SIMULATED_API_DELAY_MS } from "@/constants/app.constants";
import { suppliersData } from "@/test-utils/suppliers.dummy";
import type { Supplier } from "@/types";

const delay = () => new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY_MS));

export async function getSuppliers(): Promise<Supplier[]> {
  await delay();
  return suppliersData;
}
