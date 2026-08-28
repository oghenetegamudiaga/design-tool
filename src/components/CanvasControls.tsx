import React from 'react';
import { Sliders, SunMedium, Maximize2, ShieldAlert } from 'lucide-react';
import { CanvasAspectRatio, MockupState } from '../types';
import { ASPECT_RATIOS } from '../utils/constants';

interface CanvasControlsProps {
  state: MockupState;
  onChangeAspectRatio: (ratio: CanvasAspectRatio) => void;
  onChangeScale: (scale: number) => void;
  onChangePadding: (padding: number) => void;
  onChangeShowShadow: (show: boolean) => void;
  onChangeShadowIntensity: (intensity: number) => void;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  state,
  onChangeAspectRatio,
  onChangeScale,
  onChangePadding,
  onChangeShowShadow,
  onChangeShadowIntensity,
}) => {
  return (
    <div className="space-y-4">
      {/* Aspect Ratio Presets */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
          Canvas Ratio & Output Size
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {ASPECT_RATIOS.map((item) => {
            const isSelected = state.aspectRatio === item.id;
            return (
              <button
                key={item.id}
                type="button"
                id={`ratio-opt-${item.id}`}
                onClick={() => onChangeAspectRatio(item.id as CanvasAspectRatio)}
                className={`py-1.5 px-2 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm ring-1 ring-indigo-500/50'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <div className="text-[11px] font-semibold truncate">{item.name.split(' ')[0]}</div>
                <div className="text-[9px] text-neutral-500 truncate">{item.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders Box */}
      <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-3">
        {/* Device Scale */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-300 font-medium">Device Size</span>
            <span className="text-neutral-400 font-mono">{state.deviceScale}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="120"
            step="1"
            value={state.deviceScale}
            onChange={(e) => onChangeScale(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Stage Padding */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-300 font-medium">Stage Padding</span>
            <span className="text-neutral-400 font-mono">{state.padding}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="2"
            value={state.padding}
            onChange={(e) => onChangePadding(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Shadow Toggle & Slider */}
        <div className="pt-2 border-t border-neutral-700/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-300">Device Shadow</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={state.showShadow}
                onChange={(e) => onChangeShowShadow(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {state.showShadow && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                <span>Shadow Elevation & Blur</span>
                <span className="font-mono">{state.shadowIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={state.shadowIntensity}
                onChange={(e) => onChangeShadowIntensity(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
