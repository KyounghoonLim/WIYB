import { localeContext } from "@/app/[locale]/layout";
import { InputDateProps } from "@/src/@types/components/input/inputDate.interface";
import { dateToString, getDateFormat } from "@/src/utils/dateUtils";
import clsx from "clsx";
import React, { SyntheticEvent, useCallback, useContext, useMemo, useRef } from "react";
import InputError from "./InputError";

export default function InputDate_System({ onChange, id, value, placeholder, errorMessage, className }: InputDateProps) {
  const { locale } = useContext(localeContext);

  const inputRef = useRef<HTMLInputElement>();
  const { current: maxDate } = useRef<string>(dateToString(new Date(Date.now())));

  const dateFormat = useMemo(() => getDateFormat(locale), [locale]);

  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement;
      onChange(value);
    },
    [onChange]
  );

  return (
    <div className="flex w-full flex-col" data-prevent-close-keyboard="true">
      <div className="relative flex items-center">
        <input
          id={id}
          ref={inputRef}
          className={clsx("input-basic", errorMessage && "input-error", className)}
          type="date"
          value={typeof value === "string" ? value : dateToString(value, locale)}
          // placeholder={placeholder || dateFormat}
          onChange={changeHandler}
          autoComplete={"off"}
          inputMode="decimal"
          data-placeholder={placeholder || dateFormat}
          pattern={dateFormat}
          max={maxDate}
          required
          // readOnly
        />
      </div>
      <InputError errorMessage={errorMessage} />
    </div>
  );
}
