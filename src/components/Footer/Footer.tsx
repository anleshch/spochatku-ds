import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from '../Link/Link'
import { Logo } from '../Logo/Logo'
import styles from './Footer.module.css'

export type FooterLink = { label: ReactNode; href: string }

export type FooterProps = HTMLAttributes<HTMLElement> & {
  /** Навігація сайту (ліва колонка). */
  links: FooterLink[]
  /** Соцмережі (права колонка на desktop). */
  social: FooterLink[]
  /** Юридичні посилання (Link tone="subtle"). */
  policies: FooterLink[]
  /** Figma `copyright`, напр. «© ФОП Ліщинська А.І.». */
  copyright: ReactNode
  /** Figma `rights`, напр. «Всі права захищені, 2026». */
  rights: ReactNode
  logoHref?: string
}

const linkList = (items: FooterLink[], className: string, tone?: 'subtle') => (
  <ul className={className}>
    {items.map((l) => (
      <li key={l.href}>
        <Link href={l.href} tone={tone}>
          {l.label}
        </Link>
      </li>
    ))}
  </ul>
)

/**
 * Футер сайту на темному фоні (завжди mode inverse).
 * ≥ 1024 px — контент 740 px по центру, соцмережі праворуч; < 1024 px — одна колонка.
 */
export function Footer({ links, social, policies, copyright, rights, logoHref = '/', className, ...rest }: FooterProps) {
  return (
    <footer data-mode="inverse" className={[styles.footer, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.content}>
        <div className={styles.logoRow}>
          <a href={logoHref} className={styles.logoLink} aria-label="спочатку юікс — на головну">
            <Logo aria-hidden="true" />
          </a>
        </div>
        <nav className={styles.nav} aria-label="Навігація у футері">
          {linkList(links, styles.links)}
          {linkList(social, `${styles.links} ${styles.social}`)}
        </nav>
        <div className={`${styles.legal} text-body-s`}>
          {linkList(policies, styles.policies, 'subtle')}
          <span>{copyright}</span>
          <span>{rights}</span>
        </div>
      </div>
    </footer>
  )
}
