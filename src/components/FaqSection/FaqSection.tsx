import type { HTMLAttributes, ReactNode } from 'react'
import styles from './FaqSection.module.css'

export type FaqSectionProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Заголовок секції. */
  title: ReactNode
  /** Accordion з AccordionItem-ами. */
  children: ReactNode
}

/**
 * Секція FAQ сторінки: заголовок + Accordion на білій підкладці.
 * ≥ 1024 px — heading/3, відступи 80/140, radius 160; < 1024 px — heading/4, відступи 40, radius 80.
 */
export function FaqSection({ title, children, className, ...rest }: FaqSectionProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')} {...rest}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  )
}
