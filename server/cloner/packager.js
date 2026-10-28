import JSZip from 'jszip';

// Generate Tailwind v4 theme CSS
export function generateTailwindV4(tokens) {
  const colors = tokens.colors || [];
  let css = `@theme {\n`;
  colors.slice(0, 10).forEach((c, idx) => {
    css += `  --color-brand-${idx + 1}: ${c.value};\n`;
  });
  if (tokens.fonts && tokens.fonts.length > 0) {
    const primaryFont = tokens.fonts[0].family;
    css += `  --font-sans: '${primaryFont}', -apple-system, sans-serif;\n`;
  }
  css += `}\n`;
  return css;
}

// Generate Tailwind v3 config JS
export function generateTailwindV3(tokens) {
  const colors = tokens.colors || [];
  const colorObj = {};
  colors.slice(0, 10).forEach((c, idx) => {
    colorObj[`brand-${idx + 1}`] = c.value;
  });

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: ${JSON.stringify(colorObj, null, 6).replace(/"([^"]+)":/g, '$1:')},
      fontFamily: {
        sans: [${tokens.fonts?.[0]?.family ? `'${tokens.fonts[0].family}'` : `'Inter'`}, 'sans-serif'],
      },
    },
  },
  plugins: [],
};
`;
}

// Generate CSS variables
export function generateCssVariables(tokens) {
  let css = `:root {\n  /* Zippix Extracted Design Tokens */\n`;
  (tokens.colors || []).slice(0, 15).forEach((c, idx) => {
    css += `  --color-${idx + 1}: ${c.value};\n`;
  });
  css += `}\n`;
  return css;
}

// Build production ZIP package
export async function createCloneZip({ domain, title, html, tokens, assets }) {
  const zip = new JSZip();

  // 1. Root index.html
  zip.file('index.html', html);

  // 2. Tailwind Configs
  zip.file('theme.css', generateTailwindV4(tokens));
  zip.file('tailwind.config.js', generateTailwindV3(tokens));
  zip.file('variables.css', generateCssVariables(tokens));

  // 3. Design Tokens JSON
  zip.file('tokens.json', JSON.stringify({ domain, title, tokens, assetsCount: assets.length }, null, 2));

  // 4. README.md
  zip.file(
    'README.md',
    `# ${title || domain} - Cloned with Zippix Web
Exported on: ${new Date().toUTCString()}

## 🚀 What's Included
- **index.html**: Standalone cloned webpage with unified inline styles and responsive layout.
- **theme.css**: Tailwind CSS v4 custom theme tokens.
- **tailwind.config.js**: Tailwind CSS v3 configuration.
- **variables.css**: Standard CSS Custom Properties (Variables).
- **tokens.json**: Full machine-readable design system tokens.

## 💻 Quick Start
1. Open \`index.html\` directly in any browser.
2. Or serve locally with any static server:
   \`\`\`bash
   npx serve .
   \`\`\`
`
  );

  // 5. Assets Folder (embed all SVG icons as files)
  const assetsFolder = zip.folder('assets');
  if (assetsFolder) {
    const svgs = assets.filter((a) => a.type === 'svg' && a.content);
    svgs.forEach((svg, idx) => {
      assetsFolder.file(`icon-${idx + 1}.svg`, svg.content);
    });
  }

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  return zipBuffer;
}
