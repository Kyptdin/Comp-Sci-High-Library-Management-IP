/**
 * This file initializes a Supabase client using the supabase-js library to interact with the Supabase database.
 * It defines the Supabase URL and API key for authentication.
 * The `supabase` constant is exported, which represents the initialized Supabase client.
 */

import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

// Supabase URL and API key for authentication
const supabaseUrl = "https://vygjxzhtqazwuskkaxpz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Z2p4emh0cWF6d3Vza2theHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTg2MjgsImV4cCI6MjAzMDU5NDYyOH0.7c2_7Hv_fcJchjmJ1amzNgAJVgrobMMOYKAZjB0uhIU";

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
