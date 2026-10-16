import type { HTMLAttributes, ReactNode } from 'react'
import styles from './PromoCard.module.css'

/** Figma `Appearance` → mode колекції Components (data-mode). Outlined — рамка 4. */
export type PromoCardAppearance = 'default' | 'outlined'

export type PromoCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Figma `title`. */
  title: ReactNode
  /** Figma `description` (`showDescription`). */
  description?: ReactNode
  appearance?: PromoCardAppearance
  /** URL ілюстрації (Figma `illustration`, image fill). Без неї — порожнє тло `color/bg/subtle`. */
  illustration?: string
  illustrationAlt?: string
  /** Button size="s" appearance="inverse". На mobile — на всю ширину. */
  action?: ReactNode
}

/**
 * Картка пропозиції Alumni club: ілюстрація, заголовок, опис і кнопка.
 * ≥ 1024 px — Size=Desktop (ілюстрація ліворуч); < 1024 px — Size=Mobile (ілюстрація зверху).
 */
export function PromoCard({
  title,
  description,
  appearance = 'default',
  illustration,
  illustrationAlt = '',
  action,
  className,
  ...rest
}: PromoCardProps) {
  return (
    <article data-mode={appearance} className={[styles.card, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.illustration}>
        {illustration && <img src={illustration} alt={illustrationAlt} />}
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={`text-body-s-medium ${styles.description}`}>{description}</p>}
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </article>
  )
}
