import type { HTMLAttributes, ReactNode } from 'react'
import { Sticker } from '../Sticker/Sticker'
import { Tag } from '../Tag/Tag'
import styles from './CourseHero.module.css'

export type CourseHeroProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Назва курсу — єдиний h1 сторінки. */
  title: ReactNode
  description?: ReactNode
  /** Короткі факти (дата, тривалість, формат) — Tag outlined, на mobile — S. */
  tags?: ReactNode[]
  /** Текст наліпки під описом (Sticker S, нахил 4°, Figma `showSticker`). На mobile — коротко, до ~16 символів. */
  sticker?: ReactNode
  /** Price align="responsive" (будь-який state). */
  price?: ReactNode
  /** Головна дія: Button appearance="inverse" — розтягується на всю ширину блоку ціни. */
  action?: ReactNode
  /** IconOnly-кнопка поруч (Figma `showIconAction`): Button appearance="outlined". */
  iconAction?: ReactNode
}

/**
 * Перший екран сторінки курсу: теги, назва, опис, наліпка, ціна й реєстрація.
 * ≥ 1024 px — Size=Desktop (опис зліва, ціна справа); < 1024 px — Size=Mobile (усе в колонку).
 * padding-top уже враховує плаваючий Header.
 */
export function CourseHero({
  title,
  description,
  tags,
  sticker,
  price,
  action,
  iconAction,
  className,
  ...rest
}: CourseHeroProps) {
  const hasPricing = price || action || iconAction
  return (
    <section className={[styles.hero, className].filter(Boolean).join(' ')} {...rest}>
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
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          {description && <p className={styles.description}>{description}</p>}
          {sticker && <Sticker rotate={-4}>{sticker}</Sticker>}
        </div>
        {hasPricing && (
          <div className={styles.pricing}>
            {price}
            {(action || iconAction) && (
              <div className={styles.actions}>
                {action}
                {iconAction}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
