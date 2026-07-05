import { SIMULATED_API_DELAY_MS } from "@/constants/app.constants";
import {
  mapApiProductToProduct,
  mapCreateDtoToApiProduct,
  mapProductToApiProduct,
} from "@/mappers/product.mapper";
import { productsApiData } from "@/test-utils/products.dummy";
import type {
  CreateProductDto,
  PaginatedResponse,
  Product,
  ProductListParams,
  UpdateProductDto,
} from "@/types";
import type { ApiProduct } from "@/types/api-product.types";

let store: ApiProduct[] = [...productsApiData];

const delay = () => new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY_MS));

function getAllMapped(): Product[] {
  return store.map(mapApiProductToProduct);
}

function filterProducts(products: Product[], params: ProductListParams): Product[] {
  let result = products;

  if (params.searchTerm?.trim()) {
    const term = params.searchTerm.trim().toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(term));
  }

  if (params.category && params.category !== "all") {
    result = result.filter((p) => p.category === params.category);
  }

  return result;
}

export async function getProducts(params: ProductListParams): Promise<PaginatedResponse<Product>> {
  await delay();
  const filtered = filterProducts(getAllMapped(), params);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));
  const page = Math.min(params.page, totalPages);
  const start = (page - 1) * params.pageSize;
  const data = filtered.slice(start, start + params.pageSize);

  return { data, total, page, pageSize: params.pageSize, totalPages };
}

export async function getAllProducts(): Promise<Product[]> {
  await delay();
  return getAllMapped();
}

export async function getProductById(id: string): Promise<Product> {
  await delay();
  const item = store.find((p) => p.id === id);
  if (!item) throw new Error(`Produto com id "${id}" não encontrado`);
  return mapApiProductToProduct(item);
}

export async function createProduct(dto: CreateProductDto): Promise<Product> {
  await delay();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const apiProduct = mapCreateDtoToApiProduct(dto, id, { createdAt: now, updatedAt: now });
  store = [apiProduct, ...store];
  return mapApiProductToProduct(apiProduct);
}

export async function updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
  await delay();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Produto com id "${id}" não encontrado`);

  const current = mapApiProductToProduct(store[index]);
  const updated: Product = {
    ...current,
    ...dto,
    updatedAt: new Date().toISOString(),
  };
  store[index] = mapProductToApiProduct(updated);
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  await delay();
  const exists = store.some((p) => p.id === id);
  if (!exists) throw new Error(`Produto com id "${id}" não encontrado`);
  store = store.filter((p) => p.id !== id);
}

/** Apenas para testes — reseta o store ao estado inicial */
export function __resetProductsStoreForTests(): void {
  store = [...productsApiData];
}
