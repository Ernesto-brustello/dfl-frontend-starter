# DFL Frontend Starter

Template React da **DevFellowship** — ambiente configurado + exemplos funcionais de padrões de frontend moderno. Clone, rode e use como base para seus projetos ou como referência de organização de código.

## O que é

Um **starter pack** (não um app de produto) com:

- Stack pronta: Vite, React 18, TypeScript (strict), Tailwind CSS, React Router, TanStack Query, ESLint e Prettier
- **Módulos de exemplo** (código museu) demonstrando cada camada do fluxo de dados
- READMEs nas pastas explicando quando e como usar cada padrão

Ideal para quem está aprendendo React profissional ou iniciando um projeto sem perder tempo com configuração.

## Começar

```bash
git clone <url-do-repo> meu-projeto
cd meu-projeto
npm install
cp .env.example .env
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) — a home é um **hub** com links para cada exemplo.

## Exemplos incluídos

| Rota                     | O que demonstra                                   |
| ------------------------ | ------------------------------------------------- |
| `/`                      | Hub + login demo + toggle tema + avatar no header |
| `/exemplo-crud`          | CRUD com filtros, paginação, **dialog ao editar** |
| `/exemplo-lista-simples` | Lista de fornecedores sem paginação               |
| `/exemplo-estado-local`  | `useState` vs server state (React Query)          |
| `/area-restrita`         | `ProtectedRoute` + Context de autenticação        |

## Estrutura de pastas

```txt
src/
├── components/     # UI por feature (products/, suppliers/) + ui/ compartilhados
├── contexts/       # Providers (autenticação, tema)
├── hooks/          # useGet*, mutations, useState local
├── pages/          # Uma página por rota
├── services/       # Funções async puras (CRUD, sem React)
├── mappers/        # Transformação API → domínio
├── test-utils/     # Dados dummy (simulam backend)
├── types/          # Interfaces TypeScript (1 por arquivo)
├── enums/          # Opções de domínio (ex.: categorias)
├── constants/      # Config, limites, labels
└── lib/            # queryKeys, api, utils, datas
```

## Fluxo de dados (padrão do projeto)

```txt
types → enums/constants → dummy → mapper → service → queryKey → hook → componente → página
```

### Três padrões de listagem

| Padrão       | Exemplo               | Quando usar                       |
| ------------ | --------------------- | --------------------------------- |
| **Paginada** | `getProducts(params)` | Catálogos grandes, tabelas admin  |
| **Simples**  | `getSuppliers()`      | Todo, galeria, poucos itens       |
| **Completa** | `getAllProducts()`    | Selects e dropdowns no formulário |

## UX global (header e produtos)

- **Tema claro/escuro** — `ThemeProvider` + ícone no header; preferência em `localStorage`
- **Avatar** — após login, foto do usuário no header (`User.avatarUrl`)
- **Dialog** — editar produto abre modal; criar usa tela dedicada com botão **Voltar**

## Comandos úteis

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run lint         # ESLint
npm run format       # Prettier
npm run format:check # verifica formatação
npm run test         # testes (Vitest)
npx tsc --noEmit     # checagem de tipos
```

## Variáveis de ambiente

Copie `.env.example` para `.env`. Hoje os services usam dados dummy; `VITE_API_URL` está preparado para quando integrar uma API real.

**Nunca commite** arquivos `.env` com secrets.

## Como usar neste projeto

1. Explore os exemplos nas rotas do hub
2. Leia os `README.md` dentro de `src/services/`, `src/mappers/`, etc.
3. **Copie a pasta** de um módulo (ex.: `products/`) e adapte para seu domínio (Todo, galeria, livros…)
4. Os exemplos podem permanecer como referência ou ser removidos quando não precisar mais

## Convenções

Resumo das regras do projeto — detalhes nos `README.md` de cada pasta em `src/`:

- 1 componente / 1 type por arquivo
- Feature folders em `components/`
- Server state no React Query; UI state no `useState`
- Query keys centralizadas em `lib/queryKeys.ts`

## Stack

| Tecnologia       | Uso                  |
| ---------------- | -------------------- |
| Vite             | Bundler e dev server |
| React 18         | UI                   |
| TypeScript       | Tipos (strict)       |
| Tailwind CSS 3   | Estilos              |
| React Router 6   | Rotas                |
| TanStack Query 5 | Server state         |
| Vitest           | Testes               |

---

**DevFellowship** — Winter 2025
