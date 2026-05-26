import { cn } from "../../lib/utils"

export interface SegmentedTabOption<T extends string> {
  id: T
  label: string
  count?: number
}

interface SegmentedTabsProps<T extends string> {
  tabs: SegmentedTabOption<T>[]
  activeTab: T
  onTabChange: (tab: T) => void
  className?: string
}

export function SegmentedTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className,
}: SegmentedTabsProps<T>) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1 p-1 bg-slate-100 rounded-2xl",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 min-w-[120px] py-2.5 px-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2",
              isActive
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <span className="truncate">{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={cn(
                  "shrink-0 min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-extrabold flex items-center justify-center",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
