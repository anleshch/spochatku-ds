import type { HTMLAttributes, ReactNode } from 'react'
import styles from './AuthorNote.module.css'

export type AuthorNoteProps = Omit<HTMLAttributes<HTMLElement>, 'role'> & {
  /** Figma `name` — підпис. */
  name: ReactNode
  /** Figma `role` — посада під іменем. */
  role: ReactNode
  /** Figma `text` — текст листа. Рядки з `\n` переносяться. */
  children: ReactNode
  /** Photo shape="circle" (120 px). */
  photo: ReactNode
  /** Button (default) з посиланням; праворуч від неї — лінія до краю. */
  action?: ReactNode
}

/**
 * Звернення від авторки: фото, текст листа, підпис і кнопка-посилання з лінією.
 * ≥ 1024 px — Size=Desktop (фото ліворуч, підпис під текстом);
 * < 1024 px — Size=Mobile (фото зверху, підпис перед текстом).
 */
export function AuthorNote({ name, role, children, photo, action, className, ...rest }: AuthorNoteProps) {
  return (
    <section className={[styles.note, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.photo}>{photo}</div>
      <div className={styles.content}>
        <p className={styles.text}>{children}</p>
        <p className={styles.signature}>
          <span>{name}</span>
          <span>{role}</span>
        </p>
        {action && <div className={styles.footer}>{action}</div>}
      </div>
    </section>
  )
}
