import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yqpfgondzklzrrqnrgrs.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY ?? 'default-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase