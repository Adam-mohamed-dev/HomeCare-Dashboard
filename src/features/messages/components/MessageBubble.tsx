import { cn } from "../../../lib/utils"

interface MessageBubbleProps {
  text: string
  time: string
  isMe: boolean
}

export function MessageBubble({ text, time, isMe }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex flex-col gap-2 max-w-[70%]",
      isMe ? "self-end" : "self-start"
    )}>
      <div className={cn(
        "p-4 rounded-[24px] text-sm shadow-sm",
        isMe 
          ? "rounded-br-none bg-primary text-white shadow-primary/20" 
          : "rounded-bl-none bg-white border border-slate-100 text-slate-700"
      )}>
        {text}
      </div>
      <span className={cn(
        "text-[10px] text-slate-400 font-medium px-2",
        isMe ? "text-right" : "text-left"
      )}>
        {time}
      </span>
    </div>
  )
}
