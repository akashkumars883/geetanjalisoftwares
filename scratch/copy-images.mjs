import fs from 'fs';
import path from 'path';

const img1 = 'C:/Users/ak706/.gemini/antigravity-ide/brain/9308c86b-edd1-431a-9527-c30d3268848f/automixa_preview_1786707417479.png';
const img2 = 'C:/Users/ak706/.gemini/antigravity-ide/brain/9308c86b-edd1-431a-9527-c30d3268848f/money_capital_preview_1786708131436.png';
const img3 = 'C:/Users/ak706/.gemini/antigravity-ide/brain/9308c86b-edd1-431a-9527-c30d3268848f/nakul_properties_preview_1786708270668.png';

const publicDir = 'd:/Full Stack Dev/geetanjalisoftwares/public';

fs.copyFileSync(img1, path.join(publicDir, 'automixa-preview.png'));
fs.copyFileSync(img2, path.join(publicDir, 'money-capital-preview.png'));
fs.copyFileSync(img3, path.join(publicDir, 'nakul-properties-preview.png'));

console.log('Case study preview images copied to public directory successfully!');
