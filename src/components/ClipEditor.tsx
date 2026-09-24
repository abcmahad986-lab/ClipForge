import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Type,
  Download, Sparkles, Film, Volume2, VolumeX,
  ZoomIn, Move, Layers, Maximize2, Trash2,
  Scissors, Wand2, Clock, TrendingUp, Zap
} from 'lucide-react';
import { Clip, VideoInfo } from '../types';

interface ClipEditorProps {
  videoInfo: VideoInfo;
  clips: Clip[];
  selectedClip: Clip | null;
  onSelectClip: (clip: Clip) => void;
  onUpdateClip: (clip: Clip) => void;
  onDeleteClip: (clipId: string) => void;
  onExport: (batch?: boolean) => void;
}

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-success bg-success/15 border-success/20';
  if (score >= 80) return 'text-warning bg-warning/15 border-warning/20';
  return 'text-text-secondary bg-text-secondary/15 border-text-secondary/20';
}

export default function ClipEditor({
  videoInfo,
  clips,
  selectedClip,
  onSelectClip,
  onUpdateClip,
  onDeleteClip,
  onExport,
}: ClipEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'effects' | 'crop'>('text');
  const [textInput, setTextInput] = useState(selectedClip?.textOverlay || '');
  const [captionStyle, setCaptionStyle] = useState<Clip['captionStyle']>('bold');
  const [transition, setTransition] = useState<Clip['transition']>('fade');
  const [cropPosition, setCropPosition] = useState(50);
  const [cropZoom, setCropZoom] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [filter, setFilter] = useState('none');
  const [showClipMenu, setShowClipMenu] = useState(false);

  // Generate waveform data
  const waveformBars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      height: 15 + Math.sin(i * 0.3) * 25 + Math.random() * 40,
      isPlayed: false,
    }));
  }, []);

  const handleClipSelect = (clip: Clip) => {
    onSelectClip(clip);
    setCurrentTime(0);
    setTextInput(clip.textOverlay || '');
    setCaptionStyle(clip.captionStyle || 'bold');
    setTransition(clip.transition || 'fade');
    setCropPosition(clip.cropPosition || 50);
    setCropZoom(clip.cropZoom || 100);
    setSpeed(clip.speed || 1);
    setFilter(clip.filter || 'none');
  };

  const handleUpdateText = () => {
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, textOverlay: textInput, captionStyle });
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

  const handleUpdateZoom = (zoom: number) => {
    setCropZoom(zoom);
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, cropZoom: zoom });
    }
  };

  const handleUpdateSpeed = (s: number) => {
    setSpeed(s);
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, speed: s });
    }
  };

  const handleUpdateFilter = (f: string) => {
    setFilter(f);
    if (selectedClip) {
      onUpdateClip({ ...selectedClip, filter: f });
    }
  };

  const avgScore = clips.length > 0 ? Math.round(clips.reduce((acc, c) => acc + c.score, 0) / clips.length) : 0;
  const totalDuration = clips.reduce((acc, c) => acc + c.duration, 0);

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="glass-card-elevated border-b border-white/5 px-4 sm:px-6 py-3 sticky top-16 z-40">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Film className="w-4 h-4 text-primary-light" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">{videoInfo.title}</h2>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span>{videoInfo.channel}</span>
                <span>•</span>
                <span>{formatTime(videoInfo.duration)}</span>
                {videoInfo.views && <><span>•</span><span>{videoInfo.views} views</span></>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stats Pills */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-lighter border border-white/5">
                <Scissors className="w-3.5 h-3.5 text-primary-light" />
                <span className="text-xs font-medium text-white">{clips.length} clips</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-lighter border border-white/5">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-medium text-white">{avgScore}% avg</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-lighter border border-white/5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-medium text-white">{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Export Buttons */}
            <button
              onClick={() => onExport(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-lighter border border-white/10 text-text-secondary hover:text-white hover:border-primary/30 transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </button>
            <button
              onClick={() => onExport(false)}
              disabled={!selectedClip}
              className="btn-primary flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold text-sm disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Clip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex-1 flex flex-col xl:flex-row">
        {/* Left Panel - Clip List */}
        <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r border-white/5 overflow-y-auto max-h-[250px] xl:max-h-[calc(100vh-140px)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Scissors className="w-4 h-4 text-primary-light" />
                AI Detected Clips
              </h3>
              <span className="text-xs text-text-muted px-2 py-0.5 rounded-full bg-surface-lighter">{clips.length}</span>
            </div>
            
            <div className="space-y-2">
              {clips.map((clip, index) => (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    selectedClip?.id === clip.id
                      ? 'bg-primary/15 border border-primary/25 shadow-lg shadow-primary/5'
                      : 'bg-surface-lighter/40 border border-transparent hover:bg-surface-lighter hover:border-white/5'
                  }`}
                  onClick={() => handleClipSelect(clip)}
                >
                  {/* Score Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-text-muted shrink-0">#{index + 1}</span>
                      <h4 className="text-sm font-medium text-white truncate">{clip.title}</h4>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border shrink-0 ${getScoreColor(clip.score)}`}>
                      {clip.score}%
                    </span>
                  </div>

                  {/* Time & Duration */}
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                    <span className="font-mono">{formatTime(clip.startTime)} → {formatTime(clip.endTime)}</span>
                    <span>•</span>
                    <span>{clip.duration}s</span>
                  </div>

                  {/* Highlight */}
                  {clip.highlight && (
                    <p className="text-[11px] text-text-muted leading-relaxed mb-2 line-clamp-2">{clip.highlight}</p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {clip.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-text-muted border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteClip(clip.id); }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-md bg-danger/20 text-danger opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-danger/30"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Preview */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-8 bg-surface/50 min-h-0">
          {/* 9:16 Preview Container */}
          <div className="relative w-full max-w-[260px] sm:max-w-[300px]">
            {/* Phone Frame */}
            <div className="aspect-9-16 rounded-[2rem] overflow-hidden bg-surface-lighter border-2 border-white/10 relative shadow-2xl shadow-black/40">
              {/* Video Content Simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-surface-lighter to-surface flex items-center justify-center" style={{
                transform: `scale(${cropZoom / 100}) translateX(${(cropPosition - 50) * 0.5}%)`,
              }}>
                <div className="text-center px-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4 border border-primary/20">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-primary-light" />
                    ) : (
                      <Play className="w-8 h-8 text-primary-light ml-1" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-white mb-1">
                    {selectedClip ? selectedClip.title : 'Select a clip'}
                  </p>
                  {selectedClip && (
                    <p className="text-xs text-text-muted">
                      {formatTime(selectedClip.startTime)} - {formatTime(selectedClip.endTime)}
                    </p>
                  )}
                  {speed !== 1 && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-medium">
                      <Zap className="w-3 h-3" />
                      {speed}x speed
                    </div>
                  )}
                </div>
              </div>

              {/* Crop Guide Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/5" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/5" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/5" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/5" />
              </div>

              {/* Crop Position Indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary/60 transition-all duration-150"
                style={{ left: `${cropPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-white/70 shadow-lg" />
              </div>

              {/* Text Overlay Preview */}
              {textInput && (
                <div className="absolute bottom-20 left-4 right-4">
                  <p className={`text-center font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                    captionStyle === 'bold' ? 'text-xl' :
                    captionStyle === 'minimal' ? 'text-sm font-normal opacity-90' :
                    captionStyle === 'karaoke' ? 'text-xl text-primary-light' :
                    captionStyle === 'highlight' ? 'text-lg' :
                    'text-lg font-mono'
                  }`}>
                    {captionStyle === 'highlight' ? (
                      <span className="bg-primary/50 px-3 py-1.5 rounded-lg">{textInput}</span>
                    ) : captionStyle === 'typewriter' ? (
                      <span className="border-r-2 border-primary-light pr-1">{textInput}</span>
                    ) : textInput}
                  </p>
                </div>
              )}

              {/* Top Labels */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] text-white/80 font-mono border border-white/10">
                  9:16
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-success/20 backdrop-blur-sm text-[10px] text-success font-medium border border-success/20">
                  Clean
                </div>
              </div>

              {/* Filter Overlay */}
              {filter !== 'none' && (
                <div className={`absolute inset-0 pointer-events-none mix-blend-overlay ${
                  filter === 'warm' ? 'bg-orange-500/20' :
                  filter === 'cool' ? 'bg-blue-500/20' :
                  filter === 'vintage' ? 'bg-amber-700/20' :
                  filter === 'cinema' ? 'bg-teal-500/15' :
                  filter === 'vivid' ? 'bg-purple-500/15' :
                  filter === 'bw' ? 'bg-gray-500/30 grayscale' :
                  ''
                }`} />
              )}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
              className="w-10 h-10 rounded-xl bg-surface-lighter flex items-center justify-center text-text-muted hover:text-white hover:bg-surface-elevated transition-all border border-white/5"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white hover:opacity-90 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentTime(Math.min(selectedClip?.duration || 60, currentTime + 5))}
              className="w-10 h-10 rounded-xl bg-surface-lighter flex items-center justify-center text-text-muted hover:text-white hover:bg-surface-elevated transition-all border border-white/5"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-xl bg-surface-lighter flex items-center justify-center text-text-muted hover:text-white hover:bg-surface-elevated transition-all border border-white/5 ml-2"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Time Display */}
          <div className="mt-3 text-xs text-text-muted font-mono text-center">
            <span className="text-white">{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span>{selectedClip ? formatTime(selectedClip.duration) : '0:00'}</span>
          </div>

          {/* Waveform Timeline */}
          {selectedClip && (
            <div className="mt-5 w-full max-w-md">
              <div className="timeline-track h-14 rounded-xl relative overflow-hidden border border-white/5">
                {/* Waveform */}
                <div className="absolute inset-0 flex items-center gap-[1.5px] px-2">
                  {waveformBars.map((bar, i) => {
                    const playProgress = (currentTime / selectedClip.duration) * 100;
                    const barPosition = (i / waveformBars.length) * 100;
                    const isPlayed = barPosition <= playProgress;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full transition-colors duration-100"
                        style={{
                          height: `${bar.height}%`,
                          backgroundColor: isPlayed
                            ? 'rgba(139, 92, 246, 0.8)'
                            : 'rgba(139, 92, 246, 0.2)',
                        }}
                      />
                    );
                  })}
                </div>
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  style={{ left: `${(currentTime / selectedClip.duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Tools */}
        <div className="w-full xl:w-80 border-t xl:border-t-0 xl:border-l border-white/5 overflow-y-auto max-h-[500px] xl:max-h-[calc(100vh-140px)]">
          {/* Tabs */}
          <div className="flex border-b border-white/5 sticky top-0 bg-surface-light/95 backdrop-blur-sm z-10">
            {[
              { id: 'text' as const, icon: <Type className="w-4 h-4" />, label: 'Captions' },
              { id: 'effects' as const, icon: <Sparkles className="w-4 h-4" />, label: 'Effects' },
              { id: 'crop' as const, icon: <Maximize2 className="w-4 h-4" />, label: 'Crop & Zoom' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-primary-light border-b-2 border-primary bg-primary/5'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 space-y-5">
            {/* Text/Captions Tab */}
            {activeTab === 'text' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-primary-light" />
                    Text Overlay
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your caption text here..."
                    className="w-full px-4 py-3 bg-surface-lighter rounded-xl border border-white/5 text-white text-sm placeholder-text-muted focus:border-primary/30 resize-none h-24 transition-colors"
                  />
                  <button
                    onClick={handleUpdateText}
                    className="mt-2.5 w-full py-2.5 bg-primary/15 text-primary-light rounded-xl text-sm font-medium hover:bg-primary/25 transition-colors border border-primary/20"
                  >
                    Apply Text
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    <Wand2 className="w-3.5 h-3.5 text-primary-light" />
                    Caption Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'bold' as const, label: 'Bold', desc: 'Large & impactful' },
                      { id: 'minimal' as const, label: 'Minimal', desc: 'Clean & subtle' },
                      { id: 'karaoke' as const, label: 'Karaoke', desc: 'Word-by-word' },
                      { id: 'highlight' as const, label: 'Highlight', desc: 'Background box' },
                      { id: 'typewriter' as const, label: 'Typewriter', desc: 'Letter-by-letter' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => handleUpdateCaptionStyle(style.id)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          captionStyle === style.id
                            ? 'bg-primary/15 border border-primary/25'
                            : 'bg-surface-lighter border border-transparent hover:border-white/10'
                        }`}
                      >
                        <span className="text-xs font-semibold text-white block">{style.label}</span>
                        <span className="text-[10px] text-text-muted">{style.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Effects Tab */}
            {activeTab === 'effects' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-primary-light" />
                    Transitions
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'none' as const, label: 'None' },
                      { id: 'fade' as const, label: 'Fade' },
                      { id: 'zoom' as const, label: 'Zoom' },
                      { id: 'slide' as const, label: 'Slide' },
                      { id: 'glitch' as const, label: 'Glitch' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleUpdateTransition(t.id)}
                        className={`p-2.5 rounded-xl text-center transition-all ${
                          transition === t.id
                            ? 'bg-primary/15 border border-primary/25'
                            : 'bg-surface-lighter border border-transparent hover:border-white/10'
                        }`}
                      >
                        <span className="text-xs font-medium text-white">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary-light" />
                    Color Filter
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'none', label: 'None', color: 'from-gray-400 to-gray-600' },
                      { id: 'warm', label: 'Warm', color: 'from-orange-400 to-red-600' },
                      { id: 'cool', label: 'Cool', color: 'from-blue-400 to-cyan-600' },
                      { id: 'bw', label: 'B&W', color: 'from-gray-200 to-gray-800' },
                      { id: 'vintage', label: 'Vintage', color: 'from-amber-300 to-amber-700' },
                      { id: 'vivid', label: 'Vivid', color: 'from-pink-400 to-purple-600' },
                      { id: 'cinema', label: 'Cinema', color: 'from-teal-400 to-slate-800' },
                      { id: 'dream', label: 'Dream', color: 'from-purple-300 to-pink-400' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleUpdateFilter(f.id)}
                        className={`p-2 rounded-xl text-center transition-all ${
                          filter === f.id ? 'ring-2 ring-primary/50' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 mx-auto rounded-lg mb-1 bg-gradient-to-br ${f.color}`} />
                        <span className="text-[10px] text-text-muted">{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-primary-light" />
                    Playback Speed
                  </label>
                  <div className="flex gap-1.5">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleUpdateSpeed(s)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                          speed === s
                            ? 'bg-primary/15 border border-primary/25 text-primary-light'
                            : 'bg-surface-lighter border border-transparent text-text-muted hover:text-white hover:border-white/10'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Crop Tab */}
            {activeTab === 'crop' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Move className="w-3.5 h-3.5 text-primary-light" />
                      Horizontal Position
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">{cropPosition}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cropPosition}
                    onChange={(e) => handleUpdateCrop(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted mt-1.5">
                    <span>Left</span>
                    <span>Center</span>
                    <span>Right</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ZoomIn className="w-3.5 h-3.5 text-primary-light" />
                      Zoom Level
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">{cropZoom}%</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    value={cropZoom}
                    onChange={(e) => handleUpdateZoom(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted mt-1.5">
                    <span>100%</span>
                    <span>150%</span>
                    <span>200%</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5 text-primary-light" />
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="p-3 rounded-xl bg-primary/15 border border-primary/25 text-center">
                      <div className="w-4 h-7 mx-auto rounded border-2 border-primary-light mb-1.5" />
                      <span className="text-[10px] text-primary-light font-semibold">9:16</span>
                    </button>
                    <button className="p-3 rounded-xl bg-surface-lighter border border-transparent text-center hover:border-white/10 transition-colors">
                      <div className="w-5 h-5 mx-auto rounded border-2 border-text-muted mb-1.5" />
                      <span className="text-[10px] text-text-muted">1:1</span>
                    </button>
                    <button className="p-3 rounded-xl bg-surface-lighter border border-transparent text-center hover:border-white/10 transition-colors">
                      <div className="w-7 h-4 mx-auto rounded border-2 border-text-muted mb-1.5" />
                      <span className="text-[10px] text-text-muted">16:9</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                    Background Fill
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#000000', '#0a0a14', '#1e1e3a', '#ffffff', '#8b5cf6', '#06b6d4'].map((color) => (
                      <button
                        key={color}
                        className="aspect-square rounded-lg border-2 border-white/10 hover:border-primary/50 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Tip */}
                <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/15">
                  <div className="flex gap-2.5">
                    <Wand2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-accent/90 leading-relaxed">
                      <span className="font-semibold text-accent">AI Auto-Track:</span> Enable to automatically follow the main subject and keep them centered in the 9:16 frame.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
