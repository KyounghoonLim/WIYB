import { FC } from "react";

export { BedgeProps };

interface BedgeProps {
  text?: string | number;
  icon?: FC<SVGProps<SVGElement>>;
  className?: string;
}
