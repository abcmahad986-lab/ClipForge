import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Check, Sparkles, Film, Monitor, Zap } from 'lucide-react';
import { Clip, ExportSettings } from '../types';

interface ExportModalProps {
  clip: Clip;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExportModal({ clip, onClose, onConfirm }: ExportModalProps) {
  const [settings, setSettings] = useState<ExportSettings>({
    resolution: '1080x1920',
    fps: 30,
    format: 'mp4',
    quality: 'high',
    addCaptions: true,
    addTransitions: true,
    backgroundColor: '#000000',
  });

  const resolutions = [
    { value: '1080x1920', label: '1080p', desc: 'Full HD • Recommended' },
    { value: '720x1280', label: '720p', desc: 'HD • Faster export' },
    { value: '2160x3840', label: '4K', desc: 'Ultra HD • Best quality' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-card rounded-3xl border border-white/10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-primary-light" />
              Export Settings
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              "{clip.title}" • {clip.duration}s
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Resolution */}
          <div>
            <label className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-primary-light" />
              Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {resolutions.map((res) => (
                <button
                  key={res.value}
                  onClick={() => setSettings({ ...settings, resolution: res.value as ExportSettings['resolution'] })}
                  className={`p-3 rounded-xl text-center transition-all ${
                    settings.resolution === res.value
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-surface-lighter border border-transparent hover:border-white/10'
                  }`}
                >
                  <span className="text-sm font-semibold text-white block">{res.label}</span>
                  <span className="text-[10px] text-text-secondary">{res.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Film className="w-4 h-4 text-primary-light" />
              Format
            </label>
            <div className="flex gap-2">
              {(['mp4', 'webm'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSettings({ ...settings, format: fmt })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    settings.format === fmt
                      ? 'bg-primary/20 border border-primary/30 text-primary-light'
                      : 'bg-surface-lighter border border-transparent text-text-secondary hover:border-white/10'
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* FPS */}
          <div>
            <label className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-light" />
              Frame Rate
            </label>
            <div className="flex gap-2">
              {([30, 60] as const).map((fps) => (
                <button
                  key={fps}
                  onClick={() => setSettings({ ...settings, fps })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    settings.fps === fps
                      ? 'bg-primary/20 border border-primary/30 text-primary-light'
                      : 'bg-surface-lighter border border-transparent text-text-secondary hover:border-white/10'
                  }`}
                >
                  {fps} FPS
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="text-sm font-medium text-white mb-3 block">Quality</label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSettings({ ...settings, quality: q })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                    settings.quality === q
                      ? 'bg-primary/20 border border-primary/30 text-primary-light'
                      : 'bg-surface-lighter border border-transparent text-text-secondary hover:border-white/10'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white block">Options</label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-surface-lighter cursor-pointer hover:bg-surface-lighter/80 transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-primary-light" />
                  <span className="text-sm text-white">Include Captions</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.addCaptions}
                  onChange={(e) => setSettings({ ...settings, addCaptions: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-surface-lighter text-primary focus:ring-primary/50"
                />
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl bg-surface-lighter cursor-pointer hover:bg-surface-lighter/80 transition-colors">
                <div className="flex items-center gap-3">
                  <Film className="w-4 h-4 text-primary-light" />
                  <span className="text-sm text-white">Include Transitions</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.addTransitions}
                  onChange={(e) => setSettings({ ...settings, addTransitions: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-surface-lighter text-primary focus:ring-primary/50"
                />
              </label>
            </div>
          </div>

          {/* No Watermark Notice */}
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-success">No Watermark</p>
                <p className="text-xs text-success/70">Your clip will be exported clean without any branding</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-surface-lighter text-text-secondary font-medium hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Export Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
