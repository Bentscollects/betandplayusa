import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('[supabase.js] URL:', supabaseUrl ? '✓' : '✗', supabaseUrl?.substring(0, 20) + '...')
console.log('[supabase.js] ANON_KEY:', supabaseAnonKey ? '✓' : '✗')
console.log('[supabase.js] SERVICE_KEY:', serviceRoleKey ? '✓' : '✗')

let supabase
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('[supabase.js] ✓ Anon client created')
} else {
  console.warn('[supabase.js] Using fallback anon client')
  supabase = createClient('http://localhost', 'public-anon-key')
}

let supabaseAdmin
if (supabaseUrl && serviceRoleKey) {
  console.log('[supabase.js] ✓ Creating admin client')
  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  })
} else {
  console.warn('[supabase.js] Admin client will be null')
  supabaseAdmin = null
}

export { supabase, supabaseAdmin }
