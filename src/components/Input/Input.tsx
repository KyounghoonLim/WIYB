"use client";

import React, { ForwardedRef, forwardRef, SyntheticEvent, useCallback, useMemo, useRef, useState } from "react";
// import { useSetRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
// import ShowIcon from "assets/icons/input/show.svg";
// import HideIcon from "assets/icons/input/hide.svg";
// import RemoveIcon from "assets/icons/input/remove.svg";
import InputError from "./InputError";
import clsx from "clsx";
// import { isShowKeyboardState } from "store/appStore";
import { InputProps } from "@/src/@types/components/input/input.interface";

function Input(
  {
    type = "text",
    value = "",
    placeholder = "",
    id,
    disabled = false,
    maxLength = 30,
    errorMessage,
    className,
    onChange,
    onFocus,
    onBlur,
    preprocessor = inputPreprocessor,
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  // const setIsShowKeyboard = useSetRecoilState(isShowKeyboardState);

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  // password type 인 경우, hide / show 가능하게 하는 변수 //
  const inputType = useMemo(() => {
    if (type !== "password") return type;
    else if (isHide) return "password";
    else return "text";
  }, [type, isHide]);

  // const iconSwitch = useMemo(() => {
  //   if (type === "password") {
  //     return isHide ? ShowIcon : HideIcon;
  //   } else return RemoveIcon;
  // }, [type, isHide]);

  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      onChange(preprocessor((e.target as HTMLInputElement).value));
    },
    [preprocessor, onChange]
  );

  const focusHandler = useCallback(
    (e: SyntheticEvent) => {
      try {
        inputRef.current?.setSelectionRange(value?.length, value?.length);
      } catch {
        /// pass ///
      } finally {
        setIsFocus(true);
        onFocus?.(value);
      }
    },
    [inputRef.current, isMobile, value, onFocus]
  );

  const blurHandler = useCallback(() => {
    if (!isHover) {
      setIsFocus(false);
      setIsHide(true);
    }
    // setIsShowKeyboard(false);
    onBlur && onBlur(value);
  }, [isHover, value, onBlur]);

  const iconClickHandler = useCallback(() => {
    if (type === "password") setIsHide(!isHide);
    else onChange("");
    inputRef.current?.focus();
  }, [type, isHide]);

  return (
    <div className="flex w-full flex-col" data-prevent-close-keyboard="true">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          id={id}
          className={clsx("input-basic", errorMessage && "input-error", className)}
          type={inputType}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          autoComplete={"off"}
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
  );
}

export default React.memo(Input);

function inputPreprocessor(text: string) {
  return text.trim();
}
