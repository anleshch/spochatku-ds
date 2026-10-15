import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Accordion.module.css'

export type AccordionItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> & {
  /** Питання. */
  title: ReactNode
  /** Відповідь, видно коли пункт розкритий. */
  content: ReactNode
  /** Керований стан (Figma `Expanded`). Разом з onExpandedChange. */
  expanded?: boolean
  /** Початковий стан, якщо expanded не керується ззовні. */
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  disabled?: boolean
  /** id кнопки-заголовка (для пов'язування та тестів). */
  triggerId?: string
}

/** Пункт FAQ: питання з шевроном, по кліку розкриває відповідь. */
export function AccordionItem({
  title,
  content,
  expanded: controlled,
  defaultExpanded = false,
  onExpandedChange,
  disabled = false,
  triggerId,
  className,
  ...rest
}: AccordionItemProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultExpanded)
  const expanded = controlled ?? uncontrolled
  const autoId = useId()
  const buttonId = triggerId ?? `${autoId}-trigger`
  const panelId = `${autoId}-panel`

  const toggle = () => {
    const next = !expanded
    if (controlled === undefined) setUncontrolled(next)
    onExpandedChange?.(next)
  }

  return (
    <div className={[styles.item, className].filter(Boolean).join(' ')} {...rest}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={buttonId}
          className={`${styles.trigger} text-body-s-medium`}
          aria-expanded={expanded}
          aria-controls={panelId}
          disabled={disabled}
          onClick={toggle}
        >
          <span className={styles.title}>{title}</span>
          <ChevronDown className={styles.icon} data-expanded={expanded} aria-hidden="true" />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className={`${styles.content} text-body-s`}>
        {content}
      </div>
    </div>
  )
}

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  /** AccordionItem-и. Кожен розкривається незалежно. */
  children: ReactNode
}

/** Список FAQ з AccordionItem. Ширина за контейнером. */
export function Accordion({ children, className, ...rest }: AccordionProps) {
  return (
    <div className={[styles.accordion, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
