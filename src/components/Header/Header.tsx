import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import { Tab, TabBar } from '../Tab/Tab'
import styles from './Header.module.css'

export type NavItem = {
  label: ReactNode
  href: string
  /** Головна дія — у desktop-навігації Tab type="cta". */
  cta?: boolean
}

type BarProps = {
  logoHref: string
  /** Figma `Expanded=True`: суцільний білий фон (всередині MobileMenu). */
  expanded?: boolean
  children: ReactNode
  className?: string
}

/** Скляна «пігулка» шапки: логотип зліва, дія справа. */
function HeaderBar({ logoHref, expanded = false, children, className }: BarProps) {
  return (
    <div className={[styles.bar, expanded && styles.expanded, className].filter(Boolean).join(' ')}>
      <a href={logoHref} className={styles.logoLink} aria-label="спочатку юікс — на головну">
        <Logo aria-hidden="true" />
      </a>
      {children}
    </div>
  )
}

export type MobileMenuProps = HTMLAttributes<HTMLDivElement> & {
  items: NavItem[]
  logoHref?: string
  /** Закрити меню (кнопка «×», Escape). */
  onClose: () => void
}

/** Відкрите мобільне меню: шапка з кнопкою «×» + пункти Tab на всю ширину на темній підкладці. */
export function MobileMenu({ items, logoHref = '/', onClose, className, ...rest }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className={[styles.menu, className].filter(Boolean).join(' ')} {...rest}>
      <HeaderBar logoHref={logoHref} expanded>
        <Button ref={closeRef} appearance="inverse" icon={<X />} aria-label="Закрити меню" onClick={onClose} />
      </HeaderBar>
      <nav aria-label="Основна навігація">
        <ul className={styles.menuList}>
          {items.map((item) => (
            <li key={item.href}>
              <Tab href={item.href} className={styles.menuItem} onClick={onClose}>
                {item.label}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /** Пункти desktop-навігації (TabBar). Останній зазвичай cta. */
  items: NavItem[]
  /** Пункти мобільного меню; за замовчуванням ті самі items. */
  mobileItems?: NavItem[]
  logoHref?: string
}

/**
 * Шапка сайту. ≥ 1024 px — логотип + TabBar (Figma Size=Desktop);
 * < 1024 px — логотип + кнопка меню, що відкриває MobileMenu (Size=Mobile).
 */
export function Header({ items, mobileItems = items, logoHref = '/', className, ...rest }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    setOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')} {...rest}>
      <HeaderBar logoHref={logoHref}>
        <TabBar aria-label="Основна навігація" className={styles.desktopOnly}>
          {items.map((item) => (
            <Tab key={item.href} href={item.href} type={item.cta ? 'cta' : 'default'}>
              {item.label}
            </Tab>
          ))}
        </TabBar>
        <Button
          ref={menuButtonRef}
          className={styles.mobileOnly}
          appearance="inverse"
          icon={<Menu />}
          aria-label="Відкрити меню"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(true)}
        />
      </HeaderBar>
      {open && <MobileMenu id={menuId} className={styles.overlay} items={mobileItems} logoHref={logoHref} onClose={close} />}
    </header>
  )
}
