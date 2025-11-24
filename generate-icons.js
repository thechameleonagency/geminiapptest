/**
 * Icon Generation Script for Digi Swasthya PWA
 * 
 * This script helps generate PWA icons from the SVG source.
 * 
 * Prerequisites:
 * - Node.js 20+
 * - sharp package (install with: npm install --save-dev sharp)
 * 
 * Usage:
 *   node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('⚠️  sharp package not found. Installing...');
  console.error('Please run: npm install --save-dev sharp');
  console.error('\nAlternatively, use online tools as described in ICON_GENERATION.md');
  process.exit(1);
}

const svgPath = path.join(__dirname, 'public', 'icon.svg');
const outputDir = path.join(__dirname, 'public');

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

async function generateIcons() {
  try {
    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error(`❌ SVG file not found at: ${svgPath}`);
      console.error('Please create an icon.svg file first.');
      process.exit(1);
    }

    console.log('🎨 Generating PWA icons...\n');

    // Generate icons
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(svgPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 17, g: 138, b: 178, alpha: 1 } // #118AB2
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    console.log('\n✨ Icon generation complete!');
    console.log('📝 Icons are ready for PWA deployment.');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();

