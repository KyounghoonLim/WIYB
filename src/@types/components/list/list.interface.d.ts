import { FC } from "react";

export { ListProps, ListItemProps };

interface ListProps<T = any> {
  items: T[];
  onClick: (item: T, idx: number) => any | Promise<any>;
  renderFunction: FC;
  className?: string;
}

interface ListItemProps<T> {
  item: T;
  idx: number;
}
