import { Search } from "lucide-react"
import { Input } from "./input"
import { cn } from "../../lib/utils"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full lg:flex-1", className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <Input
        placeholder={placeholder}
        className="pl-10 h-12 rounded-full border-none bg-white shadow-sm ring-1 ring-slate-200 focus-visible:ring-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
