import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Tag.module.css'

/** Figma `Appearance` → mode колекції Components (data-mode). */
export type TagAppearance = 'default' | 'inverse' | 'outlined'
export type TagSize = 'm' | 's' | 'responsive'

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  /** Figma `label`. */
  children: ReactNode
  appearance?: TagAppearance
  /** M — 48 px, label/m-semibold; S — 40 px, body/s-medium (мобайл і компактні картки); responsive — M ≥ 1024 px, S нижче. */
  size?: TagSize
}

/** Мітка (дата, формат, тривалість). Не інтерактивна. */
export function Tag({ children, appearance = 'default', size = 'm', className, ...rest }: TagProps) {
  const classes = [styles.tag, size === 's' && styles.small, size === 'responsive' && styles.responsive, className].filter(Boolean).join(' ')
  const textStyle = size === 's' ? 'text-body-s-medium' : 'text-label-m-semibold'

  return (
    <span data-mode={appearance} className={classes} {...rest}>
      <span className={`${textStyle} ${styles.label}`}>{children}</span>
    </span>
  )
}
