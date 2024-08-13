'use client'

import React, {
  ForwardedRef,
  forwardRef,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
// import { useSetRecoilState } from "recoil";
import { isMobile } from 'react-device-detect'
// import ShowIcon from "assets/icons/input/show.svg";
// import HideIcon from "assets/icons/input/hide.svg";
// import RemoveIcon from "assets/icons/input/remove.svg";
import InputError from './InputError'
import clsx from 'clsx'
// import { isShowKeyboardState } from "store/appStore";
import { InputProps } from '@/src/@types/components/input/input.interface'

function Input(
  {
    type = 'text',
    value,
    placeholder = '',
    id,
    disabled = false,
    maxLength = 100,
    icon,
    errorMessage,
    className,
    unit,
    onChange,
    onFocus,
    onBlur,
    preprocessor,
  }: InputProps,
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  // const setIsShowKeyboard = useSetRecoilState(isShowKeyboardState);

  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isHide, setIsHide] = useState<boolean>(true)
  const [isHover, setIsHover] = useState<boolean>(false)

  // password type 인 경우, hide / show 가능하게 하는 변수 //
  const inputType = useMemo(() => {
    if (type !== 'password') return type
    else if (isHide) return 'password'
    else return 'text'
  }, [type, isHide])

  // const iconSwitch = useMemo(() => {
  //   if (type === "password") {
  //     return isHide ? ShowIcon : HideIcon;
  //   } else return RemoveIcon;
  // }, [type, isHide]);

  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement
      if (!preprocessor) onChange(value)
      else onChange(preprocessor(value))
    },
    [preprocessor, onChange]
  )

  const focusHandler = useCallback(
    (e: SyntheticEvent) => {
      try {
        const v = String(value)
        inputRef.current?.setSelectionRange(v?.length, v?.length)
      } catch {
        /// pass ///
      } finally {
        setIsFocus(true)
        onFocus?.(value)
      }
    },
    [inputRef.current, isMobile, value, onFocus]
  )

  const blurHandler = useCallback(() => {
    if (!isHover) {
      setIsFocus(false)
      setIsHide(true)
    }
    // setIsShowKeyboard(false);
    onBlur && onBlur(value)
  }, [isHover, value, onBlur])

  const iconClickHandler = useCallback(() => {
    if (type === 'password') setIsHide(!isHide)
    else onChange(null)
    inputRef.current?.focus()
  }, [type, isHide])

  return (
    <div className="flex w-full flex-col" data-prevent-close-keyboard="true">
      <div className="relative input-wrapper">
        {icon && icon({ className: 'ml-4' })}
        <input
          ref={(ele) => {
            inputRef.current = ele
            if (ref) {
              ref.current = ele
            }
          }}
          id={id}
          className={clsx('input-basic', errorMessage && 'input-error', className)}
          type={inputType}
          //@ts-ignore
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          autoComplete={'off'}
          disabled={disabled}
          data-prevent-close-keyboard="true"
          spellCheck={false}
        />
        {/* <img
          className={"absolute right-3 cursor-pointer " + (value && (isFocus || isHover) ? "visible" : "invisible")}
          src={iconSwitch}
          alt=""
          onTouchStart={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={iconClickHandler}
          data-prevent-close-keyboard="true"
        /> */}
      </div>
      <InputError errorMessage={errorMessage} />
    </div>
  )
}

export default React.memo(forwardRef(Input))
