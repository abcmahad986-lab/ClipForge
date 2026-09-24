import { Scissors, Sparkles } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Clip</span>
              <span className="text-white">Forge</span>
            </span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary-light" />
              <span className="text-xs font-medium text-primary-light">AI Powered</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-medium text-accent">9:16 Shorts</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
