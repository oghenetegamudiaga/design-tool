import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl/⌘ + V', action: 'Paste screenshot image directly from clipboard' },
    { key: '1 - 4', action: 'Switch device frames (1: Phone, 2: Laptop, 3: Browser, 4: Tablet)' },
    { key: 'Ctrl/⌘ + S / E', action: 'Quick export PNG to downloads' },
    { key: 'Esc', action: 'Close dialogs or modals' },
    { key: '?', action: 'Toggle this keyboard shortcuts cheat-sheet' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Keyboard Shortcuts</h3>
              <p className="text-xs text-neutral-400">Boost your mockup workflow</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-800/60 last:border-0"
            >
              <span className="text-neutral-300 font-medium">{sc.action}</span>
              <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-[11px] shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-4 bg-neutral-950/60 border-t border-neutral-800 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
