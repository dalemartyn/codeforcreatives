const fs = require('fs');

const css = fs.readFileSync('src/editor/Output/srcdoc/styles.css', 'utf-8');
const html = fs.readFileSync('src/editor/Output/srcdoc/index.html', 'utf-8');

fs.writeFileSync('src/editor/Output/srcdoc/index.js', `export default ${JSON.stringify(html.replace('/* STYLES */', css))};`);
