export { InputProps };

interface InputProps<T = string | number> {
  onChange: (value: T) => void;
  type?: HTMLInputElement.type;
  value?: T;
  placeholder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  icon?: FC<SVGElement>;
  errorMessage?: string;
  onFocus?: (value: T) => any;
  onBlur?: (value: T) => any;
  preprocessor?: (value: T) => string | number;
}
