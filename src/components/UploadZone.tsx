import React from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  AlertCircle,
  Sparkles,
  ClipboardPaste,
  CheckCircle2,
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../utils/samples';

interface UploadZoneProps {
  sourceImage: File | null;
  sourceImageUrl: string | null;
  imageDimensions: { width: number; height: number } | null;
  onImageSelected: (file: File) => void;
  onClearImage: () => void;
  onSelectSample: (dataUrl: string, name: string, category: string) => void;
}

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
];

export const UploadZone: React.FC<UploadZoneProps> = ({
  sourceImage,
  sourceImageUrl,
  imageDimensions,
  onImageSelected,
  onClearImage,
  onSelectSample,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setErrorMessage('Unsupported format. Please upload a PNG, JPG, WebP, or SVG file.');
      return;
    }

    // Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMessage(`File is too large (${sizeMb} MB). Maximum allowed size is 15 MB.`);
      return;
    }

    onImageSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  // Listen for global Paste event (Ctrl+V / Cmd+V)
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          validateAndProcessFile(file);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Source Screenshot
        </label>
        <span className="text-[11px] text-neutral-500 flex items-center gap-1">
          <ClipboardPaste className="w-3 h-3" /> Paste Ctrl+V
        </span>
      </div>

      {/* Error notification */}
      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <div className="flex-1">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-200 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {sourceImageUrl ? (
        // Loaded Image Info Card
        <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg bg-neutral-900 overflow-hidden border border-neutral-700/60 flex items-center justify-center shrink-0">
            <img
              src={sourceImageUrl}
              alt="Screenshot preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-neutral-200 truncate">
              {sourceImage?.name || 'Sample Preset'}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {imageDimensions ? `${imageDimensions.width} × ${imageDimensions.height} px` : 'Loaded'}
              {sourceImage && ` • ${(sourceImage.size / 1024).toFixed(0)} KB`}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                id="replace-image-btn"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Change Image
              </button>
              <span className="text-neutral-600">•</span>
              <button
                type="button"
                id="remove-image-btn"
                onClick={onClearImage}
                className="text-[11px] font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Drag & Drop Upload Zone
        <div
          id="upload-dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
              : 'border-neutral-700 hover:border-neutral-500 bg-neutral-900/40 hover:bg-neutral-800/40'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-2 text-indigo-400 border border-neutral-700">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-neutral-200">
            Drop screenshot here, or <span className="text-indigo-400 underline">browse</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            PNG, JPG, WebP, SVG up to 15MB
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-upload-input"
      />

      {/* Sample presets chips */}
      {!sourceImageUrl && (
        <div className="pt-1">
          <div className="text-[11px] text-neutral-400 font-medium mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Or try with demo screenshots:
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectSample(preset.svgDataUrl, preset.name, preset.category)}
                className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700/60 text-left transition-all group cursor-pointer"
              >
                <div className="text-[10px] font-medium text-neutral-300 group-hover:text-white truncate">
                  {preset.name.split(' ')[0]} {preset.name.split(' ')[1]}
                </div>
                <div className="text-[9px] text-neutral-500 truncate">{preset.category}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
