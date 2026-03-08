import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ReferrerInfo {
  code: string
  shopName?: string
  city?: string
  valid: boolean
}

export const useReferralCode = () => {
  const [referrer, setReferrer] = useState<ReferrerInfo | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')

    let code: string | null = null

    if (ref) {
      code = ref
      const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000
      localStorage.setItem('nakshi_ref_code', JSON.stringify({ code: ref, expiry }))
    } else {
      const stored = localStorage.getItem('nakshi_ref_code')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.expiry > Date.now()) {
            code = parsed.code
          } else {
            localStorage.removeItem('nakshi_ref_code')
          }
        } catch { /* ignore */ }
      }
    }

    if (code) {
      setLoading(true)
      supabase
        .from('waitlist')
        .select('shop_name, city')
        .eq('my_referral_code', code)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setReferrer({ code, shopName: data.shop_name, city: data.city, valid: true })
          } else {
            setReferrer({ code, valid: false })
          }
          setLoading(false)
        })
    }
  }, [])

  return { referrer, loading }
}
