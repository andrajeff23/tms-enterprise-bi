const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Add import if alert is present
      if (content.includes('alert(') && !content.includes('sweetalert2')) {
        content = `import Swal from 'sweetalert2';\n` + content;
        changed = true;
      }

      // Replace generic alert(...) with Swal.fire(...)
      // Using regex to handle alert(`...`) and alert('...')
      if (content.includes('alert(')) {
        content = content.replace(/alert\((['"`])(.*?)\1\)/g, "Swal.fire({icon: 'success', title: 'Informasi', text: $1$2$1})");
        
        // Also handle alert with variable if it matches alert(`...${var}...`)
        content = content.replace(/alert\(`([\s\S]*?)`\)/g, "Swal.fire({icon: 'info', title: 'Informasi', text: `$1`})");
        
        changed = true;
      }

      // Specific replacements for Delete (if found) or others
      // I'll leave the general regex for now

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'src/features'));
