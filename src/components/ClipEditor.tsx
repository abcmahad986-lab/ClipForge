import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scissors, Play, Pause, SkipBack, SkipForward, Type,
  Download, Sparkles, Film, Volume2, VolumeX,
  ZoomIn, Move, Layers,
  Maximize2
} from 'lucide-react';
import { Clip, VideoInfo } from '../types';

interface ClipEditorProps {
  videoInfo: VideoInfo;
  clips: Clip[];
  selectedClip: Clip | null;
  onSelectClip: (clip: Clip) => void;
  onUpdateClip: (clip: Clip) => void;
  onExport: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function ClipEditor({
  videoInfo,
  clips,
  selectedClip,
  onSelectClip,
  onUpdateClip,
  onExport,
}: ClipEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'clips' | 'text' | 'effects' | 'crop'>('clips');
  const [textInput, setTextInput] = useState(selectedClip?.textOverlay || '');
  const [captionStyle, setCaptionStyle] = useState<Clip['captionStyle']>('bold');
  const [transition, setTransition] = useState<Clip['transition']>('none');
  const [cropPosition, setCropPosition] = useState(50);

  const handleClipSelect = (clip: Clip) => {
    onSelectClip(clip);
    setCurrentTime(0);
    setTextInput(clip.textOverlay || '');
    setCaptionStyle(clip.captionStyle || 'bold');
    setTransition(clip.transition || 'none');
    setCropPosition(clip.cropPosition || 50);
  };

  const handleUpdateText = () => {
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, textOverlay: textInput });
    }
  };

  const handleUpdateCaptionStyle = (style: Clip['captionStyle']) => {
    setCaptionStyle(style);
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, captionStyle: style });
    }
  };

  const handleUpdateTransition = (t: Clip['transition']) => {
    setTransition(t);
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, transition: t });
    }
  };

  const handleUpdateCrop = (pos: number) => {
    setCropPosition(pos);
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, cropPosition: pos });
    }
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="glass-card border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Film className="w-4 h-4 text-primary-light" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-none">
                {videoInfo.title}
              </h2>
              <p className="text-xs text-text-secondary">{videoInfo.channel} • {formatTime(videoInfo.duration)}</p>
            </div>
          </div>
          <button
            onClick={onExport}
            disabled={!selectedClip}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Clip</span>
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Clip List */}
        <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto max-h-[300px] lg:max-h-none">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-primary-light" />
              Detected Clips ({clips.length})
            </h3>
            <div className="space-y-2">
              {clips.map((clip) => (
                <motion.button
                  key={clip.id}
                  onClick={() => handleClipSelect(clip)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedClip?.id === clip.id
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-surface-lighter/50 border border-transparent hover:bg-surface-lighter'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-medium text-white truncate pr-2">{clip.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      clip.score >= 90 ? 'bg-success/20 text-success' :
                      clip.score >= 80 ? 'bg-warning/20 text-warning' :
                      'bg-text-secondary/20 text-text-secondary'
                    }`}>
                      {clip.score}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>{formatTime(clip.startTime)} - {formatTime(clip.endTime)}</span>
                    <span>•</span>
                    <span>{clip.duration}s</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {clip.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Preview */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-surface/50">
          {/* 9:16 Preview */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
            <div className="aspect-9-16 rounded-2xl overflow-hidden bg-surface-lighter border-2 border-white/10 relative">
              {/* Video Preview Simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-surface-lighter to-surface-light flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-primary-light" />
                    ) : (
                      <Play className="w-8 h-8 text-primary-light ml-1" />
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">
                    {selectedClip ? selectedClip.title : 'Select a clip'}
                  </p>
                  {selectedClip && (
                    <p className="text-[10px] text-text-secondary/50 mt-1">
                      {formatTime(selectedClip.startTime)} - {formatTime(selectedClip.endTime)}
                    </p>
                  )}
                </div>
              </div>

              {/* Crop Indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary/50 transition-all"
                style={{ left: `${cropPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white/50" />
              </div>

              {/* Text Overlay Preview */}
              {textInput && (
                <div className="absolute bottom-16 left-4 right-4">
                  <p className={`text-center font-bold text-white drop-shadow-lg ${
                    captionStyle === 'bold' ? 'text-lg' :
                    captionStyle === 'minimal' ? 'text-sm font-normal' :
                    captionStyle === 'karaoke' ? 'text-lg text-primary-light' :
                    'text-lg'
                  }`}>
                    {captionStyle === 'highlight' ? (
                      <span className="bg-primary/40 px-2 py-1 rounded">
                        {textInput}
                      </span>
                    ) : textInput}
                  </p>
                </div>
              )}

              {/* 9:16 Label */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/50 text-[10px] text-white/70 font-mono">
                9:16
              </div>

              {/* No Watermark Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-success/20 text-[10px] text-success font-medium">
                No Watermark
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
              className="w-9 h-9 rounded-lg bg-surface-lighter flex items-center justify-center text-text-secondary hover:text-white transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentTime(Math.min(selectedClip?.duration || 60, currentTime + 5))}
              className="w-9 h-9 rounded-lg bg-surface-lighter flex items-center justify-center text-text-secondary hover:text-white transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-lg bg-surface-lighter flex items-center justify-center text-text-secondary hover:text-white transition-colors ml-2"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Time Display */}
          <div className="mt-3 text-xs text-text-secondary font-mono">
            {formatTime(currentTime)} / {selectedClip ? formatTime(selectedClip.duration) : '0:00'}
          </div>

          {/* Timeline */}
          {selectedClip && (
            <div className="mt-4 w-full max-w-md">
              <div className="timeline-track h-12 rounded-xl relative overflow-hidden">
                {/* Waveform Simulation */}
                <div className="absolute inset-0 flex items-center gap-[2px] px-2">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{
                        height: `${20 + Math.random() * 60}%`,
                        backgroundColor: i >= (currentTime / selectedClip.duration) * 60
                          ? 'rgba(139, 92, 246, 0.3)'
                          : 'rgba(139, 92, 246, 0.7)',
                      }}
                    />
                  ))}
                </div>
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white"
                  style={{ left: `${(currentTime / selectedClip.duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Tools */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 overflow-y-auto max-h-[400px] lg:max-h-none">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {[
              { id: 'text', icon: <Type className="w-4 h-4" />, label: 'Text' },
              { id: 'effects', icon: <Sparkles className="w-4 h-4" />, label: 'Effects' },
              { id: 'crop', icon: <Maximize2 className="w-4 h-4" />, label: 'Crop' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-light border-b-2 border-primary'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* Text Tab */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Text Overlay</label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Add text to your clip..."
                    className="w-full px-3 py-2.5 bg-surface-lighter rounded-xl border border-white/10 text-white text-sm placeholder-text-secondary focus:border-primary/50 focus:outline-none resize-none h-20"
                  />
                  <button
                    onClick={handleUpdateText}
                    className="mt-2 w-full py-2 bg-primary/20 text-primary-light rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors"
                  >
                    Apply Text
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Caption Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'bold' as const, label: 'Bold', desc: 'Large & bold' },
                      { id: 'minimal' as const, label: 'Minimal', desc: 'Clean & simple' },
                      { id: 'karaoke' as const, label: 'Karaoke', desc: 'Word by word' },
                      { id: 'highlight' as const, label: 'Highlight', desc: 'Background box' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => handleUpdateCaptionStyle(style.id)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          captionStyle === style.id
                            ? 'bg-primary/20 border border-primary/30'
                            : 'bg-surface-lighter border border-transparent hover:border-white/10'
                        }`}
                      >
                        <span className="text-xs font-medium text-white block">{style.label}</span>
                        <span className="text-[10px] text-text-secondary">{style.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Effects Tab */}
            {activeTab === 'effects' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Transitions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none' as const, label: 'None', icon: <Layers className="w-4 h-4" /> },
                      { id: 'fade' as const, label: 'Fade', icon: <Sparkles className="w-4 h-4" /> },
                      { id: 'zoom' as const, label: 'Zoom', icon: <ZoomIn className="w-4 h-4" /> },
                      { id: 'slide' as const, label: 'Slide', icon: <Move className="w-4 h-4" /> },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleUpdateTransition(t.id)}
                        className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                          transition === t.id
                            ? 'bg-primary/20 border border-primary/30'
                            : 'bg-surface-lighter border border-transparent hover:border-white/10'
                        }`}
                      >
                        <span className="text-primary-light">{t.icon}</span>
                        <span className="text-xs font-medium text-white">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Color Filters</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['None', 'Warm', 'Cool', 'B&W', 'Vintage', 'Vivid', 'Cinema', 'Dream'].map((filter) => (
                      <button
                        key={filter}
                        className="p-2 rounded-lg bg-surface-lighter border border-transparent hover:border-primary/30 transition-all text-center"
                      >
                        <div className={`w-8 h-8 mx-auto rounded-lg mb-1 ${
                          filter === 'None' ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                          filter === 'Warm' ? 'bg-gradient-to-br from-orange-400 to-red-600' :
                          filter === 'Cool' ? 'bg-gradient-to-br from-blue-400 to-cyan-600' :
                          filter === 'B&W' ? 'bg-gradient-to-br from-gray-200 to-gray-800' :
                          filter === 'Vintage' ? 'bg-gradient-to-br from-amber-300 to-amber-700' :
                          filter === 'Vivid' ? 'bg-gradient-to-br from-pink-400 to-purple-600' :
                          filter === 'Cinema' ? 'bg-gradient-to-br from-teal-400 to-slate-800' :
                          'bg-gradient-to-br from-purple-300 to-pink-400'
                        }`} />
                        <span className="text-[10px] text-text-secondary">{filter}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Speed</label>
                  <div className="flex gap-2">
                    {['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'].map((speed) => (
                      <button
                        key={speed}
                        className="flex-1 py-2 rounded-lg bg-surface-lighter border border-transparent hover:border-primary/30 text-xs text-text-secondary hover:text-white transition-all"
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Crop Tab */}
            {activeTab === 'crop' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">
                    Horizontal Position (Subject Tracking)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cropPosition}
                    onChange={(e) => handleUpdateCrop(Number(e.target.value))}
                    className="w-full h-2 bg-surface-lighter rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary mt-1">
                    <span>Left</span>
                    <span>Center</span>
                    <span>Right</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Aspect Ratio</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="p-3 rounded-xl bg-primary/20 border border-primary/30 text-center">
                      <div className="w-4 h-7 mx-auto rounded border-2 border-primary-light mb-1" />
                      <span className="text-[10px] text-primary-light font-medium">9:16</span>
                    </button>
                    <button className="p-3 rounded-xl bg-surface-lighter border border-transparent text-center hover:border-white/10">
                      <div className="w-5 h-5 mx-auto rounded border-2 border-text-secondary mb-1" />
                      <span className="text-[10px] text-text-secondary">1:1</span>
                    </button>
                    <button className="p-3 rounded-xl bg-surface-lighter border border-transparent text-center hover:border-white/10">
                      <div className="w-7 h-4 mx-auto rounded border-2 border-text-secondary mb-1" />
                      <span className="text-[10px] text-text-secondary">16:9</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">Background</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['#000000', '#1a1a2e', '#ffffff', '#8b5cf6', '#06b6d4'].map((color) => (
                      <button
                        key={color}
                        className="w-full aspect-square rounded-lg border-2 border-white/10 hover:border-primary/50 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <p className="text-xs text-accent">
                    💡 AI will auto-track the main subject and keep them centered in the 9:16 frame.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
