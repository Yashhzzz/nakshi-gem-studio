import { supabase } from '@/lib/supabase'

const getSessionId = () => {
  let id = sessionStorage.getItem('nakshi_session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('nakshi_session_id', id)
  }
  return id
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  const storedRef = localStorage.getItem('nakshi_ref_code')
  let refCode: string | null = null
  if (storedRef) {
    try {
      const parsed = JSON.parse(storedRef)
      refCode = parsed.code || storedRef
    } catch {
      refCode = storedRef
    }
  }

  supabase.from('page_events').insert({
    event_name: eventName,
    page: window.location.pathname,
    whatsapp_number: localStorage.getItem('nakshi_user_phone') || null,
    waitlist_id: localStorage.getItem('nakshi_user_id') || null,
    properties: properties || {},
    referral_code: refCode,
    session_id: getSessionId(),
  }).then(() => {}) // fire and forget
}
