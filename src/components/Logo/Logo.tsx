import type { CSSProperties, HTMLAttributes } from 'react'
import logoUrl from './logo.svg'
import styles from './Logo.module.css'

export type LogoProps = HTMLAttributes<HTMLSpanElement> & {
  /** Ширина (px або CSS-значення); висота масштабується пропорційно (88 × 36 у Figma). */
  width?: number | string
}

/**
 * Логотип «спочатку юікс». Колір — logo/icon-color: темний, у mode inverse — білий.
 * SVG з Figma використовується як маска, тому колір завжди береться з токена.
 */
export function Logo({ width = 88, className, style, ...rest }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="спочатку юікс"
      className={[styles.logo, className].filter(Boolean).join(' ')}
      style={{ width, '--logo-mask': `url("${logoUrl}")`, ...style } as CSSProperties}
      {...rest}
    />
  )
}

/** Circle — аватар соцмереж; Square — обкладинка, favicon. */
export type LogoBadgeShape = 'circle' | 'square'

export type LogoBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  shape?: LogoBadgeShape
  /** Сторона в px. У Figma — 1080 (експорт PNG 1080 і 300). */
  size?: number
}

/**
 * Бейдж-логотип на рожевому фоні. Завжди у mode default, щоб логотип лишався темним.
 * Спроєктований на 1080 px, тому відступ масштабується пропорційно розміру.
 */
export function LogoBadge({ shape = 'circle', size = 300, className, style, ...rest }: LogoBadgeProps) {
  return (
    <span
      data-mode="default"
      className={[styles.badge, shape === 'circle' && styles.circle, className].filter(Boolean).join(' ')}
      style={{ width: size, '--_scale': size / 1080, ...style } as CSSProperties}
      {...rest}
    >
      <Logo width="100%" />
    </span>
  )
}
