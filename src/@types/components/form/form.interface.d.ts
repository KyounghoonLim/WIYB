export { FormProps }

interface FormProps {
  children: React.ReactNode
  onSubmit: () => any | Promise<any>
  className?: string
}
