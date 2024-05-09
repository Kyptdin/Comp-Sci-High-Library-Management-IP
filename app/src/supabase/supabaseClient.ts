import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";
const supabaseUrl = "https://vygjxzhtqazwuskkaxpz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Z2p4emh0cWF6d3Vza2theHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTg2MjgsImV4cCI6MjAzMDU5NDYyOH0.7c2_7Hv_fcJchjmJ1amzNgAJVgrobMMOYKAZjB0uhIU";
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
