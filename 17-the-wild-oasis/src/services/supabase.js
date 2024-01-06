import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://uzvhaytclehslkrlcxwy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6dmhheXRjbGVoc2xrcmxjeHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1MTUwOTMsImV4cCI6MjAyMDA5MTA5M30.pMxYmAOb3RPVnh7WuyAcN7RgDw_bnJS0WxfdQhlCMqw";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;