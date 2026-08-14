import fs from 'fs';
import path from 'path';

const logoPath = 'd:/Full Stack Dev/geetanjalisoftwares/public/logo.png';
const appDir = 'd:/Full Stack Dev/geetanjalisoftwares/app';
const publicDir = 'd:/Full Stack Dev/geetanjalisoftwares/public';

fs.copyFileSync(logoPath, path.join(appDir, 'icon.png'));
fs.copyFileSync(logoPath, path.join(appDir, 'apple-icon.png'));
fs.copyFileSync(logoPath, path.join(publicDir, 'icon.png'));
fs.copyFileSync(logoPath, path.join(publicDir, 'apple-touch-icon.png'));

console.log('Logo copied as favicon icons successfully!');
