import { useTranslation } from "react-i18next"
import { MapPin, ArrowRight, Radius, Info, Rss, Loader2, ShieldCheck, Calendar } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { useState } from "react"
import { BiddingPoolModal } from "./BiddingPoolModal"
import { BidCard } from "./BidCard"
import { useBiddingPool } from "../hooks/useBiddingPool"

interface MatchSidebarProps {
  zipCode: string
  discipline: string
}

export function MatchSidebar({ zipCode, discipline }: MatchSidebarProps) {
  const { t } = useTranslation('translation')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isBroadcastActive, bids, startBroadcast } = useBiddingPool()

  const handleBroadcastConfirm = () => {
    startBroadcast()
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Map Card */}
      <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[32px] overflow-hidden bg-white">
        <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80 M20 0 L20 100 M40 0 L40 100 M60 0 L60 100 M80 0 L80 100" stroke="#cbd5e1" strokeWidth="0.5" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">PATIENT LOCALE</span>
              <div className="flex items-center gap-1 text-slate-700 font-bold">
                <MapPin size={14} className="text-primary" />
                <span>Zip: {zipCode}</span>
              </div>
            </div>
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900 text-sm">
                  {t("cases.high_confidence_matches", { count: 3 })}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t("cases.proximity_matches_desc")}
                </p>
              </div>
            </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Radius size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("cases.radius_label")}</span>
                    <span className="text-sm font-bold text-slate-700">{t("cases.radius_match")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Info size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("common.discipline")}</span>
                    <span className="text-sm font-bold text-slate-700">{discipline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("portfolio.insurance")}</span>
                    <span className="text-sm font-bold text-slate-700">Medicare, Blue Shield</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("portfolio.availability")}</span>
                    <span className="text-sm font-bold text-slate-700">Mon, Wed, Fri</span>
                  </div>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>

      {/* Bidding Pool / Bids Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-800">
            {isBroadcastActive ? t("cases.bids_received_title") : t("cases.bidding_pool_title")}
          </h3>
          {!isBroadcastActive && (
            <p className="text-sm text-slate-500 leading-relaxed">
              {t("cases.bidding_pool_desc")}
            </p>
          )}
        </div>

        {isBroadcastActive ? (
          <div className="flex flex-col gap-4">
            {bids.length === 0 ? (
              <div className="p-8 rounded-[32px] bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-center">
                <Loader2 size={24} className="animate-spin text-primary/40" />
                <p className="text-xs text-slate-400 font-medium italic">{t("cases.waiting_for_providers")}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
                {bids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))}
              </div>
            )}
            
            <Button 
              disabled
              className="w-full rounded-full bg-slate-100 text-slate-400 font-bold h-12 flex items-center justify-center gap-2 border-none cursor-default"
            >
              <Rss size={18} className="animate-pulse" />
              {t("cases.broadcast_active")}
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12 flex items-center justify-center gap-2 border-none transition-all shadow-md shadow-primary/20"
          >
            {t("cases.push_to_bidding_pool")}
            <ArrowRight size={18} />
          </Button>
        )}
      </div>

      <BiddingPoolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBroadcastConfirm}
        zipCode={zipCode}
        discipline={discipline}
      />
    </div>
  )
}
