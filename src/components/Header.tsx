import { Scissors, Sparkles, Zap } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
  clipCount?: number;
}

export default function Header({ onLogoClick, clipCount = 0 }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none">
                <span className="gradient-text">Clip</span>
                <span className="text-white">Forge</span>
              </span>
              <span className="text-[10px] text-text-muted leading-none mt-0.5">AI Video Clipper</span>
            </div>
          </button>

          {/* Center - Status */}
          <div className="hidden md:flex items-center gap-3">
            {clipCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-success">{clipCount} clips ready</span>
              </div>
            )}
          </div>

          {/* Right - Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary-light" />
              <span className="text-xs font-medium text-primary-light">AI</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">9:16</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <span className="text-xs font-medium text-success">No Watermark</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
