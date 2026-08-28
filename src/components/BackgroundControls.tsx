import React from 'react';
import {
  Palette,
  Sparkles,
  Sliders,
  Check,
  Grid,
} from 'lucide-react';
import { BackgroundConfig, BackgroundType } from '../types';
import { GRADIENT_PRESETS, SOLID_COLOR_PRESETS } from '../utils/constants';

interface BackgroundControlsProps {
  background: BackgroundConfig;
  onChangeBackground: (bg: BackgroundConfig) => void;
}

export const BackgroundControls: React.FC<BackgroundControlsProps> = ({
  background,
  onChangeBackground,
}) => {
  const [activeTab, setActiveTab] = React.useState<BackgroundType>(background.type);

  const handleTypeChange = (type: BackgroundType) => {
    setActiveTab(type);
    onChangeBackground({
      ...background,
      type,
    });
  };

  const handleSelectGradientPreset = (preset: (typeof GRADIENT_PRESETS)[0]) => {
    onChangeBackground({
      ...background,
      type: 'gradient',
      gradient: {
        from: preset.from,
        to: preset.to,
        middle: preset.middle,
        angle: preset.angle,
      },
    });
  };

  const handleSelectSolidColor = (hex: string) => {
    onChangeBackground({
      ...background,
      type: 'solid',
      solidColor: hex,
    });
  };

  const handleAngleChange = (angle: number) => {
    onChangeBackground({
      ...background,
      type: 'gradient',
      gradient: {
        ...background.gradient,
        angle,
      },
    });
  };

  const handleCustomGradientColor = (key: 'from' | 'to' | 'middle', color: string) => {
    onChangeBackground({
      ...background,
      type: 'gradient',
      gradient: {
        ...background.gradient,
        [key]: color,
      },
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Background
        </label>
        <span className="text-[11px] text-neutral-400 capitalize">{activeTab}</span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
        <button
          type="button"
          id="bg-tab-gradient"
          onClick={() => handleTypeChange('gradient')}
          className={`py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'gradient'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Gradient
        </button>

        <button
          type="button"
          id="bg-tab-solid"
          onClick={() => handleTypeChange('solid')}
          className={`py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'solid'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-rose-400" />
          Solid
        </button>

        <button
          type="button"
          id="bg-tab-transparent"
          onClick={() => handleTypeChange('transparent')}
          className={`py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'transparent'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5 text-amber-400" />
          Alpha
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'gradient' && (
        <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-3">
          <div>
            <div className="text-[11px] font-semibold text-neutral-300 mb-2">
              Studio Gradients
            </div>
            <div className="grid grid-cols-4 gap-2">
              {GRADIENT_PRESETS.map((p) => {
                const isSelected =
                  background.type === 'gradient' &&
                  background.gradient.from === p.from &&
                  background.gradient.to === p.to;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectGradientPreset(p)}
                    title={p.name}
                    className={`h-10 rounded-lg border relative overflow-hidden transition-transform hover:scale-105 cursor-pointer ${
                      isSelected
                        ? 'border-white ring-2 ring-indigo-500/50 shadow-md'
                        : 'border-white/10 hover:border-white/40'
                    }`}
                    style={{
                      background: `linear-gradient(${p.angle}deg, ${p.from}, ${
                        p.middle ? p.middle + ',' : ''
                      } ${p.to})`,
                    }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Gradient Controls */}
          <div className="pt-2 border-t border-neutral-700/50 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-neutral-400 font-medium">Angle</span>
              <span className="text-neutral-300 font-mono">{background.gradient.angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={background.gradient.angle}
              onChange={(e) => handleAngleChange(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />

            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-neutral-400 font-medium">Custom Stops</span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <span className="text-[10px] text-neutral-500">Start</span>
                  <input
                    type="color"
                    value={background.gradient.from}
                    onChange={(e) => handleCustomGradientColor('from', e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                  />
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <span className="text-[10px] text-neutral-500">End</span>
                  <input
                    type="color"
                    value={background.gradient.to}
                    onChange={(e) => handleCustomGradientColor('to', e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'solid' && (
        <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-3">
          <div>
            <div className="text-[11px] font-semibold text-neutral-300 mb-2">
              Color Palette
            </div>
            <div className="grid grid-cols-6 gap-2">
              {SOLID_COLOR_PRESETS.map((col) => {
                const isSelected =
                  background.type === 'solid' &&
                  background.solidColor?.toLowerCase() === col.hex.toLowerCase();
                return (
                  <button
                    key={col.hex}
                    type="button"
                    onClick={() => handleSelectSolidColor(col.hex)}
                    title={col.name}
                    className={`h-7 rounded-md border relative transition-transform hover:scale-105 cursor-pointer ${
                      isSelected
                        ? 'border-white ring-2 ring-indigo-500/50'
                        : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check
                          className={`w-3.5 h-3.5 ${
                            col.hex === '#ffffff' || col.hex === '#f8fafc'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-700/50 flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-400">Custom Color</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={background.solidColor}
                onChange={(e) => handleSelectSolidColor(e.target.value)}
                className="w-20 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs font-mono text-neutral-200 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="color"
                value={background.solidColor}
                onChange={(e) => handleSelectSolidColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transparent' && (
        <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-700/60 text-center space-y-1">
          <div className="text-xs font-medium text-neutral-200">
            Transparent Background
          </div>
          <div className="text-[11px] text-neutral-400">
            Canvas exports with true PNG alpha channel transparency, perfect for compositing in Figma or Keynote.
          </div>
        </div>
      )}
    </div>
  );
};
