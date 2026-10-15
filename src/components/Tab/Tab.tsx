import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import styles from './Tab.module.css'

/** Figma `Type`: Default (білий) | CTA (темний, mode inverse) — головна дія, останній у TabBar. */
export type TabType = 'default' | 'cta'

export type TabProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
  /** Figma `label`. */
  children: ReactNode
  type?: TabType
  /** Пункт, який не можна натиснути (Figma State=Disabled). */
  disabled?: boolean
}

/** Пункт навігації. */
export function Tab({ children, type = 'default', disabled = false, href, className, ...rest }: TabProps) {
  return (
    <a
      data-mode={type === 'cta' ? 'inverse' : 'default'}
      className={[styles.tab, className].filter(Boolean).join(' ')}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      role={disabled ? 'link' : undefined}
      {...rest}
    >
      <span className={`text-label-m ${styles.label}`}>{children}</span>
    </a>
  )
}

export type TabBarProps = HTMLAttributes<HTMLElement> & {
  /** Інстанси Tab; останній зазвичай type="cta". */
  children: ReactNode
}

/** Горизонтальна навігація з Tab-ів. Використовується в Header Size=Desktop. */
export function TabBar({ children, className, ...rest }: TabBarProps) {
  return (
    <nav className={[styles.tabBar, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </nav>
  )
}
