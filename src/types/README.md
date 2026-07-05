# Types

Contratos TypeScript — **formato dos dados** que circulam no app. Sem lógica, sem React, sem fetch.

## Domínio vs API

Dois “mundos” de tipos, quando a fronteira externa difere da UI:

| Mundo | Pasta / arquivo | Formato | Quem consome |
| ----- | --------------- | ------- | ------------ |
| **Domínio** | `product.types.ts`, `supplier.types.ts` | camelCase, tipos amigáveis | components, hooks, services (retorno) |
| **API** | `api-product.types.ts` | snake_case, como vem do backend | services (entrada), mappers |

```txt
API (ApiProduct)  →  mapper  →  Domínio (Product)  →  UI
```

Se o dummy já está no formato de domínio (ex.: `Supplier`), não precisa de type de API.

## O que vai em cada arquivo

| Arquivo | Conteúdo |
| ------- | -------- |
| `product.types.ts` | `Product`, DTOs (`CreateProductDto`, `UpdateProductDto`), params de listagem |
| `api-product.types.ts` | `ApiProduct` — espelho do payload REST/Supabase |
| `supplier.types.ts` | `Supplier` |
| `pagination.types.ts` | `PaginatedResponse<T>` — wrapper genérico de listagem |
| `auth.types.ts` | `User`, `AuthState` |

Importe pelo barrel: `@/types`.

## Relação com outras pastas

```txt
enums/     →  campo tipado (ex.: ProductCategory)
types/     →  interface que usa o enum
mappers/   →  converte ApiX → X
services/  →  Promise<X> ou Promise<PaginatedResponse<X>>
hooks/     →  repassa types nos params e retornos
```

**Enums** definem valores possíveis; **types** definem a forma do objeto inteiro.

## Padrões neste projeto

- **Datas** no domínio: `string` ISO (`createdAt`, `updatedAt`) — serializável em JSON.
- **DTOs** para criar/atualizar: campos que o formulário envia, sem `id` nem timestamps automáticos.
- **`Partial<CreateXDto>`** para update — nem todo campo precisa ser enviado.
- **Filtros** como types dedicados — ex.: `ProductListParams`, `ProductCategoryFilter`.

## Regras

1. **Um type/interface principal por arquivo** de entidade (+ DTOs relacionados no mesmo arquivo).
2. Preferir **`interface`** para objetos; **`type`** para unions e aliases (`UpdateProductDto`, `ProductCategoryFilter`).
3. Types de API **não** vão para o barrel principal se só o service/mapper usa — hoje `ApiProduct` é exportado para clareza didática.
4. **Não** colocar funções aqui — utils ficam em `lib/`.
5. Nomeie pelo **domínio** (`Product`), não pela tela (`ProductsPageProps` fica no componente).

## Exemplo rápido

```ts
// Domínio — o que a UI enxerga
interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  createdAt: string;
}

// API — o que o wire traz
interface ApiProduct {
  id: string;
  product_name: string;
  price_cents: string;
  category: ProductCategory;
  created_at: string;
}
```

O mapper fecha a diferença; componentes só conhecem `Product`.
