import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './Sticker.module.css'

/** Figma `Appearance` → mode колекції Components (data-mode). */
export type StickerAppearance = 'default' | 'inverse'
export type StickerSize = 's' | 'm' | 'l'

export type StickerProps = HTMLAttributes<HTMLSpanElement> & {
  /** Figma `label`. */
  children: ReactNode
  appearance?: StickerAppearance
  /** S — пігулка в один рядок; M — блок 160 px, дрібний текст у кілька рядків; L — блок 200 px, текст переноситься. */
  size?: StickerSize
  /** Поворот у градусах. У Figma його задають на інстансі, а не в компоненті. */
  rotate?: number
}

/** Акцентна наліпка зі шрифтом Oi для промо-повідомлень («когорта — 7 місць»). */
export function Sticker({
  children,
  appearance = 'default',
  size = 's',
  rotate,
  className,
  style,
  ...rest
}: StickerProps) {
  const classes = [styles.sticker, size === 'm' && styles.medium, size === 'l' && styles.large, className]
    .filter(Boolean)
    .join(' ')
  const rotation: CSSProperties | undefined = rotate ? { rotate: `${rotate}deg` } : undefined

  return (
    <span data-mode={appearance} className={classes} style={{ ...rotation, ...style }} {...rest}>
      <span className={`${size === 'm' ? 'text-body-accent-s' : 'text-body-accent'} ${styles.label}`}>{children}</span>
    </span>
  )
}
