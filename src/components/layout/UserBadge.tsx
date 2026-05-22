import { User } from "lucide-react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback } from "../ui/avatar"

interface UserBadgeProps {
  className?: string
  iconClassName?: string
  size?: number
}

export function UserBadge({ className, iconClassName, size = 20 }: UserBadgeProps) {
  return (
    <Avatar className={cn("bg-primary shadow-sm shrink-0", className)}>
      <AvatarFallback className="bg-primary text-primary-foreground">
        <User 
          className={cn(iconClassName)} 
          size={size} 
        />
      </AvatarFallback>
    </Avatar>
  )
}
