import { useState, useEffect, useCallback } from "react"
import type { Bid } from "../types"

export function useBiddingPool() {
  const [isBroadcastActive, setIsBroadcastActive] = useState(false)
  const [bids, setBids] = useState<Bid[]>([])

  const startBroadcast = useCallback(() => {
    setIsBroadcastActive(true)
    setBids([])
  }, [])

  useEffect(() => {
    if (isBroadcastActive) {
      // Simulate bids arriving
      const timer1 = setTimeout(() => {
        setBids([{
          id: "bid-1",
          name: "Dr. Elena Rodriguez",
          image: "https://i.pravatar.cc/150?u=elena",
          rate: 145,
          responseTime: "2m",
          rating: 4.9,
          providerId: "dr-julianne-rhodes"
        }])
      }, 3000)

      const timer2 = setTimeout(() => {
        setBids(prev => [...prev, {
          id: "bid-2",
          name: "Michael Chen",
          image: "https://i.pravatar.cc/150?u=michael",
          rate: 138,
          responseTime: "5m",
          rating: 4.7,
          providerId: "dr-julianne-rhodes"
        }])
      }, 6000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isBroadcastActive])

  return {
    isBroadcastActive,
    bids,
    startBroadcast
  }
}
