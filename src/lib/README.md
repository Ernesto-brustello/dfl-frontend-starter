# lib

Infraestrutura **compartilhada** — sem React, sem domínio de negócio. Funções e clientes usados por services, componentes e hooks.

## Arquivos neste projeto

| Arquivo | Função |
| ------- | ------ |
| `api.ts` | Cliente HTTP (`get`, `post`, `patch`, `delete`) — pronto para quando os services saírem do dummy |
| `queryKeys.ts` | Fábrica de chaves do React Query — parâmetros de filtro entram na key |
| `date.utils.ts` | `formatDate` / `formatDateTime` — exibição de datas ISO na UI |
| `utils.ts` | `cn()` — merge de classes Tailwind (`clsx` + `tailwind-merge`) |

## Fluxo

```txt
services/  →  api.ts (futuro)
hooks/     →  queryKeys.ts
components/ →  date.utils.ts, cn()
```

## Regras

1. **Sem JSX** — se precisar de React, não é `lib/`.
2. **Sem tipos de domínio** — types ficam em `types/`.
3. `queryKeys` é a **única** fonte de truth para cache keys de cada recurso.
4. Datas na UI sempre via `formatDate` — nunca `new Date()` espalhado em componentes.

## Futuro (API real)

Trocar implementação dos `services/` para usar `api.get/post/...`. `queryKeys` e hooks permanecem iguais.
