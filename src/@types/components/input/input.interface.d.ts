export { InputProps };

interface InputProps {
  onChange: (value: string) => any;
  type?: HTMLInputElement.type;
  value?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  icon?: FC<SVGElement>;
  errorMessage?: string;
  unit?: string;
  onFocus?: (value: string) => any;
  onBlur?: (value: string) => any;
  preprocessor?: (value: string) => string;
}
