import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load .env.local from the project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteBlogsWithoutImages() {
  console.log('Fetching all blogs...');
  
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('id, title, image_url, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    process.exit(1);
  }

  console.log(`Total blogs found: ${blogs.length}`);

  const blogsWithoutImage = blogs.filter(blog => {
    return !blog.image_url || blog.image_url === null || blog.image_url.trim() === '';
  });

  console.log(`Blogs without images: ${blogsWithoutImage.length}`);

  if (blogsWithoutImage.length === 0) {
    console.log('No blogs to delete. All blogs have images.');
    return;
  }

  console.log('\nBlogs to be deleted:');
  blogsWithoutImage.forEach((blog, i) => {
    console.log(`  ${i + 1}. "${blog.title}" (ID: ${blog.id}, Created: ${blog.created_at})`);
  });

  const idsToDelete = blogsWithoutImage.map(blog => blog.id);
  
  const { error: deleteError, data: deleted } = await supabase
    .from('blogs')
    .delete()
    .in('id', idsToDelete)
    .select();

  if (deleteError) {
    console.error('Error deleting blogs:', deleteError);
    process.exit(1);
  }

  console.log(`\n✅ Successfully deleted ${deleted?.length || blogsWithoutImage.length} blogs without images.`);
}

deleteBlogsWithoutImages().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});