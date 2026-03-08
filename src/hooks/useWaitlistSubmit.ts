import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface SubmitData {
  whatsapp_number: string
  name: string
  shop_name: string
  city: string
  jewelry_types: string[]
  how_did_you_hear?: string
  referral_code_used?: string
}

interface SubmitResult {
  referralCode: string
  referralLink: string
  userId: string
}

export const useWaitlistSubmit = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDuplicate, setIsDuplicate] = useState(false)

  const submit = async (data: SubmitData): Promise<SubmitResult | null> => {
    setLoading(true)
    setError(null)
    setIsDuplicate(false)

    try {
      // Step 1 — Check duplicate
      const { data: existing } = await supabase
        .from('waitlist')
        .select('id')
        .eq('whatsapp_number', data.whatsapp_number)
        .maybeSingle()

      if (existing) {
        setIsDuplicate(true)
        setError("This number is already on the waitlist! 🎉")
        setLoading(false)
        return null
      }

      // Step 2 — Generate referral code
      const { data: codeResult, error: rpcError } = await supabase.rpc('generate_referral_code')
      
      let myReferralCode: string
      if (rpcError || !codeResult) {
        // Fallback: generate client-side
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        myReferralCode = 'NAK-'
        for (let i = 0; i < 6; i++) myReferralCode += chars[Math.floor(Math.random() * chars.length)]
      } else {
        myReferralCode = codeResult
      }

      // Get stored referral code and plan interest
      const storedRef = localStorage.getItem('nakshi_ref_code')
      let referralCodeUsed = data.referral_code_used
      if (!referralCodeUsed && storedRef) {
        try {
          const parsed = JSON.parse(storedRef)
          if (parsed.expiry > Date.now()) referralCodeUsed = parsed.code
        } catch {
          // might be raw string
          referralCodeUsed = storedRef
        }
      }

      const planInterest = localStorage.getItem('nakshi_selected_plan') || 'unknown'

      // Step 3 — Insert to waitlist
      const { data: newEntry, error: insertError } = await supabase
        .from('waitlist')
        .insert({
          whatsapp_number: data.whatsapp_number,
          name: data.name,
          shop_name: data.shop_name,
          city: data.city,
          jewelry_types: data.jewelry_types,
          how_did_you_hear: data.how_did_you_hear || null,
          referral_code_used: referralCodeUsed || null,
          my_referral_code: myReferralCode,
          plan_interest: planInterest,
          is_founding_member: true,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Step 4 — If referral code was used, create referral entry
      if (referralCodeUsed) {
        const { data: referrer } = await supabase
          .from('waitlist')
          .select('id')
          .eq('my_referral_code', referralCodeUsed)
          .maybeSingle()

        if (referrer) {
          await supabase.from('referrals').insert({
            referrer_id: referrer.id,
            referee_id: newEntry.id,
            referral_code: referralCodeUsed,
            status: 'pending',
          })
        }
      }

      // Step 5 — Log event
      const sessionId = sessionStorage.getItem('nakshi_session_id') || crypto.randomUUID()
      sessionStorage.setItem('nakshi_session_id', sessionId)

      supabase.from('page_events').insert({
        event_name: 'waitlist_signup',
        page: 'homepage',
        whatsapp_number: data.whatsapp_number,
        waitlist_id: newEntry.id,
        session_id: sessionId,
        properties: {
          jewelry_types: data.jewelry_types,
          city: data.city,
          had_referral: !!referralCodeUsed,
        },
      }).then(() => {}) // fire and forget

      // Step 6 — Store in localStorage
      const referralLink = `${window.location.origin}/?ref=${myReferralCode}`
      localStorage.setItem('nakshi_user_refcode', myReferralCode)
      localStorage.setItem('nakshi_user_reflink', referralLink)
      localStorage.setItem('nakshi_user_id', newEntry.id)
      localStorage.setItem('nakshi_registered', 'true')
      localStorage.setItem('nakshi_user_phone', data.whatsapp_number)

      setLoading(false)
      return { referralCode: myReferralCode, referralLink, userId: newEntry.id }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Try again.')
      setLoading(false)
      return null
    }
  }

  return { submit, loading, error, isDuplicate }
}
