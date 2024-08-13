import clsx from 'clsx'
import React, { useCallback, useContext, useMemo, useRef } from 'react'
import InputError from './InputError'
import { localeContext } from 's/providers/localeProvider'
import { InputDateProps } from 't/components/input/inputDate.interface'
import { LOCALE } from 'c/locale.constant'
import { dateToString, getDateFormat } from 'u/dateUtils'

export default function InputDate({
  onChange,
  id,
  value,
  placeholder,
  errorMessage,
  className,
}: InputDateProps) {
  const { locale } = useContext(localeContext)

  const inputRef = useRef<HTMLInputElement>()
  const selectedRef = useRef<'y' | 'm' | 'd'>()

  const dateFormat = useMemo(() => getDateFormat(locale), [locale])

  const focusHandler = useCallback(() => {
    const v = inputRef.current?.value
    if (value || (v && v !== dateFormat)) return
    else {
      inputRef.current.value = dateFormat
      onChange(dateFormat)
      setTimeout(() => {
        switch (locale) {
          case LOCALE.EN:
            inputRef.current.setSelectionRange(0, 2)
            break
          default:
            inputRef.current.setSelectionRange(0, 4)
            break
        }
      }, 0)
    }
  }, [value, locale])

  const blurHandler = useCallback(() => {
    const v = inputRef.current?.value
    if (v && v !== dateFormat) {
      /// pass
    } else {
      onChange(null)
      inputRef.current.value = null
    }
    window.getSelection().removeAllRanges()
    selectedRef.current = null
  }, [value, locale])

  const changeHandler = useCallback(() => {
    const v = inputRef.current?.value
    if (['Y', 'M', 'D'].some((t) => v.includes(t))) {
      onChange(v)
    } else {
      const t = v.split('.')
      let Y, M, D
      if (locale === LOCALE.EN) {
        ;(Y = t[2]), (M = t[0]), (D = t[1])
      } else {
        ;(Y = t[0]), (M = t[1]), (D = t[2])
      }
      if (Number(Y) < 50) onChange(v)
      else if (M === '00') onChange(v)
      else if (D === '00') onChange(v)
      else {
        onChange(new Date(Y, Number(M) - 1, D))
      }
    }
  }, [locale])

  const selectHandler = useCallback(() => {
    const i = inputRef.current
    const s = i.selectionStart

    switch (locale) {
      case LOCALE.EN: {
        if (s < 3) {
          i.setSelectionRange(0, 2)
          selectedRef.current = 'm'
        } else if (s < 6) {
          i.setSelectionRange(3, 5)
          selectedRef.current = 'd'
        } else {
          i.setSelectionRange(6, 10)
          selectedRef.current = 'y'
        }
        break
      }
      default: {
        if (s < 5) {
          i.setSelectionRange(0, 4)
          selectedRef.current = 'y'
        } else if (s < 8) {
          i.setSelectionRange(5, 7)
          selectedRef.current = 'm'
        } else {
          i.setSelectionRange(8, 10)
          selectedRef.current = 'd'
        }
        break
      }
    }
  }, [locale])

  const keydownHandler = useCallback(
    (e) => {
      const { key } = e
      const i = inputRef.current
      const s = i.selectionStart
      const sel = selectedRef.current

      /// 0: prev, 1: next ///
      const changeSelection = (to: 0 | 1) => {
        switch (to) {
          case 0: {
            switch (sel) {
              case 'y': {
                if (locale === LOCALE.EN) i.setSelectionRange(3, 5)
                else return
                break
              }
              case 'm': {
                if (locale === LOCALE.EN) return
                else i.setSelectionRange(0, 4)
                break
              }
              case 'd': {
                if (locale === LOCALE.EN) i.setSelectionRange(0, 2)
                else i.setSelectionRange(5, 7)
                break
              }
            }
            break
          }
          case 1: {
            switch (sel) {
              case 'y': {
                if (locale === LOCALE.EN) return
                else i.setSelectionRange(5, 7)
                break
              }
              case 'm': {
                if (locale === LOCALE.EN) i.setSelectionRange(3, 5)
                else i.setSelectionRange(8, 10)
                break
              }
              case 'd': {
                if (locale === LOCALE.EN) i.setSelectionRange(6, 10)
                else return
                break
              }
            }
            break
          }
        }
      }

      const resetSelectedValue = () => {
        const v = inputRef.current?.value
        const temp = v.split('.')
        switch (sel) {
          case 'y': {
            const idx = locale === LOCALE.EN ? 2 : 0
            temp[idx] = 'YYYY'
            break
          }
          case 'm': {
            const idx = locale === LOCALE.EN ? 0 : 1
            temp[idx] = 'MM'
            break
          }
          case 'd': {
            const idx = locale === LOCALE.EN ? 1 : 2
            temp[idx] = 'DD'
            break
          }
        }
        i.value = temp.join('.')
        i.setSelectionRange(s, s + 1)
        changeHandler()
      }

      if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
        switch ((key as string).toLowerCase()) {
          case 'tab': {
            if ((locale === LOCALE.EN && sel === 'y') || (locale !== LOCALE.EN && sel === 'd'))
              return
            else {
              e.preventDefault()
              changeSelection(1)
            }
            break
          }
          case 'arrowleft': {
            changeSelection(0)
            break
          }
          case 'arrowright': {
            changeSelection(1)
            break
          }
          case 'backspace': {
            e.preventDefault()
            resetSelectedValue()
            break
          }
          case 'delete': {
            e.preventDefault()
            resetSelectedValue()
            break
          }
          default:
            return
        }
      } else {
        e.preventDefault()
        const v = inputRef.current?.value
        const temp = v.split('.')
        let target: number

        switch (sel) {
          case 'y': {
            const idx = locale === LOCALE.EN ? 2 : 0
            let y: string = temp[idx]
            if (y[0] !== 'Y' && y[0] !== '0') {
              y = 'YYYY'
            }
            y = (y.replaceAll('Y', '0') + key.toString()).slice(1, 5)

            if (y[0] !== ('Y' as string) && y[0] !== ('0' as string)) {
              target = Infinity
            } else {
              target = s
            }
            temp[idx] = y
            break
          }
          case 'm': {
            const idx = locale === LOCALE.EN ? 0 : 1
            let m: string = temp[idx]
            if (
              (m[0] !== 'M' && m[0] !== '0') ||
              (m[0] === '0' && Number(m[1]) > 1) ||
              (m[1] === '1' && key > 2)
            ) {
              m = 'MM'
            }
            m = (m.replaceAll('M', '0') + key.toString()).slice(1, 3)

            if ((m[0] !== 'M' && m[0] !== '0') || (m[0] === '0' && Number(m[1]) > 1)) {
              target = Infinity
            } else {
              target = s
            }
            temp[idx] = m
            break
          }
          case 'd': {
            const idx = locale === LOCALE.EN ? 1 : 2
            let d: string = temp[idx]

            if (
              (d[0] !== 'D' && d[0] !== '0') ||
              (d[0] === '0' && Number(d[1]) > 3) ||
              (d[1] === '3' && key > 1)
            ) {
              d = 'DD'
            }
            d = (d.replaceAll('D', '0') + key.toString()).slice(1, 3)

            if ((d[0] !== 'D' && d[0] !== '0') || (d[0] === '0' && Number(d[1]) > 3)) {
              target = Infinity
            } else {
              target = s
            }
            temp[idx] = d
            break
          }
        }
        i.value = temp.join('.')
        changeHandler()
        if (target === null || target === undefined) return
        else if (target === Infinity) changeSelection(1)
        else {
          i.setSelectionRange(target, target + 1)
        }
      }
    },
    [locale]
  )

  return (
    <div className="flex w-full flex-col" data-prevent-close-keyboard="true">
      <div className="relative flex items-center">
        <input
          id={id}
          ref={inputRef}
          className={clsx('input-basic', errorMessage && 'input-error', className)}
          type="text"
          value={typeof value === 'string' ? value : dateToString(value, locale)}
          placeholder={placeholder || dateFormat}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onKeyDown={keydownHandler}
          onSelect={selectHandler}
          // onChange={() => null}
          autoComplete={'off'}
          inputMode="decimal"
          // readOnly
        />
      </div>
      <InputError errorMessage={errorMessage} />
    </div>
  )
}
