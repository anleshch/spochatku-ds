import { createContext, useContext } from 'react'

/** InputField передає полю id, опис (hint/помилка) і стан помилки — без ручного зв'язування. */
export type FieldContextValue = {
  id: string
  describedBy?: string
  invalid: boolean
  required?: boolean
}

export const FieldContext = createContext<FieldContextValue | null>(null)

/** Атрибути поля: явні пропси мають пріоритет над тими, що прийшли з InputField. */
export function useFieldControl(props: {
  id?: string
  invalid?: boolean
  required?: boolean
  'aria-describedby'?: string
}) {
  const field = useContext(FieldContext)
  const invalid = props.invalid ?? field?.invalid ?? false
  return {
    id: props.id ?? field?.id,
    invalid,
    required: props.required ?? field?.required,
    'aria-describedby': props['aria-describedby'] ?? field?.describedBy,
    'aria-invalid': invalid || undefined,
  }
}
