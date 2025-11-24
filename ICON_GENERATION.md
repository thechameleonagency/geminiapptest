# Icon Generation Instructions

For a complete PWA experience, you need to generate 192x192 and 512x512 PNG icons.

## Quick Generation

You can use online tools or ImageMagick to generate icons from the SVG:

### Using ImageMagick (if installed):

```bash
# Generate 192x192 icon
convert public/icon.svg -resize 192x192 public/icon-192.png

# Generate 512x512 icon
convert public/icon.svg -resize 512x512 public/icon-512.png
```

### Using Online Tools:

1. Go to https://realfavicongenerator.net/ or similar tool
2. Upload `public/icon.svg`
3. Configure settings:
   - Icon size: 192x192 and 512x512
   - Theme color: #118AB2
   - Background: #118AB2 or white
4. Download and place in `public/` folder as:
   - `icon-192.png`
   - `icon-512.png`

### Manual Creation:

You can also create icons manually:
- Use Figma, Adobe Illustrator, or any image editor
- Create a 192x192px and 512x512px version
- Use the Digi Swasthya logo/icon design
- Save as PNG with transparency (optional)
- Place in `public/` folder

## Icon Specifications

- **Format**: PNG
- **Sizes**: 192x192px and 512x512px
- **Purpose**: any maskable (for PWA)
- **Theme**: Should match the app's color scheme (#118AB2)

The service worker and manifest.json are already configured to use these icons once created.

