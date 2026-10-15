# Spochatku DS — React + Storybook

React-компоненти дизайн-системи Spochatku UX. Джерело правди — Figma-файл `Svu5osTmwoz7tbm0Jw0q1u`.

## Команди

| Команда | Що робить |
|---|---|
| `npm run storybook` | Відкриває Storybook на http://localhost:6006 |
| `npm run tokens` | Перегенеровує `src/tokens/tokens.css` з `tokens/figma-variables.json` |
| `npm run build-storybook` | Збирає статичний Storybook для публікації |

## Токени

1. Змінні експортуються з Figma у `tokens/figma-variables.json` (через Claude + Figma MCP).
2. `npm run tokens` робить CSS-змінні: `color/bg/page` → `var(--color-bg-page)`.
3. Режими Figma → атрибути HTML:
   - Semantic `pink-bg` / `beige-bg` → `data-theme="beige-bg"` (за замовчуванням pink-bg)
   - Components `default` / `inverse` / `outlined` → `data-mode="inverse"` на контейнері
4. Текстові стилі → класи `.text-heading-1`, `.text-body-m`, `.text-label-m-semibold`…

Компоненти використовують тільки токени `--{component}-*`, без хардкод-значень.
