import { FrameOption, GeneratorModule, MockupState } from '../../types';

// Helper to draw rounded rectangle with cross-browser safety
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | number[]
) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  } else {
    // Fallback
    const r = typeof radius === 'number' ? radius : radius[0] || 0;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.arcTo(x + width, y, x + width, y + r, r);
    ctx.lineTo(x + width, y + height - r);
    ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
    ctx.lineTo(x + r, y + height);
    ctx.arcTo(x, y + height, x, y + height - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }
}

// Color palette mapping based on device theme
function getThemeColors(theme: MockupState['deviceTheme']) {
  switch (theme) {
    case 'silver':
      return {
        bodyGradStart: '#F3F4F6',
        bodyGradEnd: '#D1D5DB',
        bezelStroke: '#9CA3AF',
        rimHighlight: '#FFFFFF',
        accentDark: '#4B5563',
        screenBezel: '#111827',
      };
    case 'midnight':
      return {
        bodyGradStart: '#1E293B',
        bodyGradEnd: '#0F172A',
        bezelStroke: '#334155',
        rimHighlight: '#475569',
        accentDark: '#020617',
        screenBezel: '#030712',
      };
    case 'starlight':
      return {
        bodyGradStart: '#F5F5F4',
        bodyGradEnd: '#E7E5E4',
        bezelStroke: '#D6D3D1',
        rimHighlight: '#FAF7F5',
        accentDark: '#78716C',
        screenBezel: '#1C1917',
      };
    case 'space-gray':
    default:
      return {
        bodyGradStart: '#374151',
        bodyGradEnd: '#1F2937',
        bezelStroke: '#4B5563',
        rimHighlight: '#6B7280',
        accentDark: '#111827',
        screenBezel: '#090A0F',
      };
  }
}

// Draw Background (Solid, Gradient, or Transparent)
function drawBackground(
  ctx: CanvasRenderingContext2D,
  state: MockupState,
  width: number,
  height: number,
  isExport?: boolean
) {
  const { background } = state;

  if (background.type === 'transparent') {
    ctx.clearRect(0, 0, width, height);
    return;
  }

  if (background.type === 'solid') {
    ctx.fillStyle = background.solidColor || '#090A0F';
    ctx.fillRect(0, 0, width, height);
    return;
  }

  if (background.type === 'gradient') {
    const angleRad = ((background.gradient.angle || 135) * Math.PI) / 180;
    const cx = width / 2;
    const cy = height / 2;
    const diagonal = Math.sqrt(width * width + height * height) / 2;
    const x0 = cx - Math.cos(angleRad) * diagonal;
    const y0 = cy - Math.sin(angleRad) * diagonal;
    const x1 = cx + Math.cos(angleRad) * diagonal;
    const y1 = cy + Math.sin(angleRad) * diagonal;

    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    grad.addColorStop(0, background.gradient.from || '#4F46E5');
    if (background.gradient.middle) {
      grad.addColorStop(0.5, background.gradient.middle);
    }
    grad.addColorStop(1, background.gradient.to || '#7C3AED');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle premium lighting overlay
    const radialGrad = ctx.createRadialGradient(cx, cy * 0.6, 10, cx, cy, Math.max(width, height) * 0.75);
    radialGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, width, height);
  }
}

// Draw Image Cover Fit into Screen Area
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  sx: number,
  sy: number,
  sw: number,
  sh: number
) {
  if (!image) {
    // Elegant screen placeholder with subtle grid & hint
    ctx.fillStyle = '#11131F';
    ctx.fillRect(sx, sy, sw, sh);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = sx; x <= sx + sw; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, sy);
      ctx.lineTo(x, sy + sh);
      ctx.stroke();
    }
    for (let y = sy; y <= sy + sh; y += step) {
      ctx.beginPath();
      ctx.moveTo(sx, y);
      ctx.lineTo(sx + sw, y);
      ctx.stroke();
    }

    // Centered placeholder text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = `600 ${Math.max(14, Math.round(sw * 0.04))}px 'Plus Jakarta Sans', system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Drop image or choose sample', sx + sw / 2, sy + sh / 2);
    return;
  }

  const imgW = image.naturalWidth || image.width;
  const imgH = image.naturalHeight || image.height;

  const scale = Math.max(sw / imgW, sh / imgH);
  const renderW = imgW * scale;
  const renderH = imgH * scale;

  const dx = sx + (sw - renderW) / 2;
  const dy = sy + (sh - renderH) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, dx, dy, renderW, renderH);
}

// 1. RENDER PHONE (Modern Smartphone with Island)
function renderPhone(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  state: MockupState,
  w: number,
  h: number
) {
  const colors = getThemeColors(state.deviceTheme);
  const scaleMultiplier = (state.deviceScale || 100) / 100;
  const paddingFactor = 1 - (state.padding || 30) / 150;

  // Phone aspect ratio ~ 1 : 2.1
  const baseH = Math.min(h * 0.78 * paddingFactor * scaleMultiplier, w * 1.5);
  const baseW = baseH * (430 / 932);

  const phoneW = baseW;
  const phoneH = baseH;
  const phoneX = (w - phoneW) / 2;
  const phoneY = (h - phoneH) / 2;

  const cornerRadius = phoneW * 0.125;
  const bezelWidth = phoneW * 0.032;

  ctx.save();

  // Shadow
  if (state.showShadow) {
    const shadowAlpha = ((state.shadowIntensity ?? 50) / 100) * 0.45;
    ctx.save();
    // Ambient soft shadow
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.shadowBlur = phoneW * 0.25;
    ctx.shadowOffsetY = phoneH * 0.05;
    drawRoundedRect(ctx, phoneX, phoneY, phoneW, phoneH, cornerRadius);
    ctx.fillStyle = '#000000';
    ctx.fill();

    // Directional contact shadow
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha * 0.8})`;
    ctx.shadowBlur = phoneW * 0.1;
    ctx.shadowOffsetY = phoneH * 0.02;
    drawRoundedRect(ctx, phoneX, phoneY, phoneW, phoneH, cornerRadius);
    ctx.fill();
    ctx.restore();
  }

  // Device Outer Body / Frame
  const bodyGrad = ctx.createLinearGradient(phoneX, phoneY, phoneX + phoneW, phoneY + phoneH);
  bodyGrad.addColorStop(0, colors.bodyGradStart);
  bodyGrad.addColorStop(0.5, colors.bezelStroke);
  bodyGrad.addColorStop(1, colors.bodyGradEnd);

  drawRoundedRect(ctx, phoneX, phoneY, phoneW, phoneH, cornerRadius);
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // Outer Edge Rim Highlight
  ctx.strokeStyle = colors.rimHighlight;
  ctx.lineWidth = Math.max(1, phoneW * 0.005);
  ctx.stroke();

  // Inner Bezel (Black display border)
  const innerX = phoneX + bezelWidth;
  const innerY = phoneY + bezelWidth;
  const innerW = phoneW - bezelWidth * 2;
  const innerH = phoneH - bezelWidth * 2;
  const innerRadius = Math.max(4, cornerRadius - bezelWidth);

  drawRoundedRect(ctx, innerX, innerY, innerW, innerH, innerRadius);
  ctx.fillStyle = colors.screenBezel;
  ctx.fill();

  // Screen Area Clip & Render Image
  ctx.save();
  drawRoundedRect(ctx, innerX, innerY, innerW, innerH, innerRadius);
  ctx.clip();

  drawCoverImage(ctx, image, innerX, innerY, innerW, innerH);

  // Dynamic Island Notch
  const islandW = innerW * 0.32;
  const islandH = innerH * 0.038;
  const islandX = innerX + (innerW - islandW) / 2;
  const islandY = innerY + innerH * 0.015;
  const islandRadius = islandH / 2;

  drawRoundedRect(ctx, islandX, islandY, islandW, islandH, islandRadius);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Camera lens dot inside island
  ctx.beginPath();
  ctx.arc(islandX + islandW * 0.78, islandY + islandH / 2, islandH * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(islandX + islandW * 0.78, islandY + islandH / 2, islandH * 0.09, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();

  // Bottom Home Indicator Bar
  const barW = innerW * 0.36;
  const barH = Math.max(3, innerH * 0.006);
  const barX = innerX + (innerW - barW) / 2;
  const barY = innerY + innerH - innerH * 0.02 - barH;
  drawRoundedRect(ctx, barX, barY, barW, barH, barH / 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fill();

  // Screen Glass Reflection Highlight
  const screenReflect = ctx.createLinearGradient(innerX, innerY, innerX + innerW, innerY + innerH * 0.6);
  screenReflect.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
  screenReflect.addColorStop(0.3, 'rgba(255, 255, 255, 0.03)');
  screenReflect.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = screenReflect;
  ctx.fillRect(innerX, innerY, innerW, innerH);

  ctx.restore(); // end screen clip

  ctx.restore();
}

// 2. RENDER LAPTOP (MacBook Style Sleek Notebook)
function renderLaptop(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  state: MockupState,
  w: number,
  h: number
) {
  const colors = getThemeColors(state.deviceTheme);
  const scaleMultiplier = (state.deviceScale || 100) / 100;
  const paddingFactor = 1 - (state.padding || 30) / 150;

  // Screen ~ 16:10, overall laptop with base is wider
  const maxAvailW = w * 0.85 * paddingFactor * scaleMultiplier;
  const maxAvailH = h * 0.75 * paddingFactor * scaleMultiplier;

  let lidW = maxAvailW;
  let lidH = lidW * (10 / 16);
  if (lidH > maxAvailH * 0.85) {
    lidH = maxAvailH * 0.85;
    lidW = lidH * (16 / 10);
  }

  const baseW = lidW * 1.18;
  const baseH = lidH * 0.075;
  const totalH = lidH + baseH;

  const lidX = (w - lidW) / 2;
  const lidY = (h - totalH) / 2;
  const baseX = (w - baseW) / 2;
  const baseY = lidY + lidH;

  const lidRadius = lidW * 0.022;
  const bezel = lidW * 0.025;

  ctx.save();

  // Shadow
  if (state.showShadow) {
    const shadowAlpha = ((state.shadowIntensity ?? 50) / 100) * 0.45;
    ctx.save();
    // Lid Drop Shadow
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.shadowBlur = lidW * 0.18;
    ctx.shadowOffsetY = lidH * 0.08;
    drawRoundedRect(ctx, lidX, lidY, lidW, lidH, [lidRadius, lidRadius, 0, 0]);
    ctx.fillStyle = '#000000';
    ctx.fill();

    // Base Flat Contact Shadow
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha * 1.1})`;
    ctx.shadowBlur = baseW * 0.12;
    ctx.shadowOffsetY = baseH * 1.2;
    drawRoundedRect(ctx, baseX, baseY, baseW, baseH, [0, 0, 8, 8]);
    ctx.fill();
    ctx.restore();
  }

  // 1. Lid Aluminum Shell
  const lidGrad = ctx.createLinearGradient(lidX, lidY, lidX, lidY + lidH);
  lidGrad.addColorStop(0, colors.bodyGradStart);
  lidGrad.addColorStop(1, colors.bodyGradEnd);

  drawRoundedRect(ctx, lidX, lidY, lidW, lidH, [lidRadius, lidRadius, 2, 2]);
  ctx.fillStyle = lidGrad;
  ctx.fill();

  // Lid Bezel Rim
  ctx.strokeStyle = colors.rimHighlight;
  ctx.lineWidth = Math.max(1, lidW * 0.003);
  ctx.stroke();

  // 2. Black Display Bezel
  const screenX = lidX + bezel;
  const screenY = lidY + bezel;
  const screenW = lidW - bezel * 2;
  const screenH = lidH - bezel * 2;
  const screenRadius = Math.max(2, lidRadius - bezel * 0.6);

  drawRoundedRect(ctx, screenX, screenY, screenW, screenH, [screenRadius, screenRadius, 2, 2]);
  ctx.fillStyle = colors.screenBezel;
  ctx.fill();

  // Screen Image Render
  ctx.save();
  drawRoundedRect(ctx, screenX, screenY, screenW, screenH, [screenRadius, screenRadius, 2, 2]);
  ctx.clip();

  drawCoverImage(ctx, image, screenX, screenY, screenW, screenH);

  // Top Web Camera Notch / Sensor
  const notchW = screenW * 0.14;
  const notchH = screenH * 0.038;
  const notchX = screenX + (screenW - notchW) / 2;
  const notchY = screenY;
  const notchRadius = notchH * 0.4;

  drawRoundedRect(ctx, notchX, notchY, notchW, notchH, [0, 0, notchRadius, notchRadius]);
  ctx.fillStyle = '#050505';
  ctx.fill();

  // Camera lens reflection dot
  ctx.beginPath();
  ctx.arc(notchX + notchW / 2, notchY + notchH / 2, notchH * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(notchX + notchW / 2, notchY + notchH / 2, notchH * 0.09, 0, Math.PI * 2);
  ctx.fillStyle = '#06b6d4';
  ctx.fill();

  // Screen Gloss
  const screenGloss = ctx.createLinearGradient(screenX, screenY, screenX + screenW, screenY + screenH * 0.5);
  screenGloss.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
  screenGloss.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
  screenGloss.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = screenGloss;
  ctx.fillRect(screenX, screenY, screenW, screenH);

  ctx.restore(); // end screen clip

  // 3. Laptop Base / Keyboard Deck & Lip
  const baseGrad = ctx.createLinearGradient(baseX, baseY, baseX, baseY + baseH);
  baseGrad.addColorStop(0, colors.bodyGradStart);
  baseGrad.addColorStop(0.7, colors.bodyGradEnd);
  baseGrad.addColorStop(1, colors.accentDark);

  drawRoundedRect(ctx, baseX, baseY, baseW, baseH, [0, 0, baseH * 0.6, baseH * 0.6]);
  ctx.fillStyle = baseGrad;
  ctx.fill();

  // Base Edge Highlights
  ctx.strokeStyle = colors.rimHighlight;
  ctx.lineWidth = Math.max(1, baseW * 0.002);
  ctx.stroke();

  // Center Thumb Notch on base
  const thumbW = baseW * 0.12;
  const thumbH = baseH * 0.35;
  const thumbX = (w - thumbW) / 2;
  const thumbY = baseY;
  drawRoundedRect(ctx, thumbX, thumbY, thumbW, thumbH, [0, 0, 4, 4]);
  ctx.fillStyle = colors.accentDark;
  ctx.fill();

  // Hinge Shadow Line
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(lidX + lidW * 0.1, baseY - 1, lidW * 0.8, 2);

  ctx.restore();
}

// 3. RENDER BROWSER WINDOW (macOS Dark / Light Window Chrome)
function renderBrowser(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  state: MockupState,
  w: number,
  h: number
) {
  const isDark = state.browserTheme !== 'light';
  const scaleMultiplier = (state.deviceScale || 100) / 100;
  const paddingFactor = 1 - (state.padding || 30) / 150;

  const winW = Math.min(w * 0.85 * paddingFactor * scaleMultiplier, w - 40);
  const winH = Math.min(winW * (9 / 16), h * 0.78 * paddingFactor * scaleMultiplier);

  const winX = (w - winW) / 2;
  const winY = (h - winH) / 2;
  const cornerRadius = 14;
  const headerH = Math.max(42, Math.min(54, winH * 0.09));

  ctx.save();

  // Window Shadow
  if (state.showShadow) {
    const shadowAlpha = ((state.shadowIntensity ?? 50) / 100) * 0.4;
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.shadowBlur = winW * 0.14;
    ctx.shadowOffsetY = winH * 0.06;
    drawRoundedRect(ctx, winX, winY, winW, winH, cornerRadius);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.restore();
  }

  // Window Background & Border
  drawRoundedRect(ctx, winX, winY, winW, winH, cornerRadius);
  ctx.fillStyle = isDark ? '#131622' : '#FFFFFF';
  ctx.fill();

  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Browser Header / Top Bar
  ctx.save();
  drawRoundedRect(ctx, winX, winY, winW, headerH, [cornerRadius, cornerRadius, 0, 0]);
  ctx.clip();

  ctx.fillStyle = isDark ? '#1C2030' : '#F1F3F5';
  ctx.fillRect(winX, winY, winW, headerH);

  // Bottom border of header
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(winX, winY + headerH - 1, winW, 1);

  // Traffic Lights (Red, Yellow, Green)
  const dotR = Math.max(5, headerH * 0.13);
  const dotY = winY + headerH / 2;
  const dotStartX = winX + headerH * 0.45;
  const dotSpacing = dotR * 2.8;

  // Red
  ctx.beginPath();
  ctx.arc(dotStartX, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = '#EF4444';
  ctx.fill();

  // Yellow
  ctx.beginPath();
  ctx.arc(dotStartX + dotSpacing, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = '#F59E0B';
  ctx.fill();

  // Green
  ctx.beginPath();
  ctx.arc(dotStartX + dotSpacing * 2, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();

  // URL Bar in center
  const urlBarW = Math.min(winW * 0.55, winW - dotSpacing * 4 - 80);
  const urlBarH = headerH * 0.62;
  const urlBarX = winX + (winW - urlBarW) / 2;
  const urlBarY = winY + (headerH - urlBarH) / 2;

  drawRoundedRect(ctx, urlBarX, urlBarY, urlBarW, urlBarH, urlBarH / 2);
  ctx.fillStyle = isDark ? '#131622' : '#E2E8F0';
  ctx.fill();

  // Lock Icon & URL Text
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  const fontSize = Math.max(11, Math.round(urlBarH * 0.44));
  ctx.font = `500 ${fontSize}px 'JetBrains Mono', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const domainText = state.browserUrl || 'https://app.mockupstudio.design';
  ctx.fillText(`🔒  ${domainText}`, urlBarX + urlBarW / 2, urlBarY + urlBarH / 2);

  ctx.restore(); // end header clip

  // Viewport Screen Area
  const viewX = winX;
  const viewY = winY + headerH;
  const viewW = winW;
  const viewH = winH - headerH;

  ctx.save();
  drawRoundedRect(ctx, viewX, viewY, viewW, viewH, [0, 0, cornerRadius, cornerRadius]);
  ctx.clip();

  drawCoverImage(ctx, image, viewX, viewY, viewW, viewH);

  ctx.restore();

  ctx.restore();
}

// 4. RENDER TABLET (iPad Pro Style Tablet)
function renderTablet(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  state: MockupState,
  w: number,
  h: number
) {
  const colors = getThemeColors(state.deviceTheme);
  const scaleMultiplier = (state.deviceScale || 100) / 100;
  const paddingFactor = 1 - (state.padding || 30) / 150;

  // Tablet aspect ratio ~ 4:3 or 1.4:1
  const isLandscape = state.orientation === 'landscape';
  const ratio = isLandscape ? 4 / 3 : 3 / 4;

  let tabW: number;
  let tabH: number;

  if (isLandscape) {
    tabW = Math.min(w * 0.82 * paddingFactor * scaleMultiplier, (h * 0.78 * paddingFactor * scaleMultiplier) * ratio);
    tabH = tabW / ratio;
  } else {
    tabH = Math.min(h * 0.8 * paddingFactor * scaleMultiplier, (w * 0.8 * paddingFactor * scaleMultiplier) / ratio);
    tabW = tabH * ratio;
  }

  const tabX = (w - tabW) / 2;
  const tabY = (h - tabH) / 2;

  const cornerRadius = Math.min(tabW, tabH) * 0.06;
  const bezel = Math.min(tabW, tabH) * 0.038;

  ctx.save();

  // Shadow
  if (state.showShadow) {
    const shadowAlpha = ((state.shadowIntensity ?? 50) / 100) * 0.45;
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.shadowBlur = Math.min(tabW, tabH) * 0.22;
    ctx.shadowOffsetY = tabH * 0.05;
    drawRoundedRect(ctx, tabX, tabY, tabW, tabH, cornerRadius);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.restore();
  }

  // Tablet Body / Edge
  const bodyGrad = ctx.createLinearGradient(tabX, tabY, tabX + tabW, tabY + tabH);
  bodyGrad.addColorStop(0, colors.bodyGradStart);
  bodyGrad.addColorStop(0.5, colors.bezelStroke);
  bodyGrad.addColorStop(1, colors.bodyGradEnd);

  drawRoundedRect(ctx, tabX, tabY, tabW, tabH, cornerRadius);
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  ctx.strokeStyle = colors.rimHighlight;
  ctx.lineWidth = Math.max(1, tabW * 0.004);
  ctx.stroke();

  // Screen Bezel
  const screenX = tabX + bezel;
  const screenY = tabY + bezel;
  const screenW = tabW - bezel * 2;
  const screenH = tabH - bezel * 2;
  const screenRadius = Math.max(4, cornerRadius - bezel * 0.6);

  drawRoundedRect(ctx, screenX, screenY, screenW, screenH, screenRadius);
  ctx.fillStyle = colors.screenBezel;
  ctx.fill();

  // Screen Image
  ctx.save();
  drawRoundedRect(ctx, screenX, screenY, screenW, screenH, screenRadius);
  ctx.clip();

  drawCoverImage(ctx, image, screenX, screenY, screenW, screenH);

  // Front camera sensor dot on bezel
  const camX = isLandscape ? tabX + bezel / 2 : tabX + tabW / 2;
  const camY = isLandscape ? tabY + tabH / 2 : tabY + bezel / 2;
  const camR = bezel * 0.2;

  ctx.beginPath();
  ctx.arc(camX, camY, camR, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(camX, camY, camR * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#38BDF8';
  ctx.fill();

  // Bottom indicator bar
  const barW = Math.min(screenW, screenH) * 0.3;
  const barH = Math.max(3, screenH * 0.005);
  const barX = screenX + (screenW - barW) / 2;
  const barY = screenY + screenH - bezel * 0.6;
  drawRoundedRect(ctx, barX, barY, barW, barH, barH / 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fill();

  ctx.restore(); // end screen clip

  ctx.restore();
}

export const deviceMockupGenerator: GeneratorModule = {
  id: 'device-mockup',
  name: 'Device Mockup',
  description: 'Clean realistic phone, laptop, browser window, and tablet frames.',
  isAvailable: true,
  frameOptions: [
    {
      id: 'phone',
      name: 'Smartphone',
      icon: 'Smartphone',
      description: 'Modern smartphone with dynamic island & bezel',
      tag: 'Popular',
    },
    {
      id: 'laptop',
      name: 'Laptop',
      icon: 'Laptop',
      description: 'MacBook style aluminum notebook with keyboard deck',
      tag: 'Desktop',
    },
    {
      id: 'browser',
      name: 'Browser Window',
      icon: 'Globe',
      description: 'macOS dark / light window with traffic lights & URL bar',
      tag: 'Web',
    },
    {
      id: 'tablet',
      name: 'Tablet',
      icon: 'Tablet',
      description: 'iPad style slim-bezel tablet screen',
      tag: 'Multi-touch',
    },
  ],
  render: (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement | null,
    state: MockupState,
    width: number,
    height: number,
    isExport = false
  ) => {
    // 1. Draw Background
    drawBackground(ctx, state, width, height, isExport);

    // 2. Draw active device frame
    switch (state.frameType) {
      case 'phone':
        renderPhone(ctx, image, state, width, height);
        break;
      case 'laptop':
        renderLaptop(ctx, image, state, width, height);
        break;
      case 'browser':
        renderBrowser(ctx, image, state, width, height);
        break;
      case 'tablet':
        renderTablet(ctx, image, state, width, height);
        break;
      default:
        renderPhone(ctx, image, state, width, height);
    }
  },
};
