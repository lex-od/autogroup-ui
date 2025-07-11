import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from './environment';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getPublicUrl = (
  bucketName: string,
  filePath: string,
  options?: { download?: string | boolean; transform?: object },
) => {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath, options);
  return data.publicUrl;
};
