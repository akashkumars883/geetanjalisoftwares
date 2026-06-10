import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findDuplicateBlogs() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('id, title, slug, created_at, category, excerpt')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total blogs: ${blogs.length}\n`);

  // Group by similar titles (case-insensitive, check for shared keywords)
  const keywordMap = {};

  blogs.forEach(blog => {
    const words = blog.title.toLowerCase().split(/\s+/);
    // Find key topic words (remove stop words)
    const topicWords = words.filter(w => 
      !['a', 'an', 'the', 'for', 'and', 'or', 'in', 'of', 'to', 'is', 'it', 'on', 'with', 'your', 'our', 'how', 'what', 'why', 'can', 'will', 'not', 'are', 'has', 'have', 'been', 'its', 'all', 'more', 'most', 'some', 'any', 'each', 'every', 'new', 'best', 'top', 'guide', 'tips', 'ways', 'ideas', 'need', 'help', 'using', 'based'].includes(w)
    );

    topicWords.forEach(word => {
      if (word.length > 3) {
        if (!keywordMap[word]) keywordMap[word] = [];
        keywordMap[word].push(blog);
      }
    });
  });

  // Find words that appear in 2+ blog titles
  console.log('=== DUPLICATE TOPIC CLUSTERS ===\n');
  let foundAny = false;
  
  Object.entries(keywordMap).forEach(([word, blogList]) => {
    const unique = [...new Map(blogList.map(b => [b.id, b])).values()];
    if (unique.length >= 2) {
      foundAny = true;
      console.log(`Topic cluster for keyword: "${word.toUpperCase()}" (${unique.length} posts)`);
      unique.forEach(b => {
        console.log(`  - ID: ${b.id} | "${b.title}" (${b.created_at?.slice(0, 10)})`);
      });
      console.log('');
    }
  });

  if (!foundAny) console.log('No duplicate topic clusters found.\n');

  // Also list all blog titles in order
  console.log('\n=== ALL BLOG TITLES (newest first) ===\n');
  blogs.forEach((b, i) => {
    console.log(`${i + 1}. [${b.id}] ${b.title} — ${b.created_at?.slice(0, 10)}`);
  });
}

findDuplicateBlogs();