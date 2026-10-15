import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import styles from './List.module.css'

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  /** Figma `label`. */
  children: ReactNode
}

/** Пункт маркованого списку. Довгий текст переноситься, маркер вирівняний по першому рядку. */
export function ListItem({ children, className, ...rest }: ListItemProps) {
  return (
    <li className={[styles.item, 'text-body-s', className].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.marker} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </li>
  )
}

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  /** ListItem-и, 3–6 штук. Більше — розбийте на групи. */
  children: ReactNode
}

/**
 * Маркований список: програма курсу, переваги. Фону немає — список лягає на фон секції;
 * на темному фоні поставте контейнеру data-mode="inverse".
 */
export function List({ children, className, ...rest }: ListProps) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </ul>
  )
}
