import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { useFieldControl } from './fieldContext'
import styles from './Input.module.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> & {
  /** Figma Status=Error (aria-invalid). Усередині InputField береться з нього. */
  invalid?: boolean
  /** Figma iconLeft (Lucide, 24). */
  iconLeft?: ReactNode
  /** Figma iconRight (Lucide, 24). */
  iconRight?: ReactNode
  /** Figma prefix: код країни, валюта… Може бути інтерактивним (PhoneInput). */
  prefix?: ReactNode
  /** Клас для рамки поля (корінь — рамка, сам `<input>` — усередині). */
  boxClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Поле введення — Figma Input 242:78 (page `input`). 54 px, як Button M.
 * Стани — нативні: :hover, :focus-within (Focus), :disabled; Filled — просто є значення.
 */
export function Input({ invalid, iconLeft, iconRight, prefix, className, boxClassName, ref, ...rest }: InputProps) {
  const control = useFieldControl({ ...rest, invalid })

  return (
    <div className={[styles.box, control.invalid && styles.invalid, boxClassName].filter(Boolean).join(' ')}>
      {iconLeft && <span className={styles.icon} aria-hidden="true">{iconLeft}</span>}
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        ref={ref}
        {...rest}
        id={control.id}
        required={control.required}
        aria-invalid={control['aria-invalid']}
        aria-describedby={control['aria-describedby']}
        className={[styles.control, className].filter(Boolean).join(' ')}
      />
      {iconRight && <span className={styles.icon} aria-hidden="true">{iconRight}</span>}
    </div>
  )
}
