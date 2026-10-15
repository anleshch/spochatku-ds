import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import styles from './Photo.module.css'

/** Circle — аватар людини; Rounded — обкладинка. */
export type PhotoShape = 'circle' | 'rounded'

export type PhotoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> & {
  src: string
  /** Опис фото; порожній рядок — якщо фото декоративне. */
  alt: string
  shape?: PhotoShape
  /** Сторона квадрата в px. За замовчуванням як у Figma: Circle 120, Rounded 320. */
  size?: number
}

/** Фото в рамці. Зображення обрізається під квадрат (object-fit: cover, як image fill FILL у Figma). */
export function Photo({ shape = 'circle', size, className, style, ...rest }: PhotoProps) {
  const sizeStyle: CSSProperties | undefined = size ? { width: size } : undefined
  return (
    <img
      className={[styles.photo, shape === 'circle' ? styles.circle : styles.rounded, className].filter(Boolean).join(' ')}
      style={{ ...sizeStyle, ...style }}
      {...rest}
    />
  )
}

export type PersonProps = HTMLAttributes<HTMLElement> & {
  src: string
  /** Ім'я та роль, наприклад «Анна @ Uklon». */
  label: ReactNode
  /** Опис фото для скрінрідера; за замовчуванням фото декоративне (підпис уже містить ім'я). */
  alt?: string
  /** Ширина блоку й діаметр фото в px. */
  size?: number
}

/** Людина: кругле фото з підписом під ним. Для ведучих, спікерів, авторів. */
export function Person({ src, label, alt = '', size = 120, className, style, ...rest }: PersonProps) {
  return (
    <figure className={[styles.person, className].filter(Boolean).join(' ')} style={{ width: size, ...style }} {...rest}>
      <Photo src={src} alt={alt} shape="circle" className={styles.personPhoto} />
      <figcaption className={`text-body-s ${styles.caption}`}>{label}</figcaption>
    </figure>
  )
}
