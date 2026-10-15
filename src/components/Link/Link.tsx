import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './Link.module.css'

export type LinkTone = 'default' | 'subtle'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Figma `label`. */
  children: ReactNode
  /** Default — основний колір тексту; Subtle — приглушений (юридичні лінки). */
  tone?: LinkTone
  /** Посилання без href, яке не можна натиснути (Figma State=Disabled). */
  disabled?: boolean
}

/**
 * Текстове посилання (футер, юридичні лінки).
 * Не має власного appearance: на темному фоні поставте контейнеру data-mode="inverse".
 */
export function Link({ children, tone = 'default', disabled = false, href, className, ...rest }: LinkProps) {
  const classes = [styles.link, tone === 'subtle' && styles.subtle, 'text-body-s-medium', className]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      className={classes}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      role={disabled ? 'link' : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}
