import fs from 'fs';
import path from 'path';

const dirsToScan = [
  'd:/Full Stack Dev/geetanjalisoftwares/components',
  'd:/Full Stack Dev/geetanjalisoftwares/app',
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

let modifiedCount = 0;

dirsToScan.forEach((dir) => {
  const files = getAllFiles(dir);
  files.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace larger border radius utilities with rounded-md
    // Match rounded-3xl, rounded-2xl, rounded-xl, rounded-lg, rounded-full
    const updatedContent = content
      .replace(/rounded-(3xl|2xl|xl|lg|full)/g, 'rounded-md');

    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      modifiedCount++;
      console.log(`Updated rounded classes in: ${path.basename(filePath)}`);
    }
  });
});

console.log(`Total files updated with rounded-md: ${modifiedCount}`);
