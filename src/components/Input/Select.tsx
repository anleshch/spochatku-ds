import type { ReactNode, Ref, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { useFieldControl } from './fieldContext'
import styles from './Input.module.css'

export type SelectOption = { value: string; label: ReactNode }

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  options: SelectOption[]
  /** Текст до вибору (порожнє значення), сірий, як placeholder у Input. */
  placeholder?: string
  /** Figma Status=Error. Усередині InputField береться з нього. */
  invalid?: boolean
  ref?: Ref<HTMLSelectElement>
}

/**
 * Випадний список — Figma Select 244:2958: вигляд Input + chevron-down.
 * Нативний `<select>`: системний список опцій і пікер на мобільному, клавіатура з коробки.
 */
export function Select({ options, placeholder, invalid, className, ref, defaultValue, value, ...rest }: SelectProps) {
  const control = useFieldControl({ ...rest, invalid })
  const hasPlaceholder = placeholder !== undefined

  return (
    <div className={[styles.box, control.invalid && styles.invalid].filter(Boolean).join(' ')}>
      <select
        ref={ref}
        {...rest}
        value={value}
        defaultValue={value === undefined && hasPlaceholder ? (defaultValue ?? '') : defaultValue}
        id={control.id}
        required={control.required}
        aria-invalid={control['aria-invalid']}
        aria-describedby={control['aria-describedby']}
        className={[styles.control, styles.select, className].filter(Boolean).join(' ')}
      >
        {hasPlaceholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className={`${styles.icon} ${styles.selectIcon}`} aria-hidden="true">
        <ChevronDown />
      </span>
    </div>
  )
}
