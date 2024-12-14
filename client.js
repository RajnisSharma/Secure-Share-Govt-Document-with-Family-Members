import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zccxgaswklkkpmpxgluo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjY3hnYXN3a2xra3BtcHhnbHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MTIwMDYsImV4cCI6MjA0OTQ4ODAwNn0.Gs3BYF_MMdpJDxodqLh9Hc8LbAk1s0fzzohW5WkoSaE";
const CDNURL =
  "https://zccxgaswklkkpmpxgluo.supabase.co/storage/documents/file/";

export const supabase = createClient(supabaseUrl, supabaseKey);
