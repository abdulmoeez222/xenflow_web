import fs from 'fs';

const filePath = 'client/src/pages/Home.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Global string replacements to shift from dark mode to light mode
content = content.replace(/border-white\/10/g, 'border-black/10');
content = content.replace(/border-white\/5/g, 'border-black/5');
content = content.replace(/bg-white\/5/g, 'bg-black/5');
content = content.replace(/hover:bg-white\/5/g, 'hover:bg-black/5');
content = content.replace(/bg-black\/40/g, 'bg-secondary/40');
content = content.replace(/from-black\/80/g, 'from-background/90');
content = content.replace(/from-black/g, 'from-background');
content = content.replace(/text-white/g, 'text-foreground');
content = content.replace(/bg-black/g, 'bg-background');

// Protect the primary button text colors to remain white for contrast
content = content.replace(/bg-primary hover:bg-primary\/80 text-foreground/g, 'bg-primary hover:bg-primary/80 text-white');
content = content.replace(/bg-primary hover:bg-primary\/90 text-foreground/g, 'bg-primary hover:bg-primary/90 text-white');

fs.writeFileSync(filePath, content);
console.log('Fixed bulk class replacements in Home.tsx');
