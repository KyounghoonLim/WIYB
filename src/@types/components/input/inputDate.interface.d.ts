export { InputDateProps };

interface InputDateProps {
  onChange: (d: Date | string) => any;
  id?: string;
  value?: Date | string;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}
