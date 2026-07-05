# Services

Funções **async puras** — camada de acesso a dados. Sem React, sem hooks, sem JSX. É aqui que a UI “pede” dados ao backend (hoje dummy, amanhã API).

## O que fazem

- Ler e escrever dados (listar, buscar por id, criar, atualizar, excluir)
- Aplicar regras simples (paginação, filtros, delay simulado)
- Lançar erro quando o recurso não existe

## Fluxo completo

```txt
Componente  →  hook (useGetProducts)  →  service (getProducts)
                                              ↓
                                         dummy ou API
                                              ↓
                                         mapper (se payload ≠ domínio)
                                              ↓
                                         retorna Promise<Product>
```

**Regra de ouro:** componentes **nunca** chamam `services/` direto — sempre via `hooks/` + React Query.

## Regras

1. Sempre retornam `Promise<T>`.
2. Recurso inexistente → `throw new Error('...')` (React Query expõe `isError`).
3. Hoje leem de `src/test-utils/*.dummy.ts`; amanhã podem chamar `lib/api.ts`.
4. Usar `constants/` para delay, page size etc. — não magic numbers no meio do código.

## Produtos — dois padrões de listagem

| Função | Retorno | Uso |
| ------ | ------- | --- |
| `getProducts(params)` | `PaginatedResponse<Product>` | Tabela com filtros e paginação (`/exemplo-crud`) |
| `getAllProducts()` | `Product[]` | Select no formulário (lista completa, sem paginar) |

## Fornecedores — lista simples

`getSuppliers()` → `Supplier[]` — todo de uma vez, sem paginação (ver `/exemplo-lista-simples`).

## Quando integrar API real

Trocar **só** o corpo das funções (fetch + mapper). Assinatura (`params`, retorno tipado) permanece — hooks e UI intactos.
