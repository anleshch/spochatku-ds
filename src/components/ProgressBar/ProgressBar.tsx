import type { HTMLAttributes } from 'react'
import styles from './ProgressBar.module.css'

export type ProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
  /** Пройдена частка, 0…1 (Figma Value у %). Кількість кроків не показується. */
  value: number
  /** Що саме показує прогрес, для скрінрідерів. */
  'aria-label': string
}

/** Прогрес без чисел — Figma ProgressBar (page `progress-bar`). */
export function ProgressBar({ value, className, ...rest }: ProgressBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={[styles.track, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className={styles.fill} style={{ width: `${pct}%` }} />
    </div>
  )
}
