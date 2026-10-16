import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import styles from './Button.module.css'

/** Figma `Appearance` → mode колекції Components (data-mode). */
export type ButtonAppearance = 'default' | 'inverse' | 'outlined'

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'download'> & {
    appearance?: ButtonAppearance
    /** З `href` кнопка рендериться як посилання `<a>` (вигляд той самий). */
    href?: string
    ref?: Ref<HTMLButtonElement | HTMLAnchorElement>
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
  href,
  target,
  rel,
  download,
  ref,
  ...rest
}: ButtonProps) {
  const iconOnly = icon !== undefined
  const classes = [styles.button, iconOnly && styles.iconOnly, className].filter(Boolean).join(' ')

  const content = iconOnly ? (
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
  )

  if (href !== undefined) {
    // Вимкнене посилання: без href і з aria-disabled, як у Link і Tab.
    const { disabled, ...anchorRest } = rest
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        aria-disabled={disabled || undefined}
        data-mode={appearance}
        className={classes}
        ref={ref as Ref<HTMLAnchorElement>}
        {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} data-mode={appearance} className={classes} ref={ref as Ref<HTMLButtonElement>} {...rest}>
      {content}
    </button>
  )
}
