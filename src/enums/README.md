# Enums

Conjuntos **fechados de opções de domínio** — valores que um campo da entidade pode assumir. Representam **regras de negócio**, não configuração da app.

## Quando usar

- Categoria de produto, status de pedido, tipo de usuário
- Quando o campo só pode ser **um de N valores conhecidos**
- Quando você quer autocomplete e type-safety no TypeScript

## Padrão DFL

Objeto `as const` + type union — preferido ao `enum` nativo do TypeScript (melhor tree-shaking, sem surpresas em runtime):

```ts
export const ProductCategory = {
  ELECTRONICS: "electronics",
  CLOTHING: "clothing",
  // ...
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];
```

## Onde entram no fluxo

```txt
enums/  →  types/ (campo category: ProductCategory)
       →  components/ (select, filtro, badge)
       →  services/ (validação / filtro no dummy)
```

**Labels para UI** (texto que o usuário vê) ficam em `constants/` — ex.: `PRODUCT_CATEGORY_LABELS` mapeia `electronics` → `"Eletrônicos"`.

## Exemplo neste projeto

`product-category.enum.ts` — usado em:

- type `Product` (`category`)
- filtro da listagem (`ProductFilters`)
- formulário de criar/editar produto

## Regras

1. Valores em **inglês** no código (`electronics`); labels em PT-BR nos `constants/`.
2. **Não** misturar config da app (page size, debounce) — isso é `constants/`.
3. Exportar array auxiliar quando precisar iterar: `PRODUCT_CATEGORIES = Object.values(ProductCategory)`.
