import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Scissors, Zap, Film, Sparkles, ArrowRight, Play, Wand2, Download } from 'lucide-react';

interface LandingPageProps {
  onSubmit: (url: string) => void;
}

export default function LandingPage({ onSubmit }: LandingPageProps) {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const features = [
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: 'AI Clip Detection',
      description: 'Automatically finds the most engaging moments in your video',
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: '9:16 Auto Crop',
      description: 'Smart cropping that keeps subjects centered in vertical format',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Auto Captions',
      description: 'Generate stylish captions with multiple animation styles',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'No Watermarks',
      description: 'Export clean, professional clips without any branding',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Process and export clips in seconds, not hours',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: 'Smart Transitions',
      description: 'Add professional transitions between clip segments',
      color: 'from-indigo-500 to-blue-600',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Sparkles className="w-4 h-4 text-primary-light" />
              <span className="text-sm text-text-secondary">AI-Powered Video Clipping</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs text-primary-light font-medium">NEW</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Turn Long Videos Into</span>
              <br />
              <span className="gradient-text">Viral Shorts</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12">
              Paste any YouTube link and our AI will find the best moments, 
              crop them to 9:16, add captions & effects — all without watermarks.
            </p>

            {/* URL Input */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
              <div className={`relative flex items-center rounded-2xl transition-all duration-300 ${
                isFocused ? 'glow-border scale-[1.02]' : ''
              }`}>
                <div className="absolute left-5">
                  <Link className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-text-secondary'}`} />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Paste YouTube video URL here..."
                  className="w-full pl-14 pr-40 py-5 bg-surface-light rounded-2xl text-white placeholder-text-secondary border border-white/10 focus:border-primary/50 focus:outline-none transition-all text-lg"
                />
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="absolute right-3 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Scissors className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Clips</span>
                  <span className="sm:hidden">Go</span>
                </button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card text-sm text-text-secondary hover:text-white transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Try with sample video
              </button>
              <span className="text-text-secondary/50">•</span>
              <span className="text-sm text-text-secondary/70">Supports any YouTube URL</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">9:16</div>
              <div className="text-xs text-text-secondary mt-1">Perfect Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">0</div>
              <div className="text-xs text-text-secondary mt-1">Watermarks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">∞</div>
              <div className="text-xs text-text-secondary mt-1">Clips</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Go <span className="gradient-text">Viral</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Professional video editing tools powered by AI, designed specifically for short-form content.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Three Simple <span className="gradient-text">Steps</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Paste Link', desc: 'Drop any YouTube video URL', icon: <Link className="w-8 h-8" /> },
              { step: '02', title: 'AI Finds Clips', desc: 'Our AI detects the best moments', icon: <Wand2 className="w-8 h-8" /> },
              { step: '03', title: 'Export 9:16', desc: 'Download clean vertical shorts', icon: <Download className="w-8 h-8" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center mb-4 text-primary-light">
                  {item.icon}
                </div>
                <div className="text-xs font-mono text-primary-light mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl glass-card glow-border"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Viral Shorts?</h2>
            <p className="text-text-secondary mb-8">Start clipping your first video now — it's free!</p>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="YouTube URL..."
                  className="flex-1 px-5 py-3 bg-surface rounded-xl text-white placeholder-text-secondary border border-white/10 focus:border-primary/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Start
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-text-secondary text-sm">
            © 2026 ClipForge. AI-powered video clipping for creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
