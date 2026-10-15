import type { HTMLAttributes, ReactNode } from 'react'
import { Photo } from '../Photo/Photo'
import { Tag } from '../Tag/Tag'
import styles from './PodcastCard.module.css'

export type PodcastCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** Опис; переноси рядків (\n) зберігаються — для списку тем. */
  description: ReactNode
  coverSrc: string
  coverAlt?: string
  /** Дата епізоду (Tag outlined). Без date і duration рядка тегів немає (Figma `showMeta`). */
  date?: ReactNode
  duration?: ReactNode
  /** Кнопки платформ: Button appearance="inverse", 1–3 штуки. */
  actions: ReactNode
}

/**
 * Картка епізоду подкасту.
 * ≥ 1024 px — горизонтально (обкладинка 320 зліва); < 1024 px — вертикально, Tag S, кнопки на всю ширину.
 */
export function PodcastCard({
  title,
  description,
  coverSrc,
  coverAlt = '',
  date,
  duration,
  actions,
  className,
  ...rest
}: PodcastCardProps) {
  const tags = (size: 'm' | 's') =>
    [date, duration].filter(Boolean).map((t, i) => (
      <Tag key={i} size={size} appearance="outlined">
        {t}
      </Tag>
    ))

  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')} {...rest}>
      <Photo src={coverSrc} alt={coverAlt} shape="rounded" className={styles.cover} />
      <div className={styles.details}>
        {(date || duration) && (
          <div className={styles.meta}>
            <span className={styles.desktopOnly}>{tags('m')}</span>
            <span className={styles.mobileOnly}>{tags('s')}</span>
          </div>
        )}
        <h3 className={`text-heading-4 ${styles.title}`}>{title}</h3>
        <p className={`text-body-s ${styles.description}`}>{description}</p>
        <div className={styles.actions}>{actions}</div>
      </div>
    </article>
  )
}
