import type { HTMLAttributes, ReactNode } from 'react'
import styles from './PageIntro.module.css'

export type PageIntroProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Figma `title` — заголовок сторінки (h1). */
  title: ReactNode
  /** Figma `description` (`showDescription`). */
  description?: ReactNode
  /** Figma `action` (`showActions`): Button. На mobile — на всю ширину. */
  action?: ReactNode
}

/**
 * Перший екран сторінки без панелі (головна, Про нас).
 * ≥ 1024 px — Size=Desktop (по центру); < 1024 px — Size=Mobile (ліворуч, менші шрифти).
 */
export function PageIntro({ title, description, action, className, ...rest }: PageIntroProps) {
  return (
    <header className={[styles.intro, className].filter(Boolean).join(' ')} {...rest}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </header>
  )
}
