import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Check, Sparkles, Film, Monitor, Zap, Layers, CheckCircle2, Clock, HardDrive } from 'lucide-react';
import { Clip, ExportSettings } from '../types';

interface ExportModalProps {
  clip: Clip;
  clips: Clip[];
  batchMode: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExportModal({ clip, clips, batchMode, onClose, onConfirm }: ExportModalProps) {
  const [settings, setSettings] = useState<ExportSettings>({
    resolution: '1080x1920',
    fps: 30,
    format: 'mp4',
    quality: 'high',
    addCaptions: true,
    addTransitions: true,
    backgroundColor: '#000000',
    autoReframe: true,
    normalizeAudio: true,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const resolutions = [
    { value: '1080x1920' as const, label: '1080p', desc: 'Full HD • Recommended', size: '~25MB' },
    { value: '720x1280' as const, label: '720p', desc: 'HD • Faster', size: '~12MB' },
    { value: '2160x3840' as const, label: '4K', desc: 'Ultra HD • Best', size: '~80MB' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          onConfirm();
        }, 500);
      }
      setExportProgress(progress);
    }, 300);
  };

  const totalDuration = clips.reduce((acc, c) => acc + c.duration, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-card-elevated rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {batchMode ? 'Batch Export' : 'Export Clip'}
              </h3>
              <p className="text-xs text-text-muted">
                {batchMode 
                  ? `${clips.length} clips • ${Math.round(totalDuration / 60)}min total`
                  : `"${clip.title}" • ${clip.duration}s`
                }
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center text-text-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!isExporting ? (
          <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto">
            {/* Resolution */}
            <div>
              <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-primary-light" />
                Resolution
              </label>
              <div className="grid grid-cols-3 gap-2">
                {resolutions.map((res) => (
                  <button
                    key={res.value}
                    onClick={() => setSettings({ ...settings, resolution: res.value })}
                    className={`p-3 rounded-xl text-center transition-all ${
                      settings.resolution === res.value
                        ? 'bg-primary/15 border border-primary/25'
                        : 'bg-surface-lighter border border-transparent hover:border-white/10'
                    }`}
                  >
                    <span className="text-sm font-bold text-white block">{res.label}</span>
                    <span className="text-[10px] text-text-muted block">{res.desc}</span>
                    <span className="text-[10px] text-text-muted font-mono">{res.size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format & FPS Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Film className="w-4 h-4 text-primary-light" />
                  Format
                </label>
                <div className="flex gap-2">
                  {(['mp4', 'webm', 'mov'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSettings({ ...settings, format: fmt })}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                        settings.format === fmt
                          ? 'bg-primary/15 border border-primary/25 text-primary-light'
                          : 'bg-surface-lighter border border-transparent text-text-muted hover:text-white hover:border-white/10'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-light" />
                  Frame Rate
                </label>
                <div className="flex gap-2">
                  {([30, 60] as const).map((fps) => (
                    <button
                      key={fps}
                      onClick={() => setSettings({ ...settings, fps })}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        settings.fps === fps
                          ? 'bg-primary/15 border border-primary/25 text-primary-light'
                          : 'bg-surface-lighter border border-transparent text-text-muted hover:text-white hover:border-white/10'
                      }`}
                    >
                      {fps} FPS
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary-light" />
                Quality
              </label>
              <div className="flex gap-2">
                {(['high', 'medium', 'low'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setSettings({ ...settings, quality: q })}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      settings.quality === q
                        ? 'bg-primary/15 border border-primary/25 text-primary-light'
                        : 'bg-surface-lighter border border-transparent text-text-muted hover:text-white hover:border-white/10'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="text-sm font-semibold text-white mb-3 block">Advanced Options</label>
              <div className="space-y-2">
                {[
                  { key: 'addCaptions', label: 'Include Animated Captions', icon: <Sparkles className="w-4 h-4 text-primary-light" /> },
                  { key: 'addTransitions', label: 'Include Transitions', icon: <Film className="w-4 h-4 text-primary-light" /> },
                  { key: 'autoReframe', label: 'AI Auto-Reframe (9:16)', icon: <Monitor className="w-4 h-4 text-primary-light" /> },
                  { key: 'normalizeAudio', label: 'Normalize Audio Levels', icon: <Zap className="w-4 h-4 text-primary-light" /> },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-lighter cursor-pointer hover:bg-surface-elevated transition-colors border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      {opt.icon}
                      <span className="text-sm text-white">{opt.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[opt.key as keyof ExportSettings] as boolean}
                      onChange={(e) => setSettings({ ...settings, [opt.key]: e.target.checked })}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* No Watermark Notice */}
            <div className="p-4 rounded-xl bg-success/10 border border-success/15">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-success">No Watermark</p>
                  <p className="text-xs text-success/70">Your clip will be exported clean without any branding</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Export Progress */
          <div className="p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6 border border-primary/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Download className="w-8 h-8 text-primary-light" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {exportProgress >= 100 ? 'Export Complete!' : 'Exporting...'}
            </h3>
            <p className="text-sm text-text-muted mb-6">
              {exportProgress >= 100 
                ? 'Your clip is ready for download'
                : 'Processing your video with AI enhancements'
              }
            </p>
            <div className="w-full h-3 bg-surface-lighter rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(exportProgress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-text-muted font-mono">{Math.round(Math.min(exportProgress, 100))}%</p>
          </div>
        )}

        {/* Footer */}
        {!isExporting && (
          <div className="p-6 border-t border-white/5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-lighter text-text-muted font-medium hover:text-white transition-colors border border-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="btn-primary flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {batchMode ? `Export ${clips.length} Clips` : 'Export Now'}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
