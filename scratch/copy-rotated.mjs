import fs from 'fs';
import path from 'path';

const rotated = 'd:/Full Stack Dev/geetanjalisoftwares/public/logo-rotated.png';
const appDir = 'd:/Full Stack Dev/geetanjalisoftwares/app';
const publicDir = 'd:/Full Stack Dev/geetanjalisoftwares/public';

fs.copyFileSync(rotated, path.join(publicDir, 'favicon.ico'));
fs.copyFileSync(rotated, path.join(publicDir, 'favicon.png'));
fs.copyFileSync(rotated, path.join(publicDir, 'icon.png'));
fs.copyFileSync(rotated, path.join(publicDir, 'apple-touch-icon.png'));

fs.copyFileSync(rotated, path.join(appDir, 'favicon.ico'));
fs.copyFileSync(rotated, path.join(appDir, 'favicon.png'));
fs.copyFileSync(rotated, path.join(appDir, 'icon.png'));
fs.copyFileSync(rotated, path.join(appDir, 'apple-icon.png'));

console.log('Successfully copied exact -12deg rotated logo to all favicon files!');
