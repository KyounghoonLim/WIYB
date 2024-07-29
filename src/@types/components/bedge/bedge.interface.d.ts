import { FC } from "react";

export { BedgeProps };

interface BedgeProps {
  text?: string;
  icon?: FC<SVGProps<SVGElement>>;
  className?: string;
}
