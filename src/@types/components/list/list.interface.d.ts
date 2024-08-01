import { FC } from "react";

export { ListProps, ListItemProps };

interface ListProps<T = any> {
  items: T[];
  renderFunction: FC<{ item; idx }>;
  className?: string;
}

interface ListItemProps<T> {
  item: T;
  idx: number;
  [key: string]: any;
}
