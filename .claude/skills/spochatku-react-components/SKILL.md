---
name: spochatku-react-components
description: Перенесення компонентів ДС Spochatku UX з Figma у React-бібліотеку (CSS Modules + CSS-змінні) і Storybook у цьому репозиторії. Використовуй, коли треба створити, оновити або перевірити React-компонент Spochatku, додати токени з Figma в код, написати stories чи опублікувати зміни.
---

# React-компоненти Spochatku UX

Код-пара до Figma-скілу `spochatku-ds-components`. Анна — дизайнерка, увесь код пише Claude, відповіді — українською.

- Figma ДС: https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u (fileKey `Svu5osTmwoz7tbm0Jw0q1u`)
- Репозиторій: https://github.com/anleshch/spochatku-ds (гілка `main`)
- Storybook: https://anleshch.github.io/spochatku-ds/ (деплоїться GitHub Actions на кожен push у `main`)

## Принципи

1. **Figma — джерело правди.** Код повторює архітектуру Figma 1:1: ті самі назви компонентів (PascalCase), пропсів (camelCase = Figma component properties) і токенів. Якщо у Figma щось недороблене або суперечливе (хардкод, незв'язаний колір, зламаний варіант) — не вигадуй у коді, а покажи Анні й запропонуй спершу виправити Figma.
2. **Нуль хардкоду.** Кольори, відступи, gap, radius, border-width, шрифти — лише `var(--…)` з `src/tokens/tokens.css`. Виняток — розміри, яких Figma не токенізує (іконка 24, icon-slot 30 тощо): хардкод зі значенням з Figma і коментарем.
3. **Атомарність.** Складніший компонент збирається з наявних (`<Price>`, `<Button>`, `<Sticker>`…), а не копіює їхню розмітку чи стилі.
4. **Нативний HTML і доступність.** Кнопка — `<button>`, посилання — `<a>`, заголовки — `h2/h3`, списки — `ul/li`. WCAG 2.2 AA.

## Стек і структура

- Vite + React 19 + TypeScript, Storybook 10 (addons: a11y, docs, vitest, `storybook-addon-pseudo-states`), іконки `lucide-react`.
- Компонент: `src/components/{Name}/{Name}.tsx`, `{Name}.module.css`, `{Name}.stories.tsx`. Пов'язані дрібні компоненти живуть разом (`Tab` + `TabBar` у `Tab/`).
- Кожен компонент і його типи експортуються з `src/components/index.ts`.
- Пакет `@spochatku/ds`: вхід `src/lib.ts` (index.css + усі експорти), збірка `vite.lib.config.ts` → `dist/index.js`, `dist/styles.css`, типи з `tsconfig.lib.json`. React — peer dependency, `lucide-react` — dependency.
- Хелпери для stories: `src/storybook/Backgrounds.tsx` (pink / beige / inverse панелі), `src/storybook/placeholder-photo.svg`.
- Шрифти Golos Text і Oi — Google Fonts (`index.html`, `.storybook/preview-head.html`).

## Токени

- `tokens/figma-variables.json` — експорт змінних Figma. Руками не редагувати: експортувати з Figma через `use_figma` (Components > 20 KB — ділити на два виклики), потім `npm run tokens` → `src/tokens/tokens.css` (згенерований, не редагувати).
- Формати в JSON: `Primitives` — значення; `Semantic` — `{ "pink-bg": "{alias}", "beige-bg": "{alias}" }`; `Components` — один alias або масив `[default, inverse, outlined]`; `textStyles` — поля на typography-primitives.
- CSS-імена: `button/hover/bg-color` → `--button-hover-bg-color`.
- Modes: Semantic `pink-bg` (за замовчуванням) / `beige-bg` → `[data-theme="beige-bg"]`; Components `default | inverse | outlined` → `[data-mode="…"]`.
- Text styles → класи `.text-heading-1`, `.text-body-s-medium`, `.text-label-m`… Якщо стиль змінюється з розміром екрана — задавай `font:` із тих самих typography-токенів і підпиши коментарем, який це стиль (`/* heading/3 */`).
- Нового токена в коді не вигадуй: його спершу створюють у Figma (Figma-скіл), потім реекспорт.

## Конвенції компонентів

**Пропси**
- Тип пропсів розширює нативні атрибути кореневого елемента (`Omit<HTMLAttributes<HTMLElement>, 'title'> & {…}`), `className` і `...rest` прокидаються на корінь.
- Figma `Appearance` → проп `appearance` → `data-mode={appearance}` на корені. Компонент без Appearance у Figma `data-mode` не ставить і успадковує режим від контейнера.
- Текст — `children` або іменовані `ReactNode`-пропси. Організми приймають слоти (`price`, `action`, `iconAction`, `children`), а не дублюють пропси дочірніх компонентів.
- Варіанти, що змінюють структуру — union-тип (`status: 'available' | 'unavailable'`, `state: 'default' | 'early-bird' | 'unavailable'`).
- IconOnly-варіант: discriminated union з обов'язковим `aria-label`.
- Інтерактивні компоненти, яким потрібен ref, приймають `ref` як проп (React 19).
- Коментарі JSDoc — коротко українською, з відповідністю Figma (`Figma Variant=IconOnly`).

**Стани** — лише нативні псевдокласи, не пропси: `:hover`, `:active` (Pressed), `:focus-visible` (Focus), `:disabled`. Для складних — `:has()`.
- Вимкнене посилання: `aria-disabled="true"` і без `href`.
- Focus ring — видимий, через focus-ring-токени (offset shadow + ring shadow), `outline: none`.

**Обведення**
- Figma stroke INSIDE і не в layout → `box-shadow: inset 0 0 0 var(--_border-width) var(--_border-color)`, щоб hover/pressed не змінювали розмір. Стани міняють лише приватні змінні `--_border-*`.
- Stroke, включений у layout → справжній `border`.
- Підкреслення знизу (bottom stroke) → зовнішній box-shadow без зсуву layout.

**CSS**
- CSS Modules, класи camelCase. Приватні змінні компонента — з префіксом `--_`.
- На початку `.module.css` — коментар з Figma node id і нетривіальними рішеннями.
- Довгий текст: поведінка як у Figma (truncation `text-overflow: ellipsis` або перенос), `min-width: 0` у flex.
- Іконки — `currentColor`, розмір задається через `:where(svg)`; колір — `{component}-icon-color`.

**Адаптив** — один компонент на обидва розміри. Figma `Size=Desktop` — за замовчуванням, `Size=Mobile` — `@media (max-width: 1023.98px)` (брейкпойнт 1024). Ніяких `size`-пропсів для Desktop/Mobile.

## Stories

- `title`: `Components/{Name}` для атомів і молекул, `Organisms/{Name}` для організмів.
- `parameters.design` — посилання на Figma-вузол: `https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=…`.
- Набір: Default + по story на кожен варіант / appearance; «Long … (truncates)» стрес-тест; матриця «All states» (appearance × Default/Hover/Pressed/Focus/Disabled), де стани примусово вмикаються через `parameters.pseudo` з id елементів (див. `Button.stories.tsx`).
- Компоненти, що залежать від фону, показуються в `<Backgrounds>`.
- Mobile-stories: `globals: { viewport: { value: 'mobile2' } }` (414 px).
- Тема сторінки перемикається тулбаром «Тема» (pink / beige) — у stories її не хардкодь.

## Workflow

1. **Figma.** Завантаж `figma:figma-design-to-code`, потім `get_design_context` + скріншот вузла. Збери: варіанти, properties, прив'язані токени, розміри, стани. Перевір, що всі потрібні токени вже є в `tokens.css`; якщо ні — реекспорт або спершу виправлення у Figma (з погодження Анни).
2. **Код.** `.tsx` + `.module.css` за конвенціями вище, перевикористовуючи наявні компоненти. Додай експорт в `index.ts`.
3. **Stories** за розділом вище.
4. **Перевірка.**
   - `npx tsc -b` і `npm run lint` без помилок.
   - Storybook (`npm run storybook`, порт 6006): порівняй з Figma-скріншотом розміри (через `getBoundingClientRect` у javascript_tool), кольори, стани, обидві теми, mobile.
   - Кліки Claude in Chrome не доходять до iframe Storybook — взаємодії перевіряй через `element.click()` у javascript_tool. Після нових файлів stories вкладку треба перезавантажити.
   - a11y-панель без порушень.
5. **Коміт і push.** Один перевірений компонент — один коміт (`Add {Name}` / `Fix {Name} …`), одразу `git push`. Повідомлення закінчується рядком `Co-Authored-By` з поточної інструкції щодо атрибуції. Після push Storybook на GitHub Pages оновиться сам (~1 хв); перевір `gh run list --limit 1`.
6. **Реліз для сайту** (коли зміни потрібні на сайті, а не після кожного компонента): підняти `version` у `package.json` (semver: новий компонент — minor, виправлення — patch, ламаюча зміна пропсів — major), коміт, `git tag vX.Y.Z && git push --tags`. Workflow `release.yml` збере `npm run build:lib` і створить GitHub Release з архівом `spochatku-ds-X.Y.Z.tgz`; сайт оновлюється, змінивши URL архіву. Новий компонент має бути в `src/components/index.ts`, інакше він не потрапить у пакет.
7. **Звіт Анні** — коротко, простою мовою: що зроблено, посилання на story, що лишилося відкритим (зокрема розбіжності з Figma).

## Заборони

- Не редагувати `src/tokens/tokens.css` і `tokens/figma-variables.json` руками.
- Не хардкодити кольори й відступи, не додавати токени, яких немає у Figma.
- Не робити стани пропсами (`hover`, `focused`), не робити Desktop/Mobile пропсом.
- Не копіювати розмітку наявного компонента замість його використання.
- Не змінювати Figma без погодження Анни.
