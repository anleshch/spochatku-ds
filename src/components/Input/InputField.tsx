import { useId, type HTMLAttributes, type ReactNode } from 'react'
import { FieldContext } from './fieldContext'
import styles from './Input.module.css'

export type InputFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma `label`. */
  label?: ReactNode
  /** Figma `hint` — підказка під полем. */
  hint?: ReactNode
  /** Текст помилки: замінює hint, вмикає Status=Error у поля. */
  error?: ReactNode
  /** id поля; за замовчуванням генерується. */
  htmlFor?: string
  required?: boolean
  /** Input, Select або PhoneInput — отримують id, aria-describedby і помилку автоматично. */
  children: ReactNode
}

/** Поле з лейблом і підказкою — Figma InputField 242:2777. */
export function InputField({ label, hint, error, htmlFor, required, children, className, ...rest }: InputFieldProps) {
  const autoId = useId()
  const id = htmlFor ?? `${autoId}-control`
  const message = error ?? hint
  const messageId = message ? `${id}-message` : undefined
  const invalid = Boolean(error)

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')} {...rest}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <FieldContext value={{ id, describedBy: messageId, invalid, required }}>{children}</FieldContext>
      {message && (
        <p id={messageId} className={[styles.hint, invalid && styles.error].filter(Boolean).join(' ')} role={invalid ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  )
}
