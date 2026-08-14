import fs from 'fs';
import path from 'path';

const logoPath = 'd:/Full Stack Dev/geetanjalisoftwares/public/logo.png';
const appFavicon = 'd:/Full Stack Dev/geetanjalisoftwares/app/favicon.ico';
const publicFavicon = 'd:/Full Stack Dev/geetanjalisoftwares/public/favicon.ico';
const publicLogoIcon = 'd:/Full Stack Dev/geetanjalisoftwares/public/favicon.png';
const appIcon = 'd:/Full Stack Dev/geetanjalisoftwares/app/icon.png';
const appIco = 'd:/Full Stack Dev/geetanjalisoftwares/app/favicon.png';

// Copy logo.png directly to favicon.ico and favicon.png files
fs.copyFileSync(logoPath, appFavicon);
if (fs.existsSync(publicFavicon)) {
  fs.copyFileSync(logoPath, publicFavicon);
} else {
  fs.copyFileSync(logoPath, path.join('d:/Full Stack Dev/geetanjalisoftwares/public', 'favicon.ico'));
}
fs.copyFileSync(logoPath, publicLogoIcon);
fs.copyFileSync(logoPath, appIcon);
fs.copyFileSync(logoPath, appIco);

console.log('Successfully replaced app/favicon.ico and public/favicon.ico with navbar logo.png!');
