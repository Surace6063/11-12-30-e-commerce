import cn from "@/libs/cn";
import * as LabelPrimitive from "@radix-ui/react-label";

function Textarea({
  className,
  type,
  label = "",
  id = "",
  error = "",
  ...props
}) {
  return (
    <>
      {label && (
        <LabelPrimitive.Root
          data-slot="label"
          id={id}
          className={cn(
            "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            error && "text-destructive"
          )}
        >
          {label}
        </LabelPrimitive.Root>
      )}
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          error && "border-destructive focus-visible:ring-destructive/50"
        )}
        {...props}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </>
  );
}

export { Textarea };
