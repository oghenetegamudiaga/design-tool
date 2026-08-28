import { SamplePreset } from '../types';

function createSvgDataUrl(svgString: string): string {
  const encoded = encodeURIComponent(svgString)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

// 1. Modern SaaS Dark Analytics Dashboard
const saasDashboardSvg = `
<svg width="1440" height="900" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1440" height="900" fill="#0D0F17"/>
  <rect x="0" y="0" width="240" height="900" fill="#131622" stroke="#1E2336" stroke-width="1"/>
  
  <!-- Sidebar -->
  <circle cx="48" cy="48" r="16" fill="#6366F1"/>
  <rect x="76" y="40" width="90" height="16" rx="4" fill="#FFFFFF"/>
  
  <rect x="24" y="110" width="192" height="36" rx="8" fill="#6366F1" fill-opacity="0.15"/>
  <rect x="56" y="122" width="70" height="12" rx="3" fill="#818CF8"/>
  <circle cx="40" cy="128" r="6" fill="#6366F1"/>
  
  <rect x="24" y="158" width="192" height="36" rx="8" fill="transparent"/>
  <rect x="56" y="170" width="80" height="12" rx="3" fill="#64748B"/>
  <circle cx="40" cy="176" r="6" fill="#475569"/>

  <rect x="24" y="206" width="192" height="36" rx="8" fill="transparent"/>
  <rect x="56" y="218" width="60" height="12" rx="3" fill="#64748B"/>
  <circle cx="40" cy="224" r="6" fill="#475569"/>

  <rect x="24" y="254" width="192" height="36" rx="8" fill="transparent"/>
  <rect x="56" y="266" width="95" height="12" rx="3" fill="#64748B"/>
  <circle cx="40" cy="272" r="6" fill="#475569"/>

  <!-- Top bar -->
  <rect x="240" y="0" width="1200" height="72" fill="#0D0F17" stroke="#1E2336" stroke-width="1"/>
  <rect x="280" y="24" width="180" height="24" rx="6" fill="#FFFFFF" fill-opacity="0.9"/>
  <rect x="1220" y="20" width="32" height="32" rx="16" fill="#6366F1"/>
  <rect x="1268" y="20" width="130" height="32" rx="8" fill="#6366F1"/>
  <text x="1292" y="41" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="600">+ New Report</text>

  <!-- Metrics Row -->
  <g transform="translate(280, 104)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="260" height="120" rx="12" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <text x="20" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">Total Monthly Revenue</text>
    <text x="20" y="70" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="28" font-weight="700">$128,450</text>
    <rect x="20" y="86" width="65" height="20" rx="4" fill="#10B981" fill-opacity="0.15"/>
    <text x="28" y="100" fill="#10B981" font-family="system-ui, sans-serif" font-size="11" font-weight="600">▲ +24.8%</text>

    <!-- Card 2 -->
    <rect x="280" y="0" width="260" height="120" rx="12" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <text x="300" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">Active Workspaces</text>
    <text x="300" y="70" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="28" font-weight="700">4,289</text>
    <rect x="300" y="86" width="65" height="20" rx="4" fill="#10B981" fill-opacity="0.15"/>
    <text x="308" y="100" fill="#10B981" font-family="system-ui, sans-serif" font-size="11" font-weight="600">▲ +12.3%</text>

    <!-- Card 3 -->
    <rect x="560" y="0" width="260" height="120" rx="12" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <text x="580" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">Conversion Rate</text>
    <text x="580" y="70" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="28" font-weight="700">6.42%</text>
    <rect x="580" y="86" width="65" height="20" rx="4" fill="#10B981" fill-opacity="0.15"/>
    <text x="588" y="100" fill="#10B981" font-family="system-ui, sans-serif" font-size="11" font-weight="600">▲ +3.1%</text>

    <!-- Card 4 -->
    <rect x="840" y="0" width="260" height="120" rx="12" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <text x="860" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">Avg. Response Time</text>
    <text x="860" y="70" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="28" font-weight="700">182ms</text>
    <rect x="860" y="86" width="65" height="20" rx="4" fill="#38BDF8" fill-opacity="0.15"/>
    <text x="868" y="100" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="600">⚡ 99.98%</text>
  </g>

  <!-- Big Chart Card -->
  <g transform="translate(280, 252)">
    <rect x="0" y="0" width="720" height="420" rx="16" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <text x="24" y="38" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Platform Growth & Telemetry</text>
    <text x="24" y="60" fill="#64748B" font-family="system-ui, sans-serif" font-size="13">Real-time daily transaction volume</text>

    <!-- Chart Grid -->
    <path d="M 24 120 H 696 M 24 180 H 696 M 24 240 H 696 M 24 300 H 696 M 24 360 H 696" stroke="#1E2336" stroke-width="1" stroke-dasharray="4 4"/>
    
    <!-- Gradient Fill Area -->
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6366F1" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#6366F1" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0"/>
      </linearGradient>
    </defs>

    <path d="M 40 340 Q 140 280, 220 300 T 380 200 T 520 160 T 680 110 L 680 360 L 40 360 Z" fill="url(#chartGrad)"/>
    <path d="M 40 340 Q 140 280, 220 300 T 380 200 T 520 160 T 680 110" stroke="#818CF8" stroke-width="3.5" fill="none"/>

    <path d="M 40 350 Q 140 320, 220 280 T 380 260 T 520 220 T 680 180 L 680 360 L 40 360 Z" fill="url(#chartGrad2)"/>
    <path d="M 40 350 Q 140 320, 220 280 T 380 260 T 520 220 T 680 180" stroke="#38BDF8" stroke-width="2.5" fill="none"/>
    
    <circle cx="520" cy="160" r="6" fill="#818CF8" stroke="#FFFFFF" stroke-width="2"/>
  </g>

  <!-- Right Feed Card -->
  <g transform="translate(1024, 252)">
    <rect x="0" y="0" width="356" height="420" rx="16" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <text x="24" y="38" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Recent Activity</text>
    
    <!-- Item 1 -->
    <circle cx="40" cy="90" r="16" fill="#10B981" fill-opacity="0.2"/>
    <text x="68" y="86" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="500">Enterprise License</text>
    <text x="68" y="104" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">Acme Corp · 2m ago</text>
    <text x="280" y="96" fill="#10B981" font-family="system-ui, sans-serif" font-size="14" font-weight="600">+$12,400</text>

    <!-- Item 2 -->
    <circle cx="40" cy="160" r="16" fill="#6366F1" fill-opacity="0.2"/>
    <text x="68" y="156" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="500">Pro Team Plan</text>
    <text x="68" y="174" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">Vanguard Studio · 14m ago</text>
    <text x="295" y="166" fill="#818CF8" font-family="system-ui, sans-serif" font-size="14" font-weight="600">+$2,400</text>

    <!-- Item 3 -->
    <circle cx="40" cy="230" r="16" fill="#F59E0B" fill-opacity="0.2"/>
    <text x="68" y="226" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="500">Cloud Node Add-on</text>
    <text x="68" y="244" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">FinTech Labs · 45m ago</text>
    <text x="310" y="236" fill="#F59E0B" font-family="system-ui, sans-serif" font-size="14" font-weight="600">+$850</text>

    <!-- Item 4 -->
    <circle cx="40" cy="300" r="16" fill="#EC4899" fill-opacity="0.2"/>
    <text x="68" y="296" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="500">Custom Domain</text>
    <text x="68" y="314" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">Nordic Web · 1h ago</text>
    <text x="320" y="306" fill="#EC4899" font-family="system-ui, sans-serif" font-size="14" font-weight="600">+$120</text>
  </g>
</svg>
`;

// 2. Mobile App UI (iOS / Android Modern Phone Mockup)
const mobileAppSvg = `
<svg width="430" height="932" viewBox="0 0 430 932" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="430" height="932" fill="#090A0F"/>
  
  <!-- Ambient Gradient Background -->
  <defs>
    <radialGradient id="phoneGlow" cx="50%" cy="10%" r="50%">
      <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#090A0F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cardGradMobile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E1B4B" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#312E81" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  
  <rect width="430" height="400" fill="url(#phoneGlow)"/>

  <!-- Status Bar Area -->
  <text x="40" y="44" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="600">9:41</text>
  <circle cx="360" cy="38" r="4" fill="#FFFFFF"/>
  <rect x="372" y="34" width="18" height="9" rx="3" stroke="#FFFFFF" stroke-width="1.5"/>
  <rect x="374" y="36" width="10" height="5" rx="1.5" fill="#FFFFFF"/>

  <!-- App Header -->
  <circle cx="50" cy="96" r="22" fill="#3730A3"/>
  <text x="86" y="90" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13">Good morning,</text>
  <text x="86" y="110" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="18" font-weight="700">Alex Morgan</text>
  
  <circle cx="380" cy="96" r="20" fill="#1E2336"/>
  <path d="M 374 96 L 386 96 M 380 90 L 380 102" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>

  <!-- Main Balance Card -->
  <g transform="translate(24, 140)">
    <rect x="0" y="0" width="382" height="200" rx="24" fill="url(#cardGradMobile)" stroke="#6366F1" stroke-width="1" stroke-opacity="0.3"/>
    <text x="28" y="44" fill="#C7D2FE" font-family="system-ui, sans-serif" font-size="14" font-weight="500">Total Portfolio Value</text>
    <text x="28" y="96" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="38" font-weight="800">$74,892.40</text>
    
    <rect x="28" y="120" width="96" height="28" rx="14" fill="#10B981" fill-opacity="0.2"/>
    <text x="40" y="139" fill="#34D399" font-family="system-ui, sans-serif" font-size="13" font-weight="700">+14.2% today</text>
    
    <text x="270" y="170" fill="#A5B4FC" font-family="system-ui, sans-serif" font-size="12">••• 8924</text>
  </g>

  <!-- Quick Actions Row -->
  <g transform="translate(24, 364)">
    <!-- Send -->
    <circle cx="44" cy="36" r="28" fill="#1E2336"/>
    <text x="44" y="42" text-anchor="middle" fill="#818CF8" font-size="18">↑</text>
    <text x="44" y="80" text-anchor="middle" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Send</text>

    <!-- Receive -->
    <circle cx="142" cy="36" r="28" fill="#1E2336"/>
    <text x="142" y="42" text-anchor="middle" fill="#34D399" font-size="18">↓</text>
    <text x="142" y="80" text-anchor="middle" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Receive</text>

    <!-- Swap -->
    <circle cx="240" cy="36" r="28" fill="#1E2336"/>
    <text x="240" y="42" text-anchor="middle" fill="#F472B6" font-size="18">⇄</text>
    <text x="240" y="80" text-anchor="middle" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Swap</text>

    <!-- More -->
    <circle cx="338" cy="36" r="28" fill="#1E2336"/>
    <text x="338" y="42" text-anchor="middle" fill="#FBBF24" font-size="18">•••</text>
    <text x="338" y="80" text-anchor="middle" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">More</text>
  </g>

  <!-- Assets Section -->
  <g transform="translate(24, 480)">
    <text x="0" y="24" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="20" font-weight="700">Your Assets</text>
    <text x="382" y="24" text-anchor="end" fill="#818CF8" font-family="system-ui, sans-serif" font-size="14" font-weight="600">See All</text>

    <!-- Asset 1 -->
    <rect x="0" y="48" width="382" height="76" rx="18" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <circle cx="40" cy="86" r="18" fill="#F59E0B"/>
    <text x="40" y="92" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="700">₿</text>
    <text x="74" y="80" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">Bitcoin</text>
    <text x="74" y="98" fill="#64748B" font-family="system-ui, sans-serif" font-size="13">0.842 BTC</text>
    <text x="360" y="80" text-anchor="end" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">$54,230</text>
    <text x="360" y="98" text-anchor="end" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">+4.2%</text>

    <!-- Asset 2 -->
    <rect x="0" y="136" width="382" height="76" rx="18" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <circle cx="40" cy="174" r="18" fill="#6366F1"/>
    <text x="40" y="180" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Ξ</text>
    <text x="74" y="168" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">Ethereum</text>
    <text x="74" y="186" fill="#64748B" font-family="system-ui, sans-serif" font-size="13">4.120 ETH</text>
    <text x="360" y="168" text-anchor="end" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">$14,180</text>
    <text x="360" y="186" text-anchor="end" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">+8.6%</text>

    <!-- Asset 3 -->
    <rect x="0" y="224" width="382" height="76" rx="18" fill="#131622" stroke="#1E2336" stroke-width="1"/>
    <circle cx="40" cy="262" r="18" fill="#14B8A6"/>
    <text x="40" y="268" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="700">◎</text>
    <text x="74" y="256" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">Solana</text>
    <text x="74" y="274" fill="#64748B" font-family="system-ui, sans-serif" font-size="13">34.50 SOL</text>
    <text x="360" y="256" text-anchor="end" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">$6,482</text>
    <text x="360" y="274" text-anchor="end" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">+19.4%</text>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 840)">
    <rect x="0" y="0" width="430" height="92" fill="#0D0F17" stroke="#1E2336" stroke-width="1"/>
    <circle cx="75" cy="36" r="6" fill="#818CF8"/>
    <circle cx="168" cy="36" r="6" fill="#475569"/>
    <circle cx="262" cy="36" r="6" fill="#475569"/>
    <circle cx="355" cy="36" r="6" fill="#475569"/>
    <!-- Home indicator bar -->
    <rect x="145" y="70" width="140" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4"/>
  </g>
</svg>
`;

// 3. Creative Studio Landing Page Showcase
const landingPageSvg = `
<svg width="1280" height="800" viewBox="0 0 1280 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#0A0A0B"/>
  
  <defs>
    <radialGradient id="meshHero" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#EC4899" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0A0A0B" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <rect width="1280" height="800" fill="url(#meshHero)"/>

  <!-- Nav -->
  <rect x="340" y="28" width="600" height="52" rx="26" fill="#18181B" fill-opacity="0.8" stroke="#27272A" stroke-width="1"/>
  <circle cx="370" cy="54" r="10" fill="#A855F7"/>
  <text x="390" y="59" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700">AETHER</text>
  
  <text x="510" y="58" fill="#A1A1AA" font-family="system-ui, sans-serif" font-size="13">Features</text>
  <text x="590" y="58" fill="#A1A1AA" font-family="system-ui, sans-serif" font-size="13">Showcase</text>
  <text x="680" y="58" fill="#A1A1AA" font-family="system-ui, sans-serif" font-size="13">Pricing</text>
  
  <rect x="830" y="36" width="96" height="36" rx="18" fill="#FFFFFF"/>
  <text x="856" y="59" fill="#000000" font-family="system-ui, sans-serif" font-size="13" font-weight="700">Launch</text>

  <!-- Hero Content -->
  <rect x="520" y="160" width="240" height="32" rx="16" fill="#27272A" stroke="#3F3F46" stroke-width="1"/>
  <text x="546" y="181" fill="#D4D4D8" font-family="system-ui, sans-serif" font-size="13" font-weight="500">✨ Powered by AI Inference</text>

  <text x="640" y="260" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="54" font-weight="800" letter-spacing="-1.5">
    The Future of Real-Time 3D
  </text>
  <text x="640" y="320" text-anchor="middle" fill="#A1A1AA" font-family="system-ui, sans-serif" font-size="20" font-weight="400">
    Generate ultra-responsive spatial interfaces and cinematic canvas components in seconds.
  </text>

  <!-- Buttons -->
  <rect x="470" y="370" width="160" height="52" rx="26" fill="#9333EA"/>
  <text x="515" y="402" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Get Started</text>

  <rect x="650" y="370" width="160" height="52" rx="26" fill="#18181B" stroke="#27272A" stroke-width="1"/>
  <text x="695" y="402" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="500">Live Demo →</text>

  <!-- Interactive 3D Mock Visual Cards in Hero -->
  <g transform="translate(240, 470)">
    <rect x="0" y="0" width="240" height="260" rx="20" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <circle cx="120" cy="100" r="50" fill="#7C3AED" fill-opacity="0.3" stroke="#A855F7" stroke-width="2"/>
    <text x="120" y="190" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">Volumetric Grid</text>
    <text x="120" y="215" text-anchor="middle" fill="#71717A" font-family="system-ui, sans-serif" font-size="13">0.4ms latencies</text>

    <rect x="280" y="0" width="240" height="260" rx="20" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <rect x="340" y="60" width="120" height="80" rx="12" fill="#06B6D4" fill-opacity="0.2" stroke="#22D3EE" stroke-width="2"/>
    <text x="400" y="190" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">Spatial Audio</text>
    <text x="400" y="215" text-anchor="middle" fill="#71717A" font-family="system-ui, sans-serif" font-size="13">Binaural 6DoF</text>

    <rect x="560" y="0" width="240" height="260" rx="20" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <polygon points="680,50 730,135 630,135" fill="#F43F5E" fill-opacity="0.2" stroke="#FB7185" stroke-width="2"/>
    <text x="680" y="190" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="600">Photoreal Raytracing</text>
    <text x="680" y="215" text-anchor="middle" fill="#71717A" font-family="system-ui, sans-serif" font-size="13">Path tracing on GPU</text>
  </g>
</svg>
`;

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'saas-dashboard',
    name: 'SaaS Analytics Dashboard',
    category: 'Web / Desktop',
    aspect: '16:9',
    svgDataUrl: createSvgDataUrl(saasDashboardSvg),
  },
  {
    id: 'mobile-app',
    name: 'Crypto & Finance Mobile App',
    category: 'Mobile Phone',
    aspect: '9:19.5',
    svgDataUrl: createSvgDataUrl(mobileAppSvg),
  },
  {
    id: 'creative-landing',
    name: 'Creative Studio Landing Page',
    category: 'Web / Tablet',
    aspect: '16:10',
    svgDataUrl: createSvgDataUrl(landingPageSvg),
  },
];
