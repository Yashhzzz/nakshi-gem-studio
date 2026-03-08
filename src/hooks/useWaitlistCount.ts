import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export const useWaitlistCount = () => {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial count
    const fetchCount = async () => {
      const { count: total } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      setCount(total ?? 0)
      setLoading(false)
    }

    fetchCount()

    // Subscribe to realtime inserts
    const channel = supabase
      .channel('waitlist_count')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'waitlist',
      }, () => {
        setCount(prev => prev + 1)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { count, loading }
}
