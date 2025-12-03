import cn from "../../libs/cn"

const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/60",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    outline: "border border-primary text-primary hover:bg-slate-50",
    ghost: "hover:underline text-primary",
    link: "text-primary underline-offset-4 hover:underline p-0 bg-transparent",
  }

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "cursor-pointer rounded-full inline-flex items-center gap-2",
        variants[variant],
        sizes[size],
        className,
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      {Icon && iconPosition === "left" && <Icon size={18} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={18} />}
    </button>
  )
}

export default Button
