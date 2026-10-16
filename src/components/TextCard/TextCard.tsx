import type { HTMLAttributes, ReactNode } from 'react'
import styles from './TextCard.module.css'

export type TextCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Figma `title` — заголовок Oi. */
  title: ReactNode
  /** Figma `text`. */
  children: ReactNode
}

/**
 * Картка з короткою тезою (Місія, Візія, цінності).
 * ≥ 1024 px — Size=Desktop; < 1024 px — Size=Mobile (менші padding і шрифти).
 */
export function TextCard({ title, children, className, ...rest }: TextCardProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')} {...rest}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{children}</p>
    </article>
  )
}
