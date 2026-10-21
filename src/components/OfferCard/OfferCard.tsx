import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import { Eyes } from '../Eyes/Eyes'
import { Sticker } from '../Sticker/Sticker'
import { Tag } from '../Tag/Tag'
import styles from './OfferCard.module.css'

export type OfferCardStatus = 'available' | 'unavailable'
export type OfferCardSize = 'default' | 'compact'

export type OfferCardProps = Omit<AnchorHTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** available — ціна, кнопка і стани; unavailable — приглушений текст, «очі» і примітка. */
  status?: OfferCardStatus
  /**
   * default — Figma Size=Desktop / Mobile (за шириною екрана);
   * compact — Size=Compact для сітки в 3 колонки на desktop (на mobile — як default).
   */
  size?: OfferCardSize
  /** available: уся картка — посилання `<a href>`. */
  href?: string
  /** Короткі факти (дата, формат) — Tag outlined, на mobile — S (Figma tag-1, tag-2). */
  tags?: ReactNode[]
  description?: ReactNode
  /** available: Price align="right", поруч із наліпкою. */
  price?: ReactNode
  /**
   * available: текст кнопки на всю ширину (Figma `action`, Button inverse).
   * Кнопка лише візуальна: клікабельна вся картка.
   */
  actionLabel?: ReactNode
  /** Вигляд кнопки (Figma exposed instance `action`): outlined — запис ще недоступний. */
  actionAppearance?: 'inverse' | 'outlined'
  /** unavailable: пояснення поруч з «очима». */
  note?: ReactNode
  /** Текст наліпки (Sticker M inverse з нахилом) зліва від ціни або примітки. */
  sticker?: ReactNode
}

/**
 * Картка пропозиції (майстерклас, курс, консультація).
 * ≥ 1024 px — Size=Desktop; < 1024 px — Size=Mobile.
 * Стани Hover / Pressed / Focus (рамка, фон, стрілка в куті) — нативні :hover / :active / :focus-visible.
 */
export function OfferCard({
  title,
  status = 'available',
  size = 'default',
  href,
  tags,
  description,
  price,
  actionLabel,
  actionAppearance = 'inverse',
  note,
  sticker,
  className,
  ...rest
}: OfferCardProps) {
  const unavailable = status === 'unavailable'
  const isLink = !unavailable && href !== undefined
  const hasFooter = Boolean(sticker || (unavailable ? note : price))
  const hasAction = !unavailable && Boolean(actionLabel)
  const classes = [
    styles.card,
    size === 'compact' && styles.compact,
    unavailable && styles.unavailable,
    isLink && styles.link,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const body = (
    <>
      <div className={styles.content}>
        {tags && tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag, i) => (
              <li key={i}>
                <Tag appearance="outlined" size="responsive">
                  {tag}
                </Tag>
              </li>
            ))}
          </ul>
        )}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {(hasFooter || hasAction) && (
        <div className={styles.bottom}>
          {hasFooter && (
            <div className={styles.footer}>
              {sticker && (
                <Sticker size="m" appearance="inverse" className={styles.sticker}>
                  {sticker}
                </Sticker>
              )}
              {unavailable
                ? note && (
                    <p className={styles.note}>
                      <Eyes />
                      <span>{note}</span>
                    </p>
                  )
                : price && <div className={styles.price}>{price}</div>}
            </div>
          )}
          {hasAction && (
            <Button as="span" appearance={actionAppearance} className={styles.action}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
      {isLink && (
        <Button as="span" appearance="outlined" icon={<ArrowRight />} aria-label="" className={styles.arrow} />
      )}
    </>
  )

  return isLink ? (
    <a href={href} className={classes} {...rest}>
      {body}
    </a>
  ) : (
    <article className={classes} {...rest}>
      {body}
    </article>
  )
}
