import type { Meta, StoryObj } from '@storybook/react-vite'
import tokens from '../../tokens/figma-variables.json'
import styles from './Foundations.module.css'

const cssVar = (name: string) => `var(--${name.replaceAll('/', '-')})`
const stripBraces = (alias: string) => alias.replace(/^\{|\}$/g, '')

const primitiveColors = Object.entries(tokens.Primitives).filter(([name]) => name.startsWith('color/'))
const semanticColors = Object.entries(tokens.Semantic)

const groupBy = <T,>(items: [string, T][], depth: number) =>
  items.reduce<Record<string, [string, T][]>>((groups, item) => {
    const key = item[0].split('/').slice(0, depth).join('/')
    ;(groups[key] ??= []).push(item)
    return groups
  }, {})

function Swatch({ name, caption }: { name: string; caption: string }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.chip}>
        <div className={styles.fill} style={{ background: cssVar(name) }} />
      </div>
      <div className="text-body-s-medium">{name}</div>
      <div className={`text-body-s ${styles.caption}`}>{caption}</div>
    </div>
  )
}

function Colors() {
  return (
    <div className={styles.page}>
      <h1 className="text-heading-2">Colors</h1>

      <h2 className="text-heading-4">Semantic</h2>
      <p className={`text-body-s ${styles.caption}`}>Значення залежать від теми: перемикач «Тема» на панелі зверху.</p>
      {Object.entries(groupBy(semanticColors, 2)).map(([group, items]) => (
        <section key={group}>
          <h3 className="text-heading-5">{group}</h3>
          <div className={styles.grid}>
            {items.map(([name, modes]) => (
              <Swatch
                key={name}
                name={name}
                caption={Object.entries(modes).map(([mode, alias]) => `${mode}: ${stripBraces(alias)}`).join('\n')}
              />
            ))}
          </div>
        </section>
      ))}

      <h2 className="text-heading-4">Primitives</h2>
      {Object.entries(groupBy(primitiveColors, 2)).map(([group, items]) => (
        <section key={group}>
          <h3 className="text-heading-5">{group}</h3>
          <div className={styles.grid}>
            {items.map(([name, value]) => (
              <Swatch key={name} name={name} caption={String(value)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Typography() {
  return (
    <div className={styles.page}>
      <h1 className="text-heading-2">Typography</h1>
      {Object.entries(tokens.textStyles).map(([name, style]) => (
        <div key={name} className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <div className="text-body-s-medium">{name}</div>
            <div className={`text-body-s ${styles.caption}`}>
              {[style.fontFamily, style.fontStyle, style.fontSize, style.lineHeight]
                .map((v) => v.split('/').pop())
                .join(' · ')}
            </div>
            <code className={styles.caption}>.text-{name.replaceAll('/', '-')}</code>
          </div>
          <div className={`text-${name.replaceAll('/', '-')}`}>Спочатку UX — дизайн із самого початку</div>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
}
export default meta

export const ColorTokens: StoryObj = { name: 'Colors', render: () => <Colors /> }
export const TypographyStyles: StoryObj = { name: 'Typography', render: () => <Typography /> }
