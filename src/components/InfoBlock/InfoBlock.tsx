import type { HTMLAttributes, ReactNode } from 'react'
import styles from './InfoBlock.module.css'

export type InfoBlockProps = HTMLAttributes<HTMLDivElement> & {
  /** Figma `label`: короткий факт про програму. */
  children: ReactNode
}

/** Інфо-блок з коротким фактом (формат, когорта, ком'юніті). Ширина задається контейнером. */
export function InfoBlock({ children, className, ...rest }: InfoBlockProps) {
  return (
    <div className={[styles.block, 'text-label-m-semibold', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export type InfoBlocksProps = HTMLAttributes<HTMLDivElement> & {
  /** InfoBlock-и. Стають у ряд однакової ширини й висоти. */
  children: ReactNode
}

/** Ряд InfoBlock-ів: однакова ширина, висота вирівнюється по найвищому. */
export function InfoBlocks({ children, className, ...rest }: InfoBlocksProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
