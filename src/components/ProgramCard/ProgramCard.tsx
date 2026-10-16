import type { HTMLAttributes, ReactNode } from 'react'
import { List } from '../List/List'
import { Tag } from '../Tag/Tag'
import styles from './ProgramCard.module.css'

export type ProgramCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** Мітка над заголовком, напр. «Week 1» (Figma `showTag`). */
  tag?: ReactNode
  /** ListItem-и програми. */
  children: ReactNode
}

/**
 * Картка блоку програми курсу (тиждень / модуль): Tag + заголовок + List.
 * ≥ 1024 px — Size=Desktop; < 1024 px — Size=Mobile (менші відступи й радіус).
 */
export function ProgramCard({ title, tag, children, className, ...rest }: ProgramCardProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.header}>
        {tag && <Tag>{tag}</Tag>}
        <h3 className={`text-heading-4 ${styles.title}`}>{title}</h3>
      </div>
      <List>{children}</List>
    </article>
  )
}
