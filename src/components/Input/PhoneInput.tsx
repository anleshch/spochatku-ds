import { useMemo, useState, type ChangeEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js/min'
import { Input, type InputProps } from './Input'
import styles from './Input.module.css'

export type PhoneValue = {
  /** Номер у форматі E.164 (+380501234567) або undefined, поки нічого не введено. */
  e164?: string
  /** Номер має правильну довжину для обраної країни. */
  valid: boolean
  country: CountryCode
}

export type PhoneInputProps = Omit<InputProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'prefix' | 'name'> & {
  defaultCountry?: CountryCode
  /** Початковий номер (E.164, напр. +380501234567) — щоб відновити введене після повернення до кроку. */
  defaultValue?: string
  /** Ім'я прихованого поля з номером у форматі E.164 (для звичайної відправки форми). */
  name?: string
  onValueChange?: (value: PhoneValue) => void
  /** aria-label вибору країни. */
  countryLabel?: string
}

const regionNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl ? new Intl.DisplayNames(['uk'], { type: 'region' }) : null

/** Номер без коду країни в міжнародному форматі: «50 123 4567», без національного префікса 0. */
function formatNational(digits: string, country: CountryCode) {
  const national = new AsYouType(country)
  national.input(digits)
  const code = getCountryCallingCode(country)
  // getNumberValue() — E.164 і для неповного номера, вже без національного префікса 0
  const nsn = national.getNumberValue()?.slice(code.length + 1) ?? digits
  return new AsYouType().input(`+${code}${nsn}`).replace(`+${code}`, '').trim()
}

function countryOptions(first: CountryCode) {
  const list = getCountries().map((c) => ({ code: c, name: regionNames?.of(c) ?? c }))
  list.sort((a, b) => (a.code === first ? -1 : b.code === first ? 1 : a.name.localeCompare(b.name, 'uk')))
  return list
}

/**
 * Телефон — Figma PhoneInput 244:2868: Input з префіксом «+380 ⌄».
 * Країна — нативний `<select>` поверх префікса; формат під час введення і перевірка — libphonenumber-js.
 */
export function PhoneInput({
  defaultCountry = 'UA',
  defaultValue,
  name,
  onValueChange,
  countryLabel = 'Країна',
  disabled,
  ...rest
}: PhoneInputProps) {
  const initial = defaultValue ? parsePhoneNumberFromString(defaultValue, defaultCountry) : undefined
  const [country, setCountry] = useState<CountryCode>(initial?.country ?? defaultCountry)
  const [text, setText] = useState(initial ? formatNational(initial.nationalNumber, initial.country ?? defaultCountry) : '')
  const options = useMemo(() => countryOptions(defaultCountry), [defaultCountry])
  const parsed = text ? parsePhoneNumberFromString(text, country) : undefined

  const emit = (nextText: string, nextCountry: CountryCode) => {
    const p = nextText ? parsePhoneNumberFromString(nextText, nextCountry) : undefined
    onValueChange?.({ e164: p?.number, valid: Boolean(p?.isValid()), country: nextCountry })
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // Видалення: не переформатовуємо, щоб курсор не стрибав через пробіли
    const deleting = raw.length < text.length
    // Вставили номер з «+»: визначаємо країну з коду
    const intl = raw.trim().startsWith('+') ? new AsYouType() : undefined
    intl?.input(raw)
    const detected = intl?.getCountry()
    const nextCountry = detected ?? country
    const digits = detected ? (intl?.getNumber()?.nationalNumber ?? '') : raw.replace(/\D/g, '')
    const next = deleting ? raw : formatNational(digits, nextCountry)
    setText(next)
    if (detected) setCountry(detected)
    emit(next, nextCountry)
  }

  const handleCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as CountryCode
    setCountry(next)
    emit(text, next)
  }

  return (
    <>
      <Input
        {...rest}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        disabled={disabled}
        value={text}
        onChange={handleInput}
        prefix={
          <>
            <span>+{getCountryCallingCode(country)}</span>
            <ChevronDown aria-hidden="true" />
            <select
              className={styles.countrySelect}
              value={country}
              onChange={handleCountry}
              aria-label={countryLabel}
              disabled={disabled}
            >
              {options.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.name} +{getCountryCallingCode(o.code)}
                </option>
              ))}
            </select>
          </>
        }
      />
      {name && <input type="hidden" name={name} value={parsed?.number ?? ''} />}
    </>
  )
}
