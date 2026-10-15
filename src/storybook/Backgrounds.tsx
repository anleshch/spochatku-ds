import type { ReactNode } from 'react'

const panels = [
  { label: 'pink-bg', attrs: { 'data-theme': 'pink-bg' } },
  { label: 'beige-bg', attrs: { 'data-theme': 'beige-bg' } },
  { label: 'inverse (bg/inverse)', attrs: { 'data-mode': 'inverse' }, dark: true },
]

/** Story helper: renders the same content on pink, beige and inverse backgrounds, like the Figma docs sections. */
export function Backgrounds({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, width: 'min(1100px, 90vw)' }}>
      {panels.map((p) => (
        <div
          key={p.label}
          {...p.attrs}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 24,
            background: p.dark ? 'var(--color-bg-inverse)' : 'var(--color-bg-page)',
            color: p.dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
          }}
        >
          <span className="text-body-s-medium">{p.label}</span>
          {children}
        </div>
      ))}
    </div>
  )
}
