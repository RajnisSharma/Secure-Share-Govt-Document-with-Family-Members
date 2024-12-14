import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "";
const supabaseKey =
  "";
const CDNURL =
  "https://zccxgaswklkkpmpxgluo.supabase.co/storage/documents/file/";

export const supabase = createClient(supabaseUrl, supabaseKey);
