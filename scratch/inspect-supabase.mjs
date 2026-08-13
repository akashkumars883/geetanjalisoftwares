import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key && !key.startsWith('#')) {
      envVars[key] = val;
    }
  }
});

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.SUPABASE_SERVICE_ROLE_KEY;

console.log('Connecting to Supabase URL:', url);
const supabase = createClient(url, key);

async function inspectTables() {
  const tableCandidates = [
    'blogs',
    'leads',
    'careers',
    'settings',
    'portfolio',
    'services',
    'users',
    'contacts',
    'jobs'
  ];

  for (const table of tableCandidates) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) {
        console.log(`❌ Table '${table}': ${error.message}`);
      } else {
        console.log(`\n========================================`);
        console.log(`✅ Table '${table}': ${data.length} records found.`);
        if (data.length > 0) {
          console.log(`   Sample columns:`, Object.keys(data[0]));
          console.log(`   Sample item 1:`, JSON.stringify(data[0], null, 2));
        }
      }
    } catch (e) {
      console.log(`⚠️ Exception querying '${table}':`, e.message);
    }
  }
}

inspectTables();
