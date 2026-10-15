import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import styles from './Steps.module.css'

export type StepNumberProps = HTMLAttributes<HTMLSpanElement> & {
  /** Figma `number`. */
  children: ReactNode
}

/** Номер кроку в колі. */
export function StepNumber({ children, className, ...rest }: StepNumberProps) {
  return (
    <span className={[styles.number, 'text-body-accent', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  )
}

export type StepItemProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'title'> & {
  number: ReactNode
  title: ReactNode
  /** Figma `description` + `showDescription`: не передали — рядка немає. */
  description?: ReactNode
}

/** Крок у послідовності (етапи реєстрації, програми). */
export function StepItem({ number, title, description, className, ...rest }: StepItemProps) {
  return (
    <li className={[styles.item, className].filter(Boolean).join(' ')} {...rest}>
      <StepNumber aria-hidden="true">{number}</StepNumber>
      <div className={styles.content}>
        <span className="text-label-m-semibold">{title}</span>
        {description && <span className="text-body-s">{description}</span>}
      </div>
    </li>
  )
}

export type StepsProps = HTMLAttributes<HTMLOListElement> & {
  /** StepItem-и, 3–4 штуки. */
  children: ReactNode
}

/** Нумерована послідовність кроків. */
export function Steps({ children, className, ...rest }: StepsProps) {
  return (
    <ol className={[styles.steps, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </ol>
  )
}

export type StepsCtaProps = HTMLAttributes<HTMLDivElement> & {
  /** StepItem-и. */
  children: ReactNode
  /** Головна дія: Button appearance="inverse" — розтягується на всю ширину. */
  action: ReactNode
  /** Опційна IconOnly-кнопка праворуч (Figma `showIconButton`). */
  iconAction?: ReactNode
}

/** Блок «кроки + дія»: Steps зверху, під ним кнопки. */
export function StepsCta({ children, action, iconAction, className, ...rest }: StepsCtaProps) {
  return (
    <div className={[styles.stepsCta, className].filter(Boolean).join(' ')} {...rest}>
      <Steps>{children}</Steps>
      <div className={styles.actions}>
        {action}
        {iconAction}
      </div>
    </div>
  )
}
