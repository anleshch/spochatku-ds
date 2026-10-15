import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import styles from './Button.module.css'

/** Figma `Appearance` → mode колекції Components (data-mode). */
export type ButtonAppearance = 'default' | 'inverse' | 'outlined'

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  appearance?: ButtonAppearance
  ref?: Ref<HTMLButtonElement>
}

/** Figma `Variant=Label`: текст (`label`) + необов'язкові іконки зліва/справа. */
type LabelButtonProps = BaseProps & {
  children: ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
  icon?: never
}

/** Figma `Variant=IconOnly`: лише іконка, тому `aria-label` обов'язковий. */
type IconOnlyButtonProps = BaseProps & {
  icon: ReactNode
  'aria-label': string
  children?: never
  iconLeft?: never
  iconRight?: never
}

export type ButtonProps = LabelButtonProps | IconOnlyButtonProps

export function Button({
  appearance = 'default',
  children,
  icon,
  iconLeft,
  iconRight,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const iconOnly = icon !== undefined
  const classes = [styles.button, iconOnly && styles.iconOnly, className].filter(Boolean).join(' ')

  return (
    <button type={type} data-mode={appearance} className={classes} {...rest}>
      {iconOnly ? (
        <span className={styles.iconSlot} aria-hidden="true">
          {icon}
        </span>
      ) : (
        <>
          {iconLeft && (
            <span className={styles.icon} aria-hidden="true">
              {iconLeft}
            </span>
          )}
          <span className={`text-label-m ${styles.label}`}>{children}</span>
          {iconRight && (
            <span className={styles.icon} aria-hidden="true">
              {iconRight}
            </span>
          )}
        </>
      )}
    </button>
  )
}
