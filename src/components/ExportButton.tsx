import React from 'react';
import { Download, Copy, Check, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ExportScale, MockupState } from '../types';
import { deviceMockupGenerator } from '../generators/device-mockup';
import { ASPECT_RATIOS } from '../utils/constants';

interface ExportButtonProps {
  state: MockupState;
  onExportDone?: () => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ state }) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [exportScale, setExportScale] = React.useState<ExportScale>(2);
  const [exportFormat, setExportFormat] = React.useState<'png' | 'webp' | 'jpeg'>('png');

  // Calculates export resolution based on aspect ratio and scale factor
  const getExportDimensions = (scale: number) => {
    const selectedRatioObj = ASPECT_RATIOS.find((r) => r.id === state.aspectRatio);
    let baseW = 1920;
    let baseH = 1080;

    if (state.aspectRatio === '1:1') {
      baseW = 1440;
      baseH = 1440;
    } else if (state.aspectRatio === '4:3' || state.aspectRatio === 'dribbble') {
      baseW = 1600;
      baseH = 1200;
    } else if (state.aspectRatio === '9:16') {
      baseW = 1080;
      baseH = 1920;
    } else if (state.aspectRatio === 'twitter') {
      baseW = 1200;
      baseH = 675;
    } else if (state.aspectRatio === 'auto') {
      if (state.frameType === 'phone') {
        baseW = 1200;
        baseH = 1600;
      } else if (state.frameType === 'laptop') {
        baseW = 1920;
        baseH = 1200;
      } else {
        baseW = 1920;
        baseH = 1080;
      }
    } else if (selectedRatioObj?.ratio) {
      baseW = 1920;
      baseH = Math.round(1920 / selectedRatioObj.ratio);
    }

    return {
      width: Math.round(baseW * (scale / 2)),
      height: Math.round(baseH * (scale / 2)),
    };
  };

  const renderOffscreenCanvas = async (): Promise<HTMLCanvasElement> => {
    const { width, height } = getExportDimensions(exportScale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      throw new Error('Could not obtain canvas 2D context');
    }

    deviceMockupGenerator.render(
      ctx,
      state.sourceImageElement,
      state,
      width,
      height,
      true // isExport = true
    );

    return canvas;
  };

  // Trigger file download
  const handleExportDownload = async () => {
    setIsExporting(true);
    try {
      // Small pause to allow UI update
      await new Promise((r) => setTimeout(r, 60));
      const canvas = await renderOffscreenCanvas();

      const mimeType =
        exportFormat === 'jpeg'
          ? 'image/jpeg'
          : exportFormat === 'webp'
          ? 'image/webp'
          : 'image/png';

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsExporting(false);
            return;
          }

          const dateStr = new Date().toISOString().slice(0, 10);
          const filename = `mockup-${state.frameType}-${dateStr}.${exportFormat}`;

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          setTimeout(() => URL.revokeObjectURL(url), 1500);
          setIsExporting(false);
        },
        mimeType,
        0.95
      );
    } catch (err) {
      console.error('Export failed:', err);
      setIsExporting(false);
    }
  };

  // Copy directly to system clipboard as image/png
  const handleCopyToClipboard = async () => {
    try {
      const canvas = await renderOffscreenCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          // Clipboard Item only accepts PNG in most browsers
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.warn('Clipboard write failed:', err);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
    }
  };

  const { width, height } = getExportDimensions(exportScale);

  return (
    <div className="space-y-3 pt-2">
      {/* Resolution & Format selection bar */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800">
        <div className="flex items-center gap-1">
          <span className="text-[10px] uppercase font-bold text-neutral-500 pl-1">Res:</span>
          {([1, 2, 3] as ExportScale[]).map((scale) => (
            <button
              key={scale}
              type="button"
              id={`scale-btn-${scale}x`}
              onClick={() => setExportScale(scale)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                exportScale === scale
                  ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {scale}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] uppercase font-bold text-neutral-500">Format:</span>
          {(['png', 'jpeg', 'webp'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              id={`format-btn-${fmt}`}
              onClick={() => setExportFormat(fmt)}
              className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-all cursor-pointer ${
                exportFormat === fmt
                  ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Main Export PNG Button */}
        <button
          type="button"
          id="export-png-btn"
          disabled={isExporting}
          onClick={handleExportDownload}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Rendering {width}×{height}px...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-white" />
              <span>Export {exportFormat.toUpperCase()} ({width}×{height})</span>
            </>
          )}
        </button>

        {/* Copy Image to Clipboard */}
        <button
          type="button"
          id="copy-clipboard-btn"
          onClick={handleCopyToClipboard}
          title="Copy Image to Clipboard (Paste into Figma, Slack, Discord)"
          className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : (
            <Copy className="w-5 h-5 text-neutral-300" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-500 px-1">
        <span>✨ 100% Client-side. Private & secure.</span>
        <span>{width} × {height} px output</span>
      </div>
    </div>
  );
};
