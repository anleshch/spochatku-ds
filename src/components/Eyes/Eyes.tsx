import type { SVGAttributes } from 'react'
import styles from './Eyes.module.css'

export type EyesProps = Omit<SVGAttributes<SVGSVGElement>, 'width' | 'height'> & {
  /** Ширина в px; висота масштабується пропорційно (48 × 32 у Figma). */
  width?: number
}

/**
 * Декоративна ілюстрація «очі» для станів «ще не запустили / очікуємо».
 * Геометрія — еліпси з Figma (102:892); кольори — eyes/sclera-color, eyes/pupil-color.
 */
export function Eyes({ width = 48, className, ...rest }: EyesProps) {
  return (
    <svg
      viewBox="0 0 48 32"
      width={width}
      height={(width * 32) / 48}
      className={[styles.eyes, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...rest}
    >
      <ellipse className={styles.sclera} cx="11" cy="16" rx="11" ry="16" />
      <ellipse className={styles.sclera} cx="36" cy="16" rx="11" ry="16" />
      <ellipse className={styles.pupil} cx="12" cy="21" rx="8" ry="9" />
      <ellipse className={styles.pupil} cx="37" cy="21" rx="8" ry="9" />
    </svg>
  )
}
