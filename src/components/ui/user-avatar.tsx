import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { cn } from "../../lib/utils"

interface UserAvatarProps {
  name: string
  image?: string
  initials?: string
  className?: string
  fallbackClassName?: string
}

export function UserAvatar({ name, image, initials, className, fallbackClassName }: UserAvatarProps) {
  const displayInitials = initials || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <Avatar className={cn("ring-2 ring-slate-50", className)}>
      {image && <AvatarImage src={image} alt={name} />}
      <AvatarFallback className={cn("bg-slate-100 text-slate-600 font-bold", fallbackClassName)}>
        {displayInitials}
      </AvatarFallback>
    </Avatar>
  )
}
