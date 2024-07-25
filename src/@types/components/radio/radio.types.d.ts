export { RadioProps, RadioOption };

interface RadioProps<T = string> {
  options: RadioOption<T>[];
  value: T;
  name: string;
  onChange: (val: T) => any;
  id?: string;
  className?: string;
}

interface RadioOption<T> {
  label: string;
  value: T;
}
