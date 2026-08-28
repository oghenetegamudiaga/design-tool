import React from 'react';
import {
  BackgroundConfig,
  CanvasAspectRatio,
  DeviceTheme,
  FrameType,
  MockupState,
} from './types';
import { GRADIENT_PRESETS } from './utils/constants';
import { SAMPLE_PRESETS } from './utils/samples';
import { Header } from './components/Header';
import { ControlRail } from './components/ControlRail';
import { CanvasStage } from './components/CanvasStage';
import { ShortcutsModal } from './components/ShortcutsModal';

const DEFAULT_STATE: MockupState = {
  sourceImage: null,
  sourceImageUrl: null,
  sourceImageElement: null,
  imageDimensions: null,
  generatorId: 'device-mockup',
  frameType: 'phone',
  deviceTheme: 'space-gray',
  orientation: 'portrait',
  showShadow: true,
  shadowIntensity: 55,
  deviceScale: 100,
  padding: 30,
  browserUrl: 'https://app.mockupstudio.design',
  browserTheme: 'dark',
  background: {
    type: 'gradient',
    solidColor: '#090A0F',
    gradient: {
      from: GRADIENT_PRESETS[0].from,
      to: GRADIENT_PRESETS[0].to,
      middle: GRADIENT_PRESETS[0].middle,
      angle: GRADIENT_PRESETS[0].angle,
    },
  },
  aspectRatio: '16:9',
  exportSettings: {
    scale: 2,
    format: 'png',
    quality: 0.95,
  },
};

export default function App() {
  const [state, setState] = React.useState<MockupState>(DEFAULT_STATE);
  const [showShortcuts, setShowShortcuts] = React.useState(false);

  // Helper to load image URL into HTMLImageElement
  const loadImageElement = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = url;
    });
  };

  // Pre-load default sample on initial mount
  React.useEffect(() => {
    const defaultSample = SAMPLE_PRESETS[1]; // mobile app preset for initial phone frame
    loadImageElement(defaultSample.svgDataUrl)
      .then((img) => {
        setState((prev) => ({
          ...prev,
          sourceImageUrl: defaultSample.svgDataUrl,
          sourceImageElement: img,
          imageDimensions: { width: img.naturalWidth || 430, height: img.naturalHeight || 932 },
        }));
      })
      .catch((err) => console.error('Failed to load initial demo sample', err));
  }, []);

  // Handle uploaded file
  const handleImageSelected = async (file: File) => {
    try {
      if (state.sourceImageUrl && state.sourceImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(state.sourceImageUrl);
      }

      const url = URL.createObjectURL(file);
      const img = await loadImageElement(url);

      // Auto-suggest frame type based on uploaded image aspect ratio
      const imgRatio = (img.naturalWidth || 1) / (img.naturalHeight || 1);
      let suggestedFrame: FrameType = state.frameType;
      if (imgRatio < 0.65) {
        suggestedFrame = 'phone';
      } else if (imgRatio > 1.3) {
        suggestedFrame = state.frameType === 'phone' ? 'laptop' : state.frameType;
      }

      setState((prev) => ({
        ...prev,
        sourceImage: file,
        sourceImageUrl: url,
        sourceImageElement: img,
        imageDimensions: { width: img.naturalWidth, height: img.naturalHeight },
        frameType: suggestedFrame,
      }));
    } catch (err) {
      console.error('Failed to process uploaded image', err);
    }
  };

  // Handle selecting a sample preset
  const handleSelectSample = async (dataUrl: string, name: string, category: string) => {
    try {
      const img = await loadImageElement(dataUrl);
      let targetFrame: FrameType = state.frameType;
      if (category.includes('Mobile')) {
        targetFrame = 'phone';
      } else if (category.includes('Desktop') || category.includes('Web')) {
        targetFrame = state.frameType === 'phone' ? 'laptop' : state.frameType;
      }

      setState((prev) => ({
        ...prev,
        sourceImage: null,
        sourceImageUrl: dataUrl,
        sourceImageElement: img,
        imageDimensions: { width: img.naturalWidth, height: img.naturalHeight },
        frameType: targetFrame,
      }));
    } catch (err) {
      console.error('Failed to load sample', err);
    }
  };

  // Clear source image
  const handleClearImage = () => {
    if (state.sourceImageUrl && state.sourceImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(state.sourceImageUrl);
    }
    setState((prev) => ({
      ...prev,
      sourceImage: null,
      sourceImageUrl: null,
      sourceImageElement: null,
      imageDimensions: null,
    }));
  };

  // Reset all settings
  const handleReset = () => {
    const defaultSample = SAMPLE_PRESETS[0];
    loadImageElement(defaultSample.svgDataUrl).then((img) => {
      setState({
        ...DEFAULT_STATE,
        sourceImageUrl: defaultSample.svgDataUrl,
        sourceImageElement: img,
        imageDimensions: { width: img.naturalWidth, height: img.naturalHeight },
        frameType: 'laptop',
      });
    });
  };

  // Keyboard shortcut handlers
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in text input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        setState((prev) => ({ ...prev, frameType: 'phone' }));
      } else if (e.key === '2') {
        setState((prev) => ({ ...prev, frameType: 'laptop' }));
      } else if (e.key === '3') {
        setState((prev) => ({ ...prev, frameType: 'browser' }));
      } else if (e.key === '4') {
        setState((prev) => ({ ...prev, frameType: 'tablet' }));
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setShowShortcuts((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans antialiased overflow-hidden">
      {/* App Header */}
      <Header
        state={state}
        onReset={handleReset}
        onOpenShortcuts={() => setShowShortcuts(true)}
        onSelectSample={handleSelectSample}
      />

      {/* Main Application Layout */}
      <div className="flex-1 flex flex-col-reverse lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Control Rail */}
        <ControlRail
          state={state}
          onImageSelected={handleImageSelected}
          onClearImage={handleClearImage}
          onSelectSample={handleSelectSample}
          onChangeFrame={(frameType) => setState((prev) => ({ ...prev, frameType }))}
          onChangeDeviceTheme={(deviceTheme) => setState((prev) => ({ ...prev, deviceTheme }))}
          onChangeOrientation={(orientation) => setState((prev) => ({ ...prev, orientation }))}
          onChangeBrowserUrl={(browserUrl) => setState((prev) => ({ ...prev, browserUrl }))}
          onChangeBrowserTheme={(browserTheme) => setState((prev) => ({ ...prev, browserTheme }))}
          onChangeBackground={(background) => setState((prev) => ({ ...prev, background }))}
          onChangeAspectRatio={(aspectRatio) => setState((prev) => ({ ...prev, aspectRatio }))}
          onChangeScale={(deviceScale) => setState((prev) => ({ ...prev, deviceScale }))}
          onChangePadding={(padding) => setState((prev) => ({ ...prev, padding }))}
          onChangeShowShadow={(showShadow) => setState((prev) => ({ ...prev, showShadow }))}
          onChangeShadowIntensity={(shadowIntensity) =>
            setState((prev) => ({ ...prev, shadowIntensity }))
          }
        />

        {/* Right Interactive Canvas Stage */}
        <CanvasStage
          state={state}
          onSelectSample={handleSelectSample}
          onImageSelected={handleImageSelected}
        />
      </div>

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
