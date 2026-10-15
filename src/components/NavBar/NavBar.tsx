import type { HTMLAttributes, ReactNode } from 'react'
import { Sticker } from '../Sticker/Sticker'
import styles from './NavBar.module.css'

export type NavBarProps = HTMLAttributes<HTMLDivElement> & {
  /** Price align="center" (будь-який state). */
  price: ReactNode
  /** Головна дія: Button appearance="inverse". */
  action: ReactNode
  /** Текст наліпки зліва (лише desktop, Figma `showSticker`). */
  sticker?: ReactNode
  /** IconOnly-кнопка поруч із дією (лише mobile, Figma `showIconAction`). */
  iconAction?: ReactNode
}

/**
 * Плаваюча панель реєстрації внизу сторінки курсу.
 * ≥ 1024 px — Sticker L + скляна плашка (Price | action);
 * < 1024 px — плашка на всю ширину, заокруглена зверху: Price, під ним action + iconAction.
 */
export function NavBar({ price, action, sticker, iconAction, className, ...rest }: NavBarProps) {
  return (
    <div className={[styles.navBar, className].filter(Boolean).join(' ')} {...rest}>
      {sticker && (
        <Sticker size="l" appearance="inverse" className={styles.sticker}>
          {sticker}
        </Sticker>
      )}
      <div className={styles.bar}>
        <div className={styles.price}>{price}</div>
        <div className={styles.actions}>
          {action}
          {iconAction && <span className={styles.iconAction}>{iconAction}</span>}
        </div>
      </div>
    </div>
  )
}
