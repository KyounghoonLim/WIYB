"use client";

import { RadioProps } from "@/src/@types/components/radio/radio.types";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";

export default function Radio<T = string>({ options, value, name, onChange, id, className }: RadioProps<T>) {
  const changeHandler = useCallback(
    (value) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <article id={id} className={clsx("radio", className)}>
      {options.map(({ label, value: val }, idx) => {
        const optionId = name + "-" + label + "-" + idx;
        return (
          <label key={optionId} htmlFor={optionId} className={clsx("radio-item", val === value && "!radio-selected")} title={label}>
            {label}
            <input id={optionId} type="radio" value={val as string} name={name} onChange={() => changeHandler(val)} className="hidden" />
          </label>
        );
      })}
    </article>
  );
}
// "use client";

// import { RadioProps } from "@/src/@types/components/radio/radio.types";
// import clsx from "clsx";
// import React, { useCallback, useMemo } from "react";

// export default function Radio<T = string>({ options, value, name, onChange, id, className }: RadioProps<T>) {
//   const eachWidth = useMemo(() => {
//     return `calc(calc(100% - calc(24px * ${options.length - 1})) / ${options?.length})`;
//   }, [options]);

//   const changeHandler = useCallback(
//     (value) => {
//       onChange && onChange(value);
//     },
//     [onChange]
//   );

//   return (
//     <article id={id} className={clsx("radio", className)}>
//       {options.map(({ label, value }, idx) => {
//         const optionId = label + "-" + idx;
//         return (
//           <label key={optionId} htmlFor={optionId} style={{ width: eachWidth }} className="radio-item" title={label}>
//             {label}
//             <input id={optionId} type="radio" value={value as string} name={name} onChange={() => changeHandler(value)} className="hidden" />
//           </label>
//         );
//       })}
//     </article>
//   );
// }
