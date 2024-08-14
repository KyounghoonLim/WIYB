import React, { FC, SVGProps } from "react";

export { ButtonProps };

interface ButtonProps {
  onClick?: () => any | Promise<any>;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
  className?: string;
  icon?: FC<SVGProps<SVGElement>>;
  text?: string;
}
