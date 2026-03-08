import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://asliksvaqbrxzfsadgql.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbGlrc3ZhcWJyeHpmc2FkZ3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTg3MDEsImV4cCI6MjA4ODU3NDcwMX0.0ldF2dH0WVWf8Z9H0FNw9IQHD9JY1PbCjsAU2YcZOio'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
