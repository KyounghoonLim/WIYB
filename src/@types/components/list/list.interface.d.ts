import { FC } from "react";

export { ListProps, ListItemProps };

interface ListProps<T = any> {
  items: T[];
  Component: FC<ListItemProps>;
  className?: string;
}

interface ListItemProps<T> {
  item: T;
  idx: number;
  [key: string]: any;
}
