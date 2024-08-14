export { CategoryProps };

interface CategoryProps {
  value: string;
  items: string[];
  onChange?: (value: string) => any;
  className?: string;
}
