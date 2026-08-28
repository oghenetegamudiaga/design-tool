import React from 'react';
import {
  Layers,
  Sparkles,
  RotateCcw,
  Command,
  Smartphone,
  Laptop,
  Globe,
  Tablet,
  Check,
} from 'lucide-react';
import { MockupState } from '../types';
import { SAMPLE_PRESETS } from '../utils/samples';

interface HeaderProps {
  state: MockupState;
  onReset: () => void;
  onOpenShortcuts: () => void;
  onSelectSample: (dataUrl: string, name: string, category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onReset,
  onOpenShortcuts,
  onSelectSample,
}) => {
  const [showSamplesDropdown, setShowSamplesDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSamplesDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-neutral-800/80 bg-neutral-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Brand logo & tag */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-tight">Mockup Studio</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              v1.0
            </span>
          </div>
          <p className="text-xs text-neutral-400 hidden sm:block">
            High-res device mockups & screenshot staging
          </p>
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="flex items-center gap-2">
        {/* Sample presets dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            id="sample-presets-btn"
            onClick={() => setShowSamplesDropdown(!showSamplesDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-200 hover:text-white border border-neutral-700/60 transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">Sample Presets</span>
            <span className="xs:hidden">Presets</span>
          </button>

          {showSamplesDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1.5 border-b border-neutral-800 text-xs font-semibold text-neutral-400">
                Load Demo Screenshots
              </div>
              <div className="space-y-1 mt-1">
                {SAMPLE_PRESETS.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      onSelectSample(sample.svgDataUrl, sample.name, sample.category);
                      setShowSamplesDropdown(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs hover:bg-neutral-800/80 transition-colors group cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-neutral-200 group-hover:text-white">
                        {sample.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">{sample.category}</div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
                      {sample.aspect}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shortcuts button */}
        <button
          type="button"
          id="shortcuts-btn"
          onClick={onOpenShortcuts}
          title="Keyboard Shortcuts (Press ?)"
          className="p-2 rounded-lg bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-400 hover:text-neutral-200 border border-neutral-700/60 transition-colors cursor-pointer"
        >
          <Command className="w-4 h-4" />
        </button>

        {/* Reset button */}
        <button
          type="button"
          id="reset-btn"
          onClick={onReset}
          title="Reset to default settings"
          className="p-2 rounded-lg bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-400 hover:text-neutral-200 border border-neutral-700/60 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
