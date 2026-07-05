# Contexts

Estado **global da aplicação** compartilhado entre várias rotas ou componentes — sem passar props manualmente em cada nível.

## Quando usar

| Situação | Onde colocar |
| -------- | ------------ |
| Dado de **uma tela** ou **um formulário** | `useState` no componente ou página |
| Dado de **servidor** (lista, detalhe, CRUD) | React Query + `hooks/` + `services/` |
| Preferência ou sessão **global** (tema, usuário logado) | `contexts/` |

## O que é `createContext`

API do React para **injetar um valor** na árvore de componentes:

```txt
createContext          → cria o "canal" de dados
    ↓
XxxProvider            → guarda o estado e expõe via .Provider
    ↓
useXxxContext()        → lê o valor (só funciona dentro do Provider)
```

Cada arquivo segue o mesmo desenho:

1. **`createContext<T | null>(null)`** — tipo do valor compartilhado
2. **`XxxProvider`** — `useState` / efeitos / funções; monta o `value` com `useMemo`
3. **`useXxxContext()`** — `useContext` + validação (erro se usado fora do Provider)

## Context + hook (`hooks/`)

Nos componentes, prefira importar de `hooks/` — não de `contexts/` direto:

```txt
contexts/AuthContext.tsx  →  AuthProvider, useAuthContext
hooks/useAuth.ts          →  useAuth() (reexporta useAuthContext)
```

Isso deixa a UI desacoplada: amanhã o auth pode vir de Supabase sem mudar quem chama `useAuth()`.

## Exemplos neste projeto

| Context | O que guarda | Provider em |
| ------- | ------------ | ----------- |
| `AuthContext` | usuário logado, `signIn`, `signOut` | `App.tsx` |
| `ThemeContext` | tema claro/escuro, persistência | `App.tsx` |

Ordem dos providers em `App.tsx`:

```txt
QueryClientProvider → ThemeProvider → AuthProvider → Router
```

## Regras

1. **Um contexto por arquivo** — `AuthContext.tsx`, `ThemeContext.tsx`.
2. **Provider perto da raiz** — em geral só em `App.tsx` (ou layout raiz).
3. **Não** colocar fetch de API aqui — use React Query; Context guarda **estado de sessão/UI**.
4. **Tipar o value** — interface `XxxContextValue` exportada ou interna ao arquivo.
5. Componentes importam **`useAuth()` / `useTheme()`**, não o Context bruto.

## Futuro (Supabase)

Trocar a implementação **dentro** de `AuthContext` (login real, token, listener de sessão). Páginas, `ProtectedRoute` e quem usa `useAuth()` permanecem iguais.
