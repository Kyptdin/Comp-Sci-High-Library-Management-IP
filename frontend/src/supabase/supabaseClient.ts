/**
 * This file initializes a Supabase client using the supabase-js library to interact with the Supabase database.
 * It defines the Supabase URL and API key for authentication.
 * The `supabase` constant is exported, which represents the initialized Supabase client.
 */

import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

// Supabase URL and API key for authentication
const supabaseUrl = "https://vygjxzhtqazwuskkaxpz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....";

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
