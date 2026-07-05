# Hooks

Funções que **usam React** — encapsulam lógica reutilizável entre componentes. É a camada que a UI chama diretamente.

## Três famílias neste projeto

| Família | O que faz | Exemplos |
| ------- | --------- | -------- |
| **Server state** (React Query) | Busca/muta dados via `services/` | `useGetProducts`, `useCreateProduct` |
| **Context bridge** | Reexporta contexto com nome limpo | `useAuth`, `useTheme` |
| **UI / utilitário** | Estado local ou efeito reutilizável | `useDebounce`, `useCounter`, `useProductFilters` |

## Fluxo (server state)

```txt
Componente  →  useGetProducts(params)  →  useQuery
                                              ↓
                                         queryKeys.products.list(params)
                                              ↓
                                         getProducts(params)  [service]
                                              ↓
                                         { data, isLoading, isError, ... }
```

**Leitura:** `useQuery` + `queryKey` + `queryFn` apontando para o service.

**Escrita:** `useMutation` + `mutationFn` + `invalidateQueries` no `onSuccess`.

## Context bridge

Contextos ficam em `contexts/`; hooks expõem a API pública:

```txt
contexts/AuthContext  →  useAuthContext()
hooks/useAuth.ts      →  useAuth()   ← componentes importam daqui
```

Assim a UI não depende da implementação interna do Provider.

## Exemplos neste projeto

| Hook | Tipo | Uso |
| ---- | ---- | --- |
| `useGetProducts` | query | listagem paginada com filtros |
| `useGetAllProducts` | query | select no formulário |
| `useGetProduct` | query | detalhe / edição |
| `useCreateProduct` | mutation | criar + invalidar cache |
| `useUpdateProduct` | mutation | editar + invalidar cache |
| `useDeleteProduct` | mutation | excluir + invalidar cache |
| `useGetSuppliers` | query | lista simples |
| `useProductFilters` | UI | search, category, page → `ProductListParams` |
| `useDebounce` | util | atrasa valor antes de ir para a queryKey |
| `useCounter` | UI | exemplo de estado local (`/exemplo-estado-local`) |

## Regras

1. **Um hook por arquivo** — `useGetProducts.ts`, nome sempre com prefixo `use`.
2. Componentes **não** chamam `services/` direto — passam pelo hook.
3. `queryKey` centralizada em `lib/queryKeys.ts` — parâmetros de filtro entram na key.
4. Mutações invalidam o cache relacionado (`queryKeys.products.all`).
5. Hook de contexto = thin wrapper; lógica pesada fica no Provider.

## Quando criar um hook novo

| Situação | Ação |
| -------- | ---- |
| Nova tela que busca dados | `useQuery` + service |
| Formulário que salva no backend | `useMutation` + invalidate |
| Lógica repetida em 2+ componentes | extrair hook utilitário |
| Estado global (tema, auth) | Context em `contexts/` + hook bridge |
