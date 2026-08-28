import React from 'react';
import {
  Smartphone,
  Palette,
  Sliders,
  Download,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react';
import {
  BackgroundConfig,
  CanvasAspectRatio,
  DeviceTheme,
  FrameType,
  MockupState,
} from '../types';
import { UploadZone } from './UploadZone';
import { FrameSelector } from './FrameSelector';
import { BackgroundControls } from './BackgroundControls';
import { CanvasControls } from './CanvasControls';
import { ExportButton } from './ExportButton';

interface ControlRailProps {
  state: MockupState;
  onImageSelected: (file: File) => void;
  onClearImage: () => void;
  onSelectSample: (dataUrl: string, name: string, category: string) => void;
  onChangeFrame: (frame: FrameType) => void;
  onChangeDeviceTheme: (theme: DeviceTheme) => void;
  onChangeOrientation: (orientation: 'portrait' | 'landscape') => void;
  onChangeBrowserUrl: (url: string) => void;
  onChangeBrowserTheme: (theme: 'dark' | 'light') => void;
  onChangeBackground: (bg: BackgroundConfig) => void;
  onChangeAspectRatio: (ratio: CanvasAspectRatio) => void;
  onChangeScale: (scale: number) => void;
  onChangePadding: (padding: number) => void;
  onChangeShowShadow: (show: boolean) => void;
  onChangeShadowIntensity: (intensity: number) => void;
}

export const ControlRail: React.FC<ControlRailProps> = ({
  state,
  onImageSelected,
  onClearImage,
  onSelectSample,
  onChangeFrame,
  onChangeDeviceTheme,
  onChangeOrientation,
  onChangeBrowserUrl,
  onChangeBrowserTheme,
  onChangeBackground,
  onChangeAspectRatio,
  onChangeScale,
  onChangePadding,
  onChangeShowShadow,
  onChangeShadowIntensity,
}) => {
  const [mobileTab, setMobileTab] = React.useState<'device' | 'background' | 'canvas' | 'export'>('device');

  return (
    <aside
      id="control-rail-panel"
      className="w-full lg:w-96 xl:w-[420px] bg-neutral-900/95 border-t lg:border-t-0 lg:border-r border-neutral-800/80 flex flex-col h-auto lg:h-[calc(100vh-4rem)] z-20 shrink-0"
    >
      {/* Mobile Navigation Tabs (Shown on small screens) */}
      <div className="lg:hidden flex items-center justify-around border-b border-neutral-800 bg-neutral-950/70 px-2 py-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setMobileTab('device')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            mobileTab === 'device' ? 'bg-indigo-500 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" /> Frame & Source
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('background')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            mobileTab === 'background' ? 'bg-indigo-500 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" /> Backdrop
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('canvas')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            mobileTab === 'canvas' ? 'bg-indigo-500 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" /> Adjust
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('export')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            mobileTab === 'export' ? 'bg-indigo-500 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
        {/* On desktop: show all sections grouped. On mobile: filter by active tab */}
        <div className={`space-y-6 ${mobileTab !== 'device' ? 'hidden lg:block' : 'block'}`}>
          {/* Upload Section */}
          <section className="space-y-2">
            <UploadZone
              sourceImage={state.sourceImage}
              sourceImageUrl={state.sourceImageUrl}
              imageDimensions={state.imageDimensions}
              onImageSelected={onImageSelected}
              onClearImage={onClearImage}
              onSelectSample={onSelectSample}
            />
          </section>

          <div className="h-[1px] bg-neutral-800/80" />

          {/* Frame Selector Section */}
          <section className="space-y-2">
            <FrameSelector
              state={state}
              onChangeFrame={onChangeFrame}
              onChangeDeviceTheme={onChangeDeviceTheme}
              onChangeOrientation={onChangeOrientation}
              onChangeBrowserUrl={onChangeBrowserUrl}
              onChangeBrowserTheme={onChangeBrowserTheme}
            />
          </section>
        </div>

        <div className={`space-y-6 ${mobileTab !== 'background' ? 'hidden lg:block' : 'block'}`}>
          <div className="hidden lg:block h-[1px] bg-neutral-800/80" />
          {/* Background Controls */}
          <section className="space-y-2">
            <BackgroundControls
              background={state.background}
              onChangeBackground={onChangeBackground}
            />
          </section>
        </div>

        <div className={`space-y-6 ${mobileTab !== 'canvas' ? 'hidden lg:block' : 'block'}`}>
          <div className="hidden lg:block h-[1px] bg-neutral-800/80" />
          {/* Canvas & Framing Controls */}
          <section className="space-y-2">
            <CanvasControls
              state={state}
              onChangeAspectRatio={onChangeAspectRatio}
              onChangeScale={onChangeScale}
              onChangePadding={onChangePadding}
              onChangeShowShadow={onChangeShowShadow}
              onChangeShadowIntensity={onChangeShadowIntensity}
            />
          </section>
        </div>

        <div className={`space-y-6 ${mobileTab !== 'export' ? 'hidden lg:block' : 'block'}`}>
          <div className="hidden lg:block h-[1px] bg-neutral-800/80" />
          {/* Export Pipeline Section */}
          <section className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
              Export Mockup
            </label>
            <ExportButton state={state} />
          </section>
        </div>
      </div>
    </aside>
  );
};
