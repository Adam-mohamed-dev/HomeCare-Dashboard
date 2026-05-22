import { useTranslation } from "react-i18next"
import { Star, Clock } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { Button } from "../../../components/ui/button"
import { Link } from "@tanstack/react-router"
import type { Bid } from "../types"

interface BidCardProps {
  bid: Bid
}

export function BidCard({ bid }: BidCardProps) {
  const { t } = useTranslation('translation')

  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[24px] bg-white overflow-hidden hover:ring-primary/30 transition-all">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar 
              name={bid.name} 
              image={bid.image} 
              className="h-10 w-10" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">{bid.name}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                  <Star size={10} className="fill-amber-500" />
                  {bid.rating}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">• {t("cases.bid_rate", { amount: bid.rate })}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium italic">
              <Clock size={10} />
              {t("cases.response_time", { time: bid.responseTime })}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Link to="/providers/$providerId" params={{ providerId: bid.providerId }} className="w-full">
            <Button variant="outline" className="w-full rounded-full border-slate-100 bg-slate-50 text-[11px] font-bold h-8 text-slate-600 hover:bg-slate-100">
              {t("cases.view_profile_btn")}
            </Button>
          </Link>
          <Button className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold h-8 border-none">
            {t("cases.accept_bid")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
