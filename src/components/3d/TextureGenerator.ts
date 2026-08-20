import * as THREE from 'three';
import { Product } from '../../types/product';

// Cache generated textures so we don't redraw unnecessarily
const textureCache = new Map<string, THREE.CanvasTexture>();

export function createCanTexture(product: Product): THREE.CanvasTexture {
  if (textureCache.has(product.id)) {
    return textureCache.get(product.id)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const { canTextureColors, name, subtitle, tagline } = product;

  // 1. Background Base Gradient (Anodized Matte Aluminum)
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  bgGrad.addColorStop(0.0, canTextureColors.base);
  bgGrad.addColorStop(0.25, canTextureColors.metal);
  bgGrad.addColorStop(0.5, canTextureColors.base);
  bgGrad.addColorStop(0.75, canTextureColors.accent);
  bgGrad.addColorStop(1.0, canTextureColors.base);

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Subtle Micro Brushed-Metal Grid / Tech Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1.5;
  for (let y = 40; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 3. Central Brand Column (Repeated 2 times around cylinder for 360° visual balance)
  const centers = [canvas.width * 0.28, canvas.width * 0.78];

  centers.forEach((cx) => {
    // Vertical Accent Energy Stripe
    const stripeGrad = ctx.createLinearGradient(cx - 180, 0, cx + 180, 0);
    stripeGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    stripeGrad.addColorStop(0.5, canTextureColors.glow + '40');
    stripeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = stripeGrad;
    ctx.fillRect(cx - 240, 0, 480, canvas.height);

    // Architectural geometric rings
    ctx.save();
    ctx.translate(cx, 260);
    ctx.strokeStyle = canTextureColors.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 95, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.stroke();

    // Zero-G Crosshair
    ctx.fillStyle = canTextureColors.accent;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();

    // Floating emblem symbol
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('0G', 0, 0);
    ctx.restore();

    // Top Category / Formulation Badge
    ctx.fillStyle = canTextureColors.glow;
    ctx.font = '700 24px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '8px';
    ctx.fillText('ZERO GRAVITY BEVERAGE • 355 ML', cx, 110);

    // Large Vertical / Horizontal AEROVA Logo
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = canTextureColors.glow;
    ctx.shadowBlur = 25;
    ctx.font = '900 130px "Syne", "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AEROVA', cx, 470);
    ctx.restore();

    // Flavor Pill Tag
    ctx.fillStyle = canTextureColors.accent;
    const pillW = 420;
    const pillH = 50;
    const pillX = cx - pillW / 2;
    const pillY = 515;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 25);
    ctx.fill();

    ctx.fillStyle = '#05020A';
    ctx.font = '800 26px "Syne", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name.replace('AEROVA ', ''), cx, 550);

    // Subtitle & Tagline
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitle, cx, 615);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(tagline, cx, 650);

    // Spec Line Coordinates
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 200, 710);
    ctx.lineTo(cx + 200, 710);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 16px "Space Mono", monospace';
    ctx.fillText('FORMULA V4.8 • SUB-ORBITAL BATCH • 2026', cx, 745);

    // Bottom Decorative Barcode & Specs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let b = 0; b < 24; b++) {
      const bw = (b % 3 === 0 ? 6 : 2);
      ctx.fillRect(cx - 100 + b * 9, 830, bw, 40);
    }
    ctx.font = '500 14px "Space Mono", monospace';
    ctx.fillText('TASTE BEYOND GRAVITY', cx, 895);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  textureCache.set(product.id, texture);
  return texture;
}
