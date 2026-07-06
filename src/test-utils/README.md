# Test utils / Dummy data

Dados **fake** que simulam o backend enquanto não existe API real. Centralizam o “banco em memória” do starter.

## Por que existem

Permite desenvolver UI, services e hooks **sem Supabase** — e trocar só a camada `services/` quando integrar a API de verdade.

## Fluxo (quem importa o quê)

```txt
test-utils/*.dummy.ts
        ↓
   services/          ← único consumidor “oficial”
        ↓
   hooks/ (React Query)
        ↓
   components/ e pages/

Exceção: AuthContext importa demoUser para o stub de login.
```

## Regras

1. Exportar constantes nomeadas (`productsApiData`, `suppliersData`, `demoUser`).
2. Tipar com interfaces de `src/types/`.
3. **Não** importar dummy direto em páginas ou componentes — só via `services/`.
   Exceção documentada: `AuthContext` usa `demoUser`.

## Dois formatos de dummy

| Arquivo | Formato | Motivo |
| ------- | ------- | ------ |
| `products.dummy.ts` | **API** (snake_case) | Simula payload real → passa pelo `mapper/` |
| `suppliers.dummy.ts` | **Domínio** (camelCase) | Lista simples; payload já igual ao type `Supplier` |

## Usuário demo

`user.dummy.ts` — `demoUser` com `avatarUrl` (`/avatars/demo-user.jpg` em `public/`). Referência para testes e auth stub.

## Futuro (API real)

Apagar ou arquivar os `.dummy.ts` e fazer os services chamarem `lib/api.ts`. Hooks e componentes **não mudam**.
