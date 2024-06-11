import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Database } from "../types/types.d.ts";

/**
 * Creates a Supabase client for interacting with the Supabase database.
 * @param {string} url The URL of the Supabase project.
 * @param {string} key The Supabase project's API key.
 * @returns A Supabase client instance.
 */
export const supabase = createClient<Database>(
  "https://vygjxzhtqazwuskkaxpz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Z2p4emh0cWF6d3Vza2theHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTg2MjgsImV4cCI6MjAzMDU5NDYyOH0.7c2_7Hv_fcJchjmJ1amzNgAJVgrobMMOYKAZjB0uhIU"
);
