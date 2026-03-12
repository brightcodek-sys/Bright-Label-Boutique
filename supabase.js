/* BRIGHT LABEL: NEW DAWN - DATABASE CONNECTION */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 1. Replace these with your project details from the Supabase Dashboard
// Settings > API > Project URL & anon public key
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-public-key-goes-here';

// 2. Initialize the Supabase Client
export const db = createClient(supabaseUrl, supabaseKey);
