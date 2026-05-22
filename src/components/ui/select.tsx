import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: SelectOption[]
  onValueChange?: (value: string) => void
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, options, onValueChange, placeholder, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onValueChange?.(e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className="relative w-full group">
        <select
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all cursor-pointer",
            className
          )}
          ref={ref}
          onChange={handleChange}
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options ? (
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>
        <ChevronDown 
          className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" 
        />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
