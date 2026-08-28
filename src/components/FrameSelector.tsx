import React from 'react';
import {
  Smartphone,
  Laptop,
  Globe,
  Tablet,
  Sun,
  Moon,
  RotateCw,
} from 'lucide-react';
import { DeviceTheme, FrameType, MockupState } from '../types';
import { deviceMockupGenerator } from '../generators/device-mockup';

interface FrameSelectorProps {
  state: MockupState;
  onChangeFrame: (frame: FrameType) => void;
  onChangeDeviceTheme: (theme: DeviceTheme) => void;
  onChangeOrientation: (orientation: 'portrait' | 'landscape') => void;
  onChangeBrowserUrl: (url: string) => void;
  onChangeBrowserTheme: (theme: 'dark' | 'light') => void;
}

const ICONS_MAP: Record<FrameType, React.ComponentType<{ className?: string }>> = {
  phone: Smartphone,
  laptop: Laptop,
  browser: Globe,
  tablet: Tablet,
};

const THEMES: Array<{ id: DeviceTheme; name: string; color: string }> = [
  { id: 'space-gray', name: 'Space Gray', color: '#374151' },
  { id: 'silver', name: 'Silver', color: '#D1D5DB' },
  { id: 'midnight', name: 'Midnight', color: '#0F172A' },
  { id: 'starlight', name: 'Starlight', color: '#E7E5E4' },
];

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  state,
  onChangeFrame,
  onChangeDeviceTheme,
  onChangeOrientation,
  onChangeBrowserUrl,
  onChangeBrowserTheme,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
          Device Frame
        </label>
        {/* Frame Cards Grid */}
        <div className="grid grid-cols-2 gap-2">
          {deviceMockupGenerator.frameOptions.map((opt) => {
            const Icon = ICONS_MAP[opt.id];
            const isSelected = state.frameType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                id={`frame-opt-${opt.id}`}
                onClick={() => onChangeFrame(opt.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col items-start gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-sm shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {opt.tag && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      {opt.tag}
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className={`text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-neutral-300'
                    }`}
                  >
                    {opt.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 leading-tight mt-0.5 line-clamp-1">
                    {opt.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Specific Options */}
      {state.frameType === 'browser' ? (
        // Browser URL & Theme Settings
        <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
              Browser Address URL
            </label>
            <div className="relative">
              <input
                type="text"
                id="browser-url-input"
                value={state.browserUrl}
                onChange={(e) => onChangeBrowserUrl(e.target.value)}
                placeholder="https://yourproduct.com"
                className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-1.5">
              Window Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="browser-theme-dark"
                onClick={() => onChangeBrowserTheme('dark')}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer ${
                  state.browserTheme === 'dark'
                    ? 'bg-indigo-500/20 border-indigo-500 text-white'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Dark Chrome
              </button>
              <button
                type="button"
                id="browser-theme-light"
                onClick={() => onChangeBrowserTheme('light')}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer ${
                  state.browserTheme === 'light'
                    ? 'bg-indigo-500/20 border-indigo-500 text-white'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Light Chrome
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Device Finish / Theme & Tablet Orientation
        <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-2">
              Device Finish & Color
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {THEMES.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  id={`theme-opt-${th.id}`}
                  onClick={() => onChangeDeviceTheme(th.id)}
                  title={th.name}
                  className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    state.deviceTheme === th.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: th.color }}
                  />
                  <span className="text-[10px] text-neutral-300 truncate w-full">
                    {th.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {state.frameType === 'tablet' && (
            <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between">
              <span className="text-[11px] font-medium text-neutral-300">Orientation</span>
              <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-neutral-700">
                <button
                  type="button"
                  onClick={() => onChangeOrientation('portrait')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    state.orientation === 'portrait'
                      ? 'bg-indigo-500 text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Portrait
                </button>
                <button
                  type="button"
                  onClick={() => onChangeOrientation('landscape')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    state.orientation === 'landscape'
                      ? 'bg-indigo-500 text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Landscape
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
