import type { HTMLAttributes, ReactNode } from 'react'
import { Tag } from '../Tag/Tag'
import styles from './MentorCard.module.css'

export type MentorCardProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'role'> & {
  /** Figma `name`. */
  name: ReactNode
  /** Figma `role`: посада й компанії. */
  role: ReactNode
  /** Photo shape="circle" (120 px). */
  photo: ReactNode
  /** Мітка праворуч від фото, напр. «Авторка» (Figma `showTag`). Tag outlined, на mobile — S. */
  tag?: ReactNode
  /** Button appearance="inverse" з href на профіль. На mobile — на всю ширину. */
  action?: ReactNode
}

/**
 * Картка ведучого / ментора курсу.
 * ≥ 1024 px — Size=Desktop; < 1024 px — Size=Mobile (менші відступи, Tag S, кнопка на всю ширину).
 */
export function MentorCard({ name, role, photo, tag, action, className, ...rest }: MentorCardProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.photo}>{photo}</div>
          {tag && (
            <Tag appearance="outlined" size="responsive">
              {tag}
            </Tag>
          )}
        </div>
        <h3 className={`text-label-m-semibold ${styles.name}`}>{name}</h3>
        <p className={`text-body-s ${styles.role}`}>{role}</p>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </article>
  )
}
