# Pages

Uma **página por rota** — orquestram hooks, estado de tela e montam componentes. Não concentram toda a UI inline.

## Responsabilidade

| Faz | Não faz |
| --- | ------- |
| Chama hooks (`useGetProducts`, mutations) | Estilizar cada campo do formulário |
| Decide qual view mostrar (lista vs create vs erro) | Chamar `services/` direto |
| Passa dados e callbacks para componentes | Lógica reutilizável (vai para `hooks/`) |

```txt
pages/ProductsPage.tsx
    ↓ useGetProducts, useCreateProduct, useState (tela)
    ↓ props + callbacks
components/products/ProductList.tsx
```

## Páginas neste projeto

| Rota | Arquivo | Padrão demonstrado |
| ---- | ------- | ------------------ |
| `/` | `HomePage.tsx` | Hub + links para exemplos |
| `/exemplo-crud` | `ProductsPage.tsx` | CRUD + filtros + paginação + dialog |
| `/exemplo-detalhe/:id` | `ProductDetailPage.tsx` | `useGetProduct` — busca por id |
| `/exemplo-lista-simples` | `SuppliersPage.tsx` | Lista read-only |
| `/exemplo-estado-local` | `LocalStateExamplePage.tsx` | `useState` vs server state |
| `/area-restrita` | `RestrictedAreaPage.tsx` | Rota protegida |
| `*` | `NotFound.tsx` | 404 |

## Regras

1. **Default export** — `export default function ProductsPage()`.
2. **Sem barrel `index.ts`** — import direto em `App.tsx`.
3. Login demo fica em `components/auth/RestrictedLoginPanel` — a home só monta o componente.
4. Página nova = nova rota em `App.tsx` + link no hub (se for exemplo).

## Quando criar página nova

Novo domínio (ex.: pedidos) → `pages/OrdersPage.tsx` + rota + fluxo completo (`types`, `services`, `hooks`, `components/orders/`).
