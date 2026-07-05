# Mappers

Transformam dados da **fronteira externa** (API, DB, webhook) para o **tipo de domínio** que a UI entende — e vice-versa no envio.

## Por que existem

APIs reais raramente batem 1:1 com os types do frontend:

- `product_name` vs `name`
- `price_cents` (string) vs `price` (number)
- `created_at` vs `createdAt`

O mapper **isola** essa diferença. Quando o contrato da API mudar, você edita um arquivo — não dezenas de componentes.

## Fluxo

```txt
API (snake_case)  →  mapApiProductToProduct()  →  Product (domínio)
                                                      ↓
                                                 components/hooks

Product (form)  →  mapProductToApiProduct()  →  payload para POST/PATCH
```

## Quando usar

- Payload vem em formato diferente do type de domínio
- Precisa converter tipos (string → number, centavos → reais)
- Integração futura com Supabase ou REST

## Quando NÃO usar

- Dummy **já** no formato de domínio — ex.: `suppliers.dummy.ts` neste starter
- Campo 1:1 sem conversão — mapper seria boilerplate desnecessário

## Exemplo neste projeto

`product.mapper.ts`:

| API (`ApiProduct`) | Domínio (`Product`) |
| ------------------ | ------------------- |
| `product_name` | `name` |
| `price_cents` | `price` (÷ 100) |
| `stock_quantity` | `stock` |
| `supplier_id` | `supplierId` |
| `created_at` | `createdAt` |

Funções: `mapApiProductToProduct`, `mapProductToApiProduct`, `mapCreateDtoToApiProduct`.

## Regras

1. Funções **puras** — entrada → saída, sem side effects.
2. Tipos de API em `types/api-*.types.ts`; domínio em `types/*.types.ts`.
3. Service chama o mapper; componente **nunca** mapeia payload manualmente.
