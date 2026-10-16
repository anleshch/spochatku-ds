# Spochatku DS — React + Storybook

React-компоненти дизайн-системи Spochatku UX. Джерело правди — Figma-файл `Svu5osTmwoz7tbm0Jw0q1u`.

Storybook: https://anleshch.github.io/spochatku-ds/

## Підключення на сайті

Бібліотека — пакет `@spochatku/ds`. Кожен реліз лежить на GitHub Releases як готовий архів (npm-акаунт не потрібен):

```sh
npm install https://github.com/anleshch/spochatku-ds/releases/download/v0.1.0/spochatku-ds-0.1.0.tgz
```

Потрібні `react` і `react-dom` 19; `lucide-react` встановиться разом із пакетом.

```tsx
import '@spochatku/ds/styles.css' // токени, текстові стилі, базові стилі, стилі компонентів — один раз у корені
import { Button, OfferCard, Price } from '@spochatku/ds'
```

Шрифти Golos Text і Oi підключіть у `<head>` сайту:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&family=Oi&display=swap" rel="stylesheet" />
```

Тема сторінки: `<html data-theme="beige-bg">` (без атрибута — pink-bg).

## Команди

| Команда | Що робить |
|---|---|
| `npm run storybook` | Відкриває Storybook на http://localhost:6006 |
| `npm run tokens` | Перегенеровує `src/tokens/tokens.css` з `tokens/figma-variables.json` |
| `npm run build-storybook` | Збирає статичний Storybook для публікації |
| `npm run build:lib` | Збирає бібліотеку в `dist/` (`index.js`, `styles.css`, типи) |

## Реліз нової версії

1. Підняти `version` у `package.json`, закомітити.
2. `git tag v0.2.0 && git push --tags` — GitHub Actions збере пакет і створить реліз з архівом.

## Токени

1. Змінні експортуються з Figma у `tokens/figma-variables.json` (через Claude + Figma MCP).
2. `npm run tokens` робить CSS-змінні: `color/bg/page` → `var(--color-bg-page)`.
3. Режими Figma → атрибути HTML:
   - Semantic `pink-bg` / `beige-bg` → `data-theme="beige-bg"` (за замовчуванням pink-bg)
   - Components `default` / `inverse` / `outlined` → `data-mode="inverse"` на контейнері
4. Текстові стилі → класи `.text-heading-1`, `.text-body-m`, `.text-label-m-semibold`…

Компоненти використовують тільки токени `--{component}-*`, без хардкод-значень.
