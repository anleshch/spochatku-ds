import type { HTMLAttributes, ReactNode } from 'react'
import { Eyes } from '../Eyes/Eyes'
import { Sticker } from '../Sticker/Sticker'
import styles from './OfferCard.module.css'

export type OfferCardStatus = 'available' | 'unavailable'

export type OfferCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** available — ціна й кнопки; unavailable — приглушений текст, «очі» і примітка. */
  status?: OfferCardStatus
  date?: ReactNode
  format?: ReactNode
  description?: ReactNode
  /** available: Price align="right". */
  price?: ReactNode
  /** available: Button appearance="inverse" на всю ширину. */
  action?: ReactNode
  /** available: IconOnly-кнопка поруч. */
  iconAction?: ReactNode
  /** unavailable: пояснення поруч з «очима». */
  note?: ReactNode
  /** Текст наліпки в нижньому лівому куті (Sticker L inverse, нахил 13°). */
  sticker?: ReactNode
}

/**
 * Картка пропозиції (майстерклас, курс, консультація).
 * ≥ 1024 px — Size=Desktop; < 1024 px — Size=Mobile (менші відступи й шрифти).
 */
export function OfferCard({
  title,
  status = 'available',
  date,
  format,
  description,
  price,
  action,
  iconAction,
  note,
  sticker,
  className,
  ...rest
}: OfferCardProps) {
  const unavailable = status === 'unavailable'
  return (
    <article
      className={[styles.card, unavailable && styles.unavailable, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className={styles.content}>
        {(date || format) && (
          <p className={styles.meta}>
            {date && <span>{date}</span>}
            {format && <span>{format}</span>}
          </p>
        )}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {unavailable ? (
        note && (
          <p className={styles.note}>
            <Eyes />
            <span>{note}</span>
          </p>
        )
      ) : (
        <>
          {price && <div className={styles.price}>{price}</div>}
          {action && (
            <div className={styles.actions}>
              {action}
              {iconAction}
            </div>
          )}
        </>
      )}
      {sticker && (
        <Sticker size="l" appearance="inverse" rotate={13} className={styles.sticker}>
          {sticker}
        </Sticker>
      )}
    </article>
  )
}
