import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://juvkrpmrmjhhbnhxuwmd.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Public client for client components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Privileged admin client for server components and API routes
export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : supabase;
