export interface WaitlistEntry {
  id: string
  created_at: string
  whatsapp_number: string
  name: string
  shop_name: string
  city: string
  jewelry_types: string[]
  how_did_you_hear?: string
  referral_code_used?: string
  referred_by_user_id?: string
  my_referral_code: string
  plan_interest: string
  status: 'waitlist' | 'active' | 'churned' | 'blocked'
  is_founding_member: boolean
  admin_notes?: string
  contacted_at?: string
  converted_at?: string
}

export interface Referral {
  id: string
  created_at: string
  referrer_id: string
  referee_id: string
  referral_code: string
  referrer_reward_amount: number
  referee_discount_amount: number
  status: 'pending' | 'qualified' | 'reward_issued' | 'rejected'
  qualified_at?: string
  reward_issued_at?: string
}

export interface PlanInterest {
  id: string
  created_at: string
  waitlist_id?: string
  whatsapp_number?: string
  plan_name: 'starter' | 'growth' | 'pro' | 'studio'
  plan_price: number
  billing_cycle: 'monthly' | 'annual'
  action: 'viewed' | 'clicked_cta' | 'subscribed' | 'churned'
}

export interface WaitlistStats {
  total_signups: number
  today_signups: number
  total_referrals: number
  qualified_referrals: number
  top_cities: { city: string; count: number }[]
  plan_interest: { plan_name: string; count: number }[]
}
