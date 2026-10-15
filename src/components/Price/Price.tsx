import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Price.module.css'

export type PriceAlign = 'center' | 'right'

export type PriceProps = HTMLAttributes<HTMLDivElement> & {
  /** Основна ціна, наприклад «600$». */
  price: ReactNode
  /** Друга ціна під основною (зазвичай у гривнях). Figma `showSecondaryPrice` = передано чи ні. */
  secondaryPrice?: ReactNode
  /** Center — у NavBar; Right — в OfferCard. */
  align?: PriceAlign
}

/** Ціна з другою ціною під нею. Ширина задається контейнером, тексти переносяться. */
export function Price({ price, secondaryPrice, align = 'center', className, ...rest }: PriceProps) {
  return (
    <div className={[styles.price, align === 'right' && styles.right, className].filter(Boolean).join(' ')} {...rest}>
      <span className="text-heading-4">{price}</span>
      {secondaryPrice && <span className="text-body-s">{secondaryPrice}</span>}
    </div>
  )
}
