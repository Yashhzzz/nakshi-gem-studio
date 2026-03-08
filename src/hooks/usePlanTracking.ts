import { supabase } from '@/lib/supabase'

export const usePlanTracking = () => {
  const trackPlanView = (planName: string, price: number, billingCycle: 'monthly' | 'annual' = 'monthly') => {
    supabase.from('plan_interest').insert({
      plan_name: planName.toLowerCase(),
      plan_price: price,
      billing_cycle: billingCycle,
      action: 'viewed',
      whatsapp_number: localStorage.getItem('nakshi_user_phone') || null,
      waitlist_id: localStorage.getItem('nakshi_user_id') || null,
    }).then(() => {})
  }

  const trackPlanCTA = (planName: string, price: number, billingCycle: 'monthly' | 'annual' = 'monthly') => {
    localStorage.setItem('nakshi_selected_plan', planName.toLowerCase())
    supabase.from('plan_interest').insert({
      plan_name: planName.toLowerCase(),
      plan_price: price,
      billing_cycle: billingCycle,
      action: 'clicked_cta',
      whatsapp_number: localStorage.getItem('nakshi_user_phone') || null,
      waitlist_id: localStorage.getItem('nakshi_user_id') || null,
    }).then(() => {})
  }

  return { trackPlanView, trackPlanCTA }
}
