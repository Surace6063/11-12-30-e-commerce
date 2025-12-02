import clsx from "clsx"
import { twMerge } from 'tailwind-merge'
import cn from "../../libs/cn"

const Button = ({children,className,variant="primary",size="md"}) => {

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/60",
        ghost: "hover:underline text-primary",
    }

    const sizes = {
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3'
    }
   
  return (
    <button className={cn('cursor-pointer px-2  rounded-full',className,variants[variant],sizes[size])}>
        {children}
    </button>
  )
}
export default Button