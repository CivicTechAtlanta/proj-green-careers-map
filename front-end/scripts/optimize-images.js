import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '../src/assets/images');
const OUTPUT_DIR = join(__dirname, '../src/assets/images-optimized');

// v2 uses new source photos, outputs to a separate directory for easy swapping
const OUTPUT_DIR_V2 = join(__dirname, '../src/assets/images-optimized-v2');

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

// Rename mapping for new-fields images -> optimized output names
const NEW_FIELDS_RENAME = {
  'Agriculture': 'agriculture',
  'Education and outreach': 'education',
  'Energy Efficiency': 'energy-efficiency',
  'Green infrastructure': 'green-infrastructure',
  'Natural Resources': 'natural-resources',
  'Remediation': 'remediation',
  'Renewable Energy': 'renewable-energy',
  'Transportation': 'transportation',
};

async function processDirectory(srcDir, outDir, config, renameMap = null) {
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

    // Use rename map if provided, otherwise use original name
    const outputName = renameMap ? renameMap[name] : name;
    if (renameMap && !outputName) {
      console.log(`  Skipping (no mapping): ${file}`);
      continue;
    }

    console.log(`Processing: ${file} -> ${outputName}`);

    for (const width of config.widths) {
      // Generate WebP (primary - best compression)
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: config.quality })
        .toFile(join(outDir, `${outputName}-${width}w.webp`));

      // Generate JPEG fallback
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .jpeg({ quality: config.quality, mozjpeg: true })
        .toFile(join(outDir, `${outputName}-${width}w.jpg`));

      console.log(`  -> ${outputName}-${width}w.webp, ${outputName}-${width}w.jpg`);
    }
  }
}

async function optimizeImages() {
  const target = process.argv[2]; // 'v1', 'v2', or undefined (defaults to v1)

  if (!target || target === 'v1') {
    console.log('=== Optimizing v1 (original images) ===\n');

    console.log('Processing hero images...');
    await processDirectory(
      join(SOURCE_DIR, 'hero'),
      join(OUTPUT_DIR, 'hero'),
      CONFIG.hero
    );

    console.log('\nProcessing field images...');
    await processDirectory(
      join(SOURCE_DIR, 'fields'),
      join(OUTPUT_DIR, 'fields'),
      CONFIG.fields
    );

    // Copy logo
    console.log('\nCopying logo files...');
    const logoSrc = join(SOURCE_DIR, 'logo');
    const logoDest = join(OUTPUT_DIR, 'logo');
    await mkdir(logoDest, { recursive: true });
    try {
      const logoFiles = await readdir(logoSrc);
      const { copyFile } = await import('fs/promises');
      for (const file of logoFiles) {
        await copyFile(join(logoSrc, file), join(logoDest, file));
        console.log(`  Copied: ${file}`);
      }
    } catch (err) {
      console.log('  No logo files to copy');
    }
  }

  if (target === 'v2') {
    console.log('=== Optimizing v2 (new images) ===\n');

    // Process new hero image
    console.log('Processing hero images...');
    await processDirectory(
      join(SOURCE_DIR, 'hero'),
      join(OUTPUT_DIR_V2, 'hero'),
      CONFIG.hero
    );

    // Process new field images with rename mapping
    console.log('\nProcessing new field images...');
    await processDirectory(
      join(SOURCE_DIR, 'new-fields'),
      join(OUTPUT_DIR_V2, 'fields'),
      CONFIG.fields,
      NEW_FIELDS_RENAME
    );

    // Copy logo
    console.log('\nCopying logo files...');
    const logoSrc = join(SOURCE_DIR, 'logo');
    const logoDest = join(OUTPUT_DIR_V2, 'logo');
    await mkdir(logoDest, { recursive: true });
    try {
      const logoFiles = await readdir(logoSrc);
      const { copyFile } = await import('fs/promises');
      for (const file of logoFiles) {
        await copyFile(join(logoSrc, file), join(logoDest, file));
        console.log(`  Copied: ${file}`);
      }
    } catch (err) {
      console.log('  No logo files to copy');
    }
  }

  console.log('\nOptimization complete!');

  // Show size comparison
  console.log('\nChecking output sizes...');
  const { stat } = await import('fs/promises');
  const dirsToCheck = target === 'v2' ? OUTPUT_DIR_V2 : OUTPUT_DIR;

  for (const dir of ['hero', 'fields']) {
    const outPath = join(dirsToCheck, dir);
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
