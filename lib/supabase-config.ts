import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from './environment';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
