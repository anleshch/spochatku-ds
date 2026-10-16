import type { HTMLAttributes, ReactNode } from 'react'
import { Asterisk } from 'lucide-react'
import { Eyes } from '../Eyes/Eyes'
import styles from './Price.module.css'

export type PriceAlign = 'center' | 'right' | 'responsive'
/** Figma `State`: Default | Early bird | Unavailable. */
export type PriceState = 'default' | 'early-bird' | 'unavailable'

export type PriceProps = HTMLAttributes<HTMLDivElement> & {
  /** Основна ціна, наприклад «600$». В early-bird показується закресленою. */
  price?: ReactNode
  /** Друга ціна під основною (зазвичай у гривнях). Не передали — рядка немає. */
  secondaryPrice?: ReactNode
  /** Center — у NavBar; Right — в OfferCard; responsive — Right ≥ 1024 px, Center нижче (CourseHero). */
  align?: PriceAlign
  state?: PriceState
  /** early-bird: ціна зі знижкою, наприклад «510$». */
  discountedPrice?: ReactNode
  /** early-bird: умова знижки (із зірочкою); unavailable: пояснення під очима. */
  note?: ReactNode
}

/** Ціна з другою ціною під нею. Ширина задається контейнером, тексти переносяться. */
export function Price({
  price,
  secondaryPrice,
  align = 'center',
  state = 'default',
  discountedPrice,
  note,
  className,
  ...rest
}: PriceProps) {
  const classes = [styles.price, align === 'right' && styles.right, align === 'responsive' && styles.responsive, className].filter(Boolean).join(' ')

  if (state === 'unavailable') {
    return (
      <div className={classes} {...rest}>
        <Eyes />
        {note && <span className="text-body-m">{note}</span>}
      </div>
    )
  }

  return (
    <div className={classes} {...rest}>
      {state === 'early-bird' ? (
        <span className={`text-heading-4 ${styles.row}`}>
          <s className={styles.old}>{price}</s>
          <span className={styles.discounted}>{discountedPrice}</span>
        </span>
      ) : (
        <span className="text-heading-4">{price}</span>
      )}
      {secondaryPrice && <span className="text-body-s">{secondaryPrice}</span>}
      {state === 'early-bird' && note && (
        <span className={`text-body-s ${styles.row} ${styles.note}`}>
          <Asterisk className={styles.noteIcon} aria-hidden="true" />
          {note}
        </span>
      )}
    </div>
  )
}
