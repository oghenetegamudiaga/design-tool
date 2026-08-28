import { GradientConfig } from '../types';

export const GRADIENT_PRESETS: GradientConfig[] = [
  {
    id: 'cosmic-violet',
    name: 'Cosmic Violet',
    from: '#4f46e5',
    to: '#7c3aed',
    middle: '#6366f1',
    angle: 135,
  },
  {
    id: 'midnight-neon',
    name: 'Midnight Neon',
    from: '#0f172a',
    to: '#1e1b4b',
    middle: '#312e81',
    angle: 140,
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    from: '#f43f5e',
    to: '#fb923c',
    middle: '#ec4899',
    angle: 120,
  },
  {
    id: 'aurora-emerald',
    name: 'Aurora Emerald',
    from: '#059669',
    to: '#0284c7',
    middle: '#10b981',
    angle: 135,
  },
  {
    id: 'hyper-cyber',
    name: 'Hyper Cyber',
    from: '#ec4899',
    to: '#8b5cf6',
    middle: '#6366f1',
    angle: 45,
  },
  {
    id: 'frosted-slate',
    name: 'Frosted Slate',
    from: '#1e293b',
    to: '#0f172a',
    angle: 180,
  },
  {
    id: 'soft-pearl',
    name: 'Studio Pearl',
    from: '#e2e8f0',
    to: '#cbd5e1',
    angle: 135,
  },
  {
    id: 'warm-sand',
    name: 'Warm Sand',
    from: '#fef3c7',
    to: '#fed7aa',
    angle: 135,
  },
];

export const SOLID_COLOR_PRESETS: Array<{ name: string; hex: string }> = [
  { name: 'Pitch Black', hex: '#000000' },
  { name: 'Onyx Dark', hex: '#090a0f' },
  { name: 'Deep Slate', hex: '#0f172a' },
  { name: 'Charcoal', hex: '#1e293b' },
  { name: 'Pure White', hex: '#ffffff' },
  { name: 'Off White', hex: '#f8fafc' },
  { name: 'Indigo Accent', hex: '#4f46e5' },
  { name: 'Violet Accent', hex: '#7c3aed' },
  { name: 'Emerald Accent', hex: '#059669' },
  { name: 'Rose Accent', hex: '#e11d48' },
  { name: 'Amber Accent', hex: '#d97706' },
  { name: 'Sky Blue', hex: '#0284c7' },
];

export const ASPECT_RATIOS: Array<{
  id: string;
  name: string;
  ratio: number | null; // width / height
  description: string;
}> = [
  { id: '16:9', name: '16:9 Standard', ratio: 16 / 9, description: 'Landscape (1920×1080)' },
  { id: '4:3', name: '4:3 Presentation', ratio: 4 / 3, description: 'Keynote & Slides' },
  { id: '1:1', name: '1:1 Square', ratio: 1 / 1, description: 'Social & Feed Posts' },
  { id: '9:16', name: '9:16 Story / Reel', ratio: 9 / 16, description: 'Mobile vertical' },
  { id: 'dribbble', name: 'Dribbble Shot', ratio: 4 / 3, description: '1600×1200' },
  { id: 'twitter', name: 'Twitter / X Card', ratio: 1200 / 675, description: '1200×675' },
  { id: 'auto', name: 'Auto Fit', ratio: null, description: 'Matches device shape' },
];
