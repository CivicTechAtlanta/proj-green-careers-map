import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '../src/assets/images');
const OUTPUT_DIR = join(__dirname, '../src/assets/images-optimized');

const CONFIG = {
  hero: {
    widths: [1440, 768],
    quality: 80,
  },
  fields: {
    widths: [800, 400],
    quality: 80,
  }
};

async function processDirectory(srcDir, outDir, config) {
  await mkdir(outDir, { recursive: true });

  let files;
  try {
    files = await readdir(srcDir);
  } catch (err) {
    console.log(`Directory not found: ${srcDir}`);
    return;
  }

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

    const { name } = parse(file);
    const inputPath = join(srcDir, file);

    console.log(`Processing: ${file}`);

    for (const width of config.widths) {
      // Generate WebP (primary - best compression)
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: config.quality })
        .toFile(join(outDir, `${name}-${width}w.webp`));

      // Generate JPEG fallback
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .jpeg({ quality: config.quality, mozjpeg: true })
        .toFile(join(outDir, `${name}-${width}w.jpg`));

      console.log(`  -> ${name}-${width}w.webp, ${name}-${width}w.jpg`);
    }
  }
}

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  // Process hero images
  console.log('Processing hero images...');
  await processDirectory(
    join(SOURCE_DIR, 'hero'),
    join(OUTPUT_DIR, 'hero'),
    CONFIG.hero
  );

  // Process field images
  console.log('\nProcessing field images...');
  await processDirectory(
    join(SOURCE_DIR, 'fields'),
    join(OUTPUT_DIR, 'fields'),
    CONFIG.fields
  );

  // Copy logo directory as-is (SVGs don't need optimization)
  console.log('\nCopying logo files...');
  const logoSrc = join(SOURCE_DIR, 'logo');
  const logoDest = join(OUTPUT_DIR, 'logo');
  await mkdir(logoDest, { recursive: true });

  try {
    const logoFiles = await readdir(logoSrc);
    for (const file of logoFiles) {
      const { copyFile } = await import('fs/promises');
      await copyFile(join(logoSrc, file), join(logoDest, file));
      console.log(`  Copied: ${file}`);
    }
  } catch (err) {
    console.log('  No logo files to copy');
  }

  console.log('\nOptimization complete!');

  // Show size comparison
  console.log('\nChecking output sizes...');
  const { stat } = await import('fs/promises');

  for (const dir of ['hero', 'fields']) {
    const outPath = join(OUTPUT_DIR, dir);
    try {
      const files = await readdir(outPath);
      let totalSize = 0;
      for (const file of files) {
        const stats = await stat(join(outPath, file));
        totalSize += stats.size;
      }
      console.log(`  ${dir}/: ${(totalSize / 1024).toFixed(0)} KB total`);
    } catch (err) {
      // Directory doesn't exist
    }
  }
}

optimizeImages().catch(console.error);
