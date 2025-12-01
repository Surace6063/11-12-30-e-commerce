import clsx from "clsx"

const MaxWidthContainer = ({children,className}) => {
  return (
    <div className={clsx('max-w-7xl mx-auto px-4 md:px-6',className)}>
        {children}
    </div>
  )
}
export default MaxWidthContainer