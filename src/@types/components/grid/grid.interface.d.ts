import { FC } from "react";

export { GridProps };

interface GridProps<T> {
  items: T[];
  row?: number;
  col?: number;
  renderFunc?: FC<{ item; idx }>;
}
