import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read .env.local manually
let envVars = {};
try {
  const envContent = fs.readFileSync(".env.local", "utf8");
  envContent.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      envVars[parts[0].trim()] = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
} catch (e) {
  console.log("Could not read .env.local:", e.message);
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || "https://juvkrpmrmjhhbnhxuwmd.supabase.co";
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

console.log("Connecting to Supabase URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTables() {
  const tableNames = ["inquiries", "contacts", "contact_inquiries", "contact_messages", "leads", "messages"];

  for (const name of tableNames) {
    try {
      const { data, error } = await supabase.from(name).select("*").limit(5);
      if (error) {
        console.log(`Table '${name}': Error ->`, error.message);
      } else {
        console.log(`Table '${name}': Found ${data?.length || 0} rows ->`, data);
      }
    } catch (e) {
      console.log(`Table '${name}': Exception ->`, e.message);
    }
  }
}

checkTables();
