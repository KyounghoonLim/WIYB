import React from "react";

export { ButtonProps, SimpleButtonProps, IconSimpleButtonProps, ButtonChildren, ButtonChildrenArgs };

interface ButtonChildrenArgs {
  disabled?: boolean;
  isLoading?: boolean;
  [key: string]: any;
}

type ButtonChildren = (args: ButtonChildrenArgs) => React.ReactNode;

interface ButtonProps {
  children: ButtonChildren;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
  className?: string;
  onClick?: () => any | Promise<any>;
}

type SimpleButtonProps = Pick<ButtonProps, "type" | "disabled" | "onClick" | "className"> & {
  text?: string;
};

type IconSimpleButtonProps = SimpleButtonProps & { icon: string };
