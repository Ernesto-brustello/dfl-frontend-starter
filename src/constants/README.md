# Constants

Valores **fixos de configuração** — limites, defaults, delays, labels de UI. Não mudam conforme o usuário preenche um formulário; definem **como a app se comporta**.

## Quando usar

| Situação | Exemplo neste repo |
| -------- | ------------------ |
| Limite ou default numérico | `DEFAULT_PAGE_SIZE`, `PAGE_SIZE_OPTIONS` |
| Tempo de espera / debounce | `SIMULATED_API_DELAY_MS`, `SEARCH_DEBOUNCE_MS` |
| Chave de `localStorage` | `THEME_STORAGE_KEY` |
| Texto de exibição derivado de enum | `PRODUCT_CATEGORY_LABELS` |

## Diferença de `enums/`

| Pergunta | Pasta |
| -------- | ----- |
| É opção de um **campo** da entidade? | `enums/` |
| É **configuração** da aplicação? | `constants/` |

**Exemplo prático:** `ProductCategory.ELECTRONICS` (valor salvo no banco) fica em `enums/`; o texto `"Eletrônicos"` no select fica em `constants/`.

## Onde entram no fluxo

```txt
constants/  →  services/ (delay, pageSize)
           →  hooks/ (debounce ms)
           →  components/ (labels, opções de filtro)
           →  contexts/ (chave de storage)
```

Constants **não** fazem fetch nem guardam estado — só exportam valores importáveis.

## Exemplos neste projeto

| Arquivo | O que exporta |
| ------- | ------------- |
| `pagination.constants.ts` | tamanho padrão e opções de página |
| `app.constants.ts` | delay simulado da API, debounce da busca |
| `product-category.constants.ts` | labels PT-BR e opções do filtro |
| `theme.constants.ts` | chave do tema no `localStorage` |

## Regras

1. **Um tema por arquivo** — `pagination.constants.ts`, não um arquivo genérico `misc.ts`.
2. **`index.ts`** reexporta o barrel — importe de `@/constants`.
3. Se o valor for opção de **campo de negócio**, provavelmente pertence a `enums/`, não aqui.
