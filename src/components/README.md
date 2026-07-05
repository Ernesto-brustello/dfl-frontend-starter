# Components

Peças de **interface React** — JSX, Tailwind, interação. Organizados por **feature** (domínio) + pastas compartilhadas.

## Estrutura

```txt
components/
├── ui/           # Genéricos — qualquer feature pode usar
├── layout/       # Shell da app — header, layout, hub
├── auth/         # Rotas protegidas, UI de login
├── products/     # Só domínio "produtos"
└── suppliers/    # Só domínio "fornecedores"
```

**Regra prática:**

| Usado em… | Pasta |
| --------- | ----- |
| **Uma feature** só | `components/{feature}/` |
| **Várias features** | `components/ui/` ou `components/layout/` |

Código que muda junto fica junto — facilita achar arquivos e remover uma feature inteira.

## Componente vs página

| Camada | Responsabilidade | Exemplo |
| ------ | ---------------- | ------- |
| **`pages/`** | Orquestra hooks, estado de tela, rotas | `ProductsPage` — chama `useGetProducts`, decide create vs list |
| **`components/`** | UI reutilizável ou de domínio | `ProductList`, `ProductForm`, `Pagination` |

```txt
pages/ProductsPage.tsx
    ↓ hooks (useGetProducts, useCreateProduct…)
    ↓ passa dados e callbacks
components/products/ProductList.tsx
    ↓
components/products/ProductCard.tsx
```

Páginas **montam**; componentes **renderizam** e **disparam callbacks**.

## Pastas neste projeto

| Pasta | O que tem |
| ----- | --------- |
| `ui/` | `LoadingState`, `ErrorState`, `EmptyState`, `Pagination`, `Dialog`, `ThemeToggle`, `ErrorBoundary` |
| `layout/` | `AppLayout`, `HeaderActions`, `UserMenu`, `HubCard` |
| `auth/` | `ProtectedRoute` |
| `products/` | `ProductList`, `ProductCard`, `ProductForm`, `ProductFilters`, `ProductEditDialog` |
| `suppliers/` | `SupplierList`, `SupplierCard` |

## Padrões de UX

| Ação | Onde |
| ---- | ---- |
| **Criar** produto | tela dedicada + botão **Voltar** (`ProductForm` com `showBackButton`) |
| **Editar** produto | modal sobre a lista (`ProductEditDialog` usa `Dialog` de `ui/`) |
| Loading / erro / vazio | componentes de `ui/` — mesma linguagem visual em todas as rotas |

## Fluxo de dados

Componentes **não** chamam `services/` direto. Duas formas válidas:

1. **Container na página** — page usa hooks e passa `products`, `onEdit`, `isLoading` via props (padrão do CRUD).
2. **Hook dentro do componente** — só quando o componente é claramente “inteligente” e isolado (usar com moderação).

Preferir props + callbacks para listas e forms — fica fácil testar e reutilizar.

## Regras

1. **Um componente exportado por arquivo** — `ProductCard.tsx`.
2. **Barrel `index.ts`** por feature — importe `@/components/products`, não caminhos profundos.
3. **Props tipadas** — interface `XxxProps` no mesmo arquivo (ou type inline se trivial).
4. Preferir arquivos **< 150–200 linhas** — extrair subcomponente ou hook se crescer.
5. **Sem fetch** — dados vêm de hooks na page ou via props.
6. Estilos com **Tailwind**; classes compartilhadas via `cn()` em `lib/utils.ts`.

## Quando criar pasta nova

Nova entidade de negócio (ex.: `orders/`) → `components/orders/` + `pages/OrdersPage.tsx` + fluxo completo em `types/`, `services/`, `hooks/`.

Genérico que serve a todos (ex.: `Button`, `Input`) → `components/ui/`.

## Import limpo

```ts
import { ProductList, ProductForm } from "@/components/products";
import { LoadingState, Pagination } from "@/components/ui";
```
