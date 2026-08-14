import fs from 'fs';
import path from 'path';

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      // Replace section paddings
      content = content.replace(/\bpt-24\b/g, 'pt-16');
      content = content.replace(/\bpt-28\b/g, 'pt-16');
      content = content.replace(/\bpy-20\b/g, 'py-10');
      content = content.replace(/\bpy-16\b/g, 'py-10');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated spacing in: ${fullPath}`);
      }
    }
  }
}

const targetApp = path.resolve('d:/Full Stack Dev/geetanjalisoftwares/app');
const targetComponents = path.resolve('d:/Full Stack Dev/geetanjalisoftwares/components');

processDirectory(targetApp);
processDirectory(targetComponents);
console.log('Padding reduction complete across app and components!');
