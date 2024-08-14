import { CategoryProps } from "@/src/@types/components/category/category.interface";
import clsx from "clsx";
import React, { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";

export default function Category({ value, items, onChange, className }: CategoryProps) {
  const [category, setCategory] = useState<string>(value);

  const clickHandler = useCallback(
    (e: SyntheticEvent) => {
      const val = (e.target as HTMLElement).dataset.value;
      setCategory(val);
      onChange && onChange(val);
    },
    [onChange]
  );

  useLayoutEffect(() => {
    setCategory(value);
  }, [value]);

  return (
    <div className={clsx("category", className)}>
      {items.map((cat, idx) => (
        <div key={cat + "-" + idx} className="category-item" data-value={cat} data-selected={cat === value} onClick={clickHandler}>
          {cat}
        </div>
      ))}
    </div>
  );
}
