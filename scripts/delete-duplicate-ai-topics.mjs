import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// IDs to DELETE (keeping only the best/most recent from each duplicate cluster)
const idsToDelete = [
  // CLUSTER 1: "AI Website Automation Tools" — 4 posts on same topic
  // Keeping: "Mastering AI Website Automation Tools for Business Growth in 2026" (Jun 7)
  // Deleting:
  "5c97e3d6-7b14-437e-a121-98181bb863f5", // "How to Use AI Website Automation Tools for Growth in 2026" (Jun 5)
  "05c9d363-5ccc-4793-84b7-2ce22db855ea", // "Scaling Efficiently With AI Website Automation Tools in 2026" (Jun 3)
  "a0383942-6549-4a1d-bdf0-367546e85629", // "How to Use AI Website Automation Tools for Small Business Growth in 2026" (May 24)

  // CLUSTER 2: "Scaling Operations/Workflows" — 2 posts
  // Keeping: "Scaling Business Operations With Autonomous AI Workflows 2026" (Jun 4)
  "aa853807-acf8-4d3e-94d3-f8c89cdab068", // "Scaling Operations Through Autonomous AI Workflows in 2026" (Jun 1)

  // CLUSTER 3: "Why AI Integration" — 2 posts
  // Keeping: "Why AI Website Integration For Business Is Vital In 2026" (May 22)
  "32f6e49a-a010-462b-a4e9-2c5ac8c6efcf", // "Why AI Integration for Business Websites is Essential for 2026" (May 21)

  // CLUSTER 4: "Mastering AI Search" — 2 posts
  // Keeping: "Mastering AI Search Optimization for Your Business in 2026" (May 20)
  "f9a0dbad-f7b1-4e8a-a911-ad8c2d3f5812", // "Mastering AI Search Engine Optimization for 2026" (May 19)

  // CLUSTER 5: "Autonomous Agents" — 2 posts
  // Keeping: "Why Autonomous Agents Are Rewriting Your Business Workflow" (May 17)
  "640a009b-03ad-40e3-9e4f-5665a989f263", // "Why Autonomous Agents Are Ending the Subscription Fatigue" (May 16)

  // CLUSTER 6: "Predictive AI Business" — 2 posts
  // Keeping: "Predictive AI for Business Operations Transforming Small Enterprises" (May 31)
  "f96e4387-8f6e-4500-9b44-38d40b9b19af", // "How Predictive AI Business Automation Eliminates Bottlenecks" (May 25)

  // Bonus: "How to Scale Your Business Using AI Business Automation Strategies" (Jun 2)
  // is similar to the "Scaling" cluster
  "7dfa4fe4-e974-4150-8ae5-0c8174fdb04e", // "How to Scale Your Business Using AI Business Automation Strategies" (Jun 2)
];

async function deleteDuplicates() {
  console.log(`Will delete ${idsToDelete.length} duplicate blog posts...\n`);

  // First show what will be deleted
  const { data: toDelete, error: fetchError } = await supabase
    .from('blogs')
    .select('id, title, created_at')
    .in('id', idsToDelete);

  if (fetchError) {
    console.error('Error fetching blogs to delete:', fetchError);
    return;
  }

  console.log('Blogs to DELETE:');
  toDelete.forEach(b => {
    console.log(`  - "${b.title}" (${b.created_at?.slice(0, 10)})`);
  });

  // Show what will be kept
  const keepIds = [
    "bf00c74d-8450-41fd-9ef2-1c1bf85f1e83", // "Mastering AI Website Automation Tools for Business Growth in 2026"
    "699eebd1-7a78-4275-802f-70cb7e2b8112", // "Scaling Business Operations With Autonomous AI Workflows 2026"
    "3d3d56fb-9bbf-4859-b914-bf244023d30f", // "Why AI Website Integration For Business Is Vital In 2026"
    "083da608-c219-40f4-a948-b06d305b8d85", // "Mastering AI Search Optimization for Your Business in 2026"
    "584b1f49-9db1-41c9-a66a-e9087ac2c5b0", // "Why Autonomous Agents Are Rewriting Your Business Workflow"
    "a511e309-71d5-4bca-9cda-4880522caeb5", // "Predictive AI for Business Operations Transforming Small Enterprises"
    "e715495c-1553-49eb-87a5-ff470c690fea", // "Effective Business Growth Strategies 2026 Using AI Automation"
  ];

  const { data: kept } = await supabase
    .from('blogs')
    .select('id, title, created_at')
    .in('id', keepIds);

  console.log('\nBlogs KEPT (best version of each topic):');
  kept.forEach(b => {
    console.log(`  ✓ "${b.title}" (${b.created_at?.slice(0, 10)})`);
  });

  // Confirm and delete
  const { error: deleteError } = await supabase
    .from('blogs')
    .delete()
    .in('id', idsToDelete);

  if (deleteError) {
    console.error('\n❌ Error deleting:', deleteError);
    return;
  }

  console.log(`\n✅ Successfully deleted ${toDelete.length} duplicate blog posts!`);
  console.log(`Total remaining: 25 - ${toDelete.length} = ${25 - toDelete.length} blogs`);
}

deleteDuplicates().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});