import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkImages() {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('id, title, image_url, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total blogs: ${blogs.length}\n`);
  
  blogs.forEach((b, i) => {
    const urlValid = b.image_url && b.image_url.trim() !== '';
    const isPixabay = b.image_url?.includes('pixabay.com');
    const isSupabase = b.image_url?.includes('supabase.co');
    const isLocal = b.image_url?.startsWith('/');
    const isOtherExternal = b.image_url?.startsWith('http') && !isPixabay && !isSupabase;
    
    console.log(`${i + 1}. [${b.id?.slice(0,8)}] ${b.title?.slice(0, 50)}`);
    console.log(`   Image: ${urlValid ? (b.image_url?.slice(0, 80) + '...') : 'EMPTY!'}`);
    console.log(`   Type: ${!urlValid ? '❌ MISSING' : isPixabay ? '📸 Pixabay' : isSupabase ? '🗄️ Supabase' : isLocal ? '📁 Local' : isOtherExternal ? '🌐 External' : '❓ Unknown'}`);
    console.log('');
  });
}

checkImages();