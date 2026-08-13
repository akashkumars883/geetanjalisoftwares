import { createClient } from "@supabase/supabase-js";
import fs from "fs";

let envVars = {};
try {
  const envContent = fs.readFileSync(".env.local", "utf8");
  envContent.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      envVars[parts[0].trim()] = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
} catch (e) {}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || "https://juvkrpmrmjhhbnhxuwmd.supabase.co";
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkSubscribersTable() {
  try {
    const { data, error } = await supabase.from("subscribers").select("*").limit(5);
    if (error) {
      console.log("Subscribers Table Status:", error.message);
    } else {
      console.log("Subscribers Table Exists! Rows:", data?.length || 0, data);
    }
  } catch (e) {
    console.log("Exception checking subscribers:", e.message);
  }
}

checkSubscribersTable();
