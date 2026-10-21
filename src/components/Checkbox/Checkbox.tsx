import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { Check } from 'lucide-react'
import styles from './Checkbox.module.css'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /** Figma `label` — може містити посилання. */
  children: ReactNode
  /** Figma Status=Error (aria-invalid), напр. не поставлена обов'язкова згода. */
  invalid?: boolean
  ref?: Ref<HTMLInputElement>
}

/**
 * Чекбокс з підписом — Figma Checkbox 244:2938 (page `checkbox`).
 * Нативний `<input type="checkbox">` (візуально прихований) + бокс; стани — :hover, :focus-visible, :checked, :disabled.
 */
export function Checkbox({ children, invalid, className, ref, ...rest }: CheckboxProps) {
  return (
    <label className={[styles.checkbox, invalid && styles.invalid, className].filter(Boolean).join(' ')}>
      <input ref={ref} type="checkbox" className={styles.input} aria-invalid={invalid || undefined} {...rest} />
      <span className={styles.box} aria-hidden="true">
        <Check />
      </span>
      <span className={styles.label}>{children}</span>
    </label>
  )
}
