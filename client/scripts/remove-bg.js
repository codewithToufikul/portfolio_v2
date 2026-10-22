import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processPhoto() {
  const inputPath = path.resolve(__dirname, '../public/toufikul-original.jpg');
  const outputPath = path.resolve(__dirname, '../public/toufikul-cutout.png');

  console.log('Reading image from:', inputPath);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Extract raw RGBA channels
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numChannels = info.channels; // 4: R, G, B, A

  // Flood-fill or threshold outer white background:
  // The background is pure/off-white (R, G, B > 235).
  // Toufikul is wearing a black suit and has dark hair, so the contrast against the white background is very high!
  // To avoid removing the white shirt inside the suit, we can use a connected component / flood-fill from edges (or a threshold where pixels connected to the border that are near white become transparent).
  
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper to get index
  const idx = (x, y) => y * width + x;

  // Check if pixel is "white/near white background"
  const isBgWhite = (x, y) => {
    const i = (y * width + x) * numChannels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Background is near white (r > 225, g > 225, b > 225 and low color saturation)
    const isBright = r > 220 && g > 220 && b > 220;
    const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return isBright && diff < 25;
  };

  // Push only top and upper side border pixels that are white to queue.
  // NEVER seed from bottom edge (y = height - 1) because the shirt/suit reaches the bottom!
  for (let x = 0; x < width; x++) {
    if (isBgWhite(x, 0)) { visited[idx(x, 0)] = 1; queue.push([x, 0]); }
  }
  // The shoulders touch the side borders around y >= 760. Only seed sides above the shoulders.
  for (let y = 0; y < Math.min(height, 750); y++) {
    if (isBgWhite(0, y) && !visited[idx(0, y)]) { visited[idx(0, y)] = 1; queue.push([0, y]); }
    if (isBgWhite(width - 1, y) && !visited[idx(width - 1, y)]) { visited[idx(width - 1, y)] = 1; queue.push([width - 1, y]); }
  }

  // BFS flood fill
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        // Absolute protection: the inner chest/shirt region is NEVER background!
        if (ny > 660 && nx > 220 && nx < 560) {
          continue;
        }

        const nIndex = idx(nx, ny);
        if (!visited[nIndex] && isBgWhite(nx, ny)) {
          visited[nIndex] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Now apply alpha: 0 for visited background, feathered edge
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIndex = idx(x, y);
      const byteIdx = pIndex * numChannels;
      if (visited[pIndex]) {
        data[byteIdx + 3] = 0; // Completely transparent
      } else {
        // Check if neighboring a visited pixel to feather edge
        let nearBg = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (visited[idx(nx, ny)]) {
                nearBg = true;
                break;
              }
            }
          }
          if (nearBg) break;
        }
        if (nearBg) {
          // Soften edge
          const r = data[byteIdx];
          const g = data[byteIdx + 1];
          const b = data[byteIdx + 2];
          const brightness = (r + g + b) / 3;
          if (brightness > 200) {
            data[byteIdx + 3] = Math.max(0, Math.min(255, 255 - (brightness - 180) * 3));
          }
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: numChannels
    }
  })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

  console.log('Successfully generated transparent cutout at:', outputPath);
}

processPhoto().catch(console.error);
