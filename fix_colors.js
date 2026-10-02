const fs = require('fs');
const path = require('path');

const replacements = {
  'text-white': 'text-foreground',
  'text-slate-200': 'text-foreground/90',
  'text-slate-300': 'text-muted-foreground',
  'text-slate-400': 'text-muted-foreground/80',
  'text-slate-500': 'text-muted-foreground/60',
  'bg-slate-950': 'bg-background',
  'bg-slate-900': 'bg-card',
  'bg-slate-800': 'bg-secondary',
  'border-slate-800': 'border-border',
  'border-slate-700': 'border-border/80',
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [search, replace] of Object.entries(replacements)) {
        const regex = new RegExp(`\\b${search}\\b`, 'g');
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory('e:\\RevGenIQ\\app');
processDirectory('e:\\RevGenIQ\\components');
console.log("Done replacing hardcoded colors with semantic colors.");
