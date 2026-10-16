import type { HTMLAttributes, ReactNode } from 'react'
import styles from './PageHero.module.css'

export type PageHeroProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Figma `title` — заголовок сторінки (h1). */
  title: ReactNode
  /** Figma `description`. */
  description?: ReactNode
  /** Figma `showPeople`: кілька `<Person>` (ведучі). */
  people?: ReactNode
}

/**
 * Перший екран сторінки в білій панелі із заокругленим низом (Podcast).
 * ≥ 1024 px — Size=Desktop (текст ліворуч, люди праворуч);
 * < 1024 px — Size=Mobile (люди зверху, текст по центру).
 */
export function PageHero({ title, description, people, className, ...rest }: PageHeroProps) {
  return (
    <header className={[styles.hero, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.titles}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {people && <div className={styles.people}>{people}</div>}
    </header>
  )
}
