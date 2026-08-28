export type FrameType = 'phone' | 'laptop' | 'browser' | 'tablet';

export type DeviceTheme = 'space-gray' | 'silver' | 'midnight' | 'starlight';

export type DeviceOrientation = 'portrait' | 'landscape';

export type BackgroundType = 'solid' | 'gradient' | 'transparent';

export type CanvasAspectRatio = 'auto' | '16:9' | '4:3' | '1:1' | '9:16' | 'twitter' | 'dribbble';

export type ExportScale = 1 | 2 | 3;

export interface GradientConfig {
  id: string;
  name: string;
  from: string;
  to: string;
  middle?: string;
  angle: number; // in degrees
}

export interface BackgroundConfig {
  type: BackgroundType;
  solidColor: string;
  gradient: {
    from: string;
    to: string;
    middle?: string;
    angle: number;
  };
}

export interface ExportSettings {
  scale: ExportScale;
  format: 'png' | 'jpeg' | 'webp';
  quality: number;
}

export interface MockupState {
  sourceImage: File | null;
  sourceImageUrl: string | null;
  sourceImageElement: HTMLImageElement | null;
  imageDimensions: { width: number; height: number } | null;
  generatorId: string;
  frameType: FrameType;
  deviceTheme: DeviceTheme;
  orientation: DeviceOrientation;
  showShadow: boolean;
  shadowIntensity: number; // 0 to 100
  deviceScale: number; // 50 to 120 (%)
  padding: number; // 0 to 100
  browserUrl: string;
  browserTheme: 'dark' | 'light';
  background: BackgroundConfig;
  aspectRatio: CanvasAspectRatio;
  exportSettings: ExportSettings;
}

export interface FrameOption {
  id: FrameType;
  name: string;
  icon: string;
  description: string;
  tag?: string;
}

export interface GeneratorModule {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
  frameOptions: FrameOption[];
  render: (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement | null,
    state: MockupState,
    width: number,
    height: number,
    isExport?: boolean
  ) => void;
}

export interface SamplePreset {
  id: string;
  name: string;
  category: string;
  aspect: string;
  svgDataUrl: string;
}
