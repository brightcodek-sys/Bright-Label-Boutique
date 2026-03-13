/* BRIGHT LABEL: NEW DAWN - DATABASE CONNECTION */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 1. Replace these with your project details from the Supabase Dashboard
// Settings > API > Project URL & anon public key
const supabaseUrl = 'https://odhwnvvscquvoqyhgrlg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaHdudnZzY3F1dm9xeWhncmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTkxMTgsImV4cCI6MjA4ODg5NTExOH0.IlCMEvSQ0Ry1Wy3rFVhUx4mL4loopee8qEhmIexm9fw';

// 2. Initialize the Supabase Client
export const db = createClient(supabaseUrl, supabaseKey);
