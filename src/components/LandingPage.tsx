import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Scissors, Zap, Film, Sparkles, Play, Wand2, Download, ArrowRight, Check, Star, Users, Clock } from 'lucide-react';

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
      description: 'Our AI analyzes your entire video and identifies the most engaging, viral-worthy moments automatically.',
      color: 'from-purple-500 to-violet-600',
      stat: '95% accuracy',
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: 'Smart 9:16 Reframe',
      description: 'Intelligent subject tracking keeps the main focus centered perfectly in vertical format for Shorts & Reels.',
      color: 'from-cyan-500 to-blue-600',
      stat: 'Auto-reframe',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Animated Captions',
      description: 'Generate eye-catching animated captions with 5+ styles — bold, karaoke, typewriter, and more.',
      color: 'from-pink-500 to-rose-600',
      stat: '5+ styles',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Zero Watermarks',
      description: 'Export clean, professional clips without any branding. Your content, your brand, always.',
      color: 'from-emerald-500 to-green-600',
      stat: '100% clean',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Process hours of footage in minutes. AI-powered pipeline optimized for speed without quality loss.',
      color: 'from-amber-500 to-orange-600',
      stat: '10x faster',
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: 'Pro Transitions',
      description: 'Add cinematic transitions, color grading, speed ramps, and effects to make your clips stand out.',
      color: 'from-indigo-500 to-blue-600',
      stat: '20+ effects',
    },
  ];

  const testimonials = [
    { name: 'Sarah K.', role: 'YouTuber • 500K subs', text: 'Cut my editing time from 4 hours to 15 minutes. The AI finds clips I would have missed!' },
    { name: 'Marcus T.', role: 'Content Creator', text: 'The 9:16 auto-crop is insanely good. Subject tracking keeps my face centered perfectly.' },
    { name: 'Alex R.', role: 'Podcast Host', text: 'I upload 3-5 shorts from every episode now. My channel grew 400% in 2 months.' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card mb-10"
            >
              <Sparkles className="w-4 h-4 text-primary-light" />
              <span className="text-sm text-text-secondary font-medium">AI-Powered Video Intelligence</span>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-[10px] text-white font-bold uppercase tracking-wide">v2.0</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.05] tracking-tight">
              <span className="text-white block">Turn Long Videos</span>
              <span className="text-white block">Into</span>
              <span className="gradient-text block">Viral Shorts</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-14 leading-relaxed font-light">
              Paste any YouTube link. Our AI finds the best moments, crops to <span className="text-white font-medium">9:16</span>, adds captions & effects — all <span className="text-white font-medium">without watermarks</span>.
            </p>

            {/* URL Input */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
              <div className={`relative flex items-center rounded-2xl transition-all duration-500 ${
                isFocused ? 'glow-border-strong scale-[1.02]' : 'glow-border'
              }`}>
                <div className="absolute left-5 z-10">
                  <Link className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-text-muted'}`} />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Paste YouTube video URL here..."
                  className="w-full pl-14 pr-44 py-5 sm:py-6 bg-surface-light rounded-2xl text-white placeholder-text-muted border border-white/5 focus:border-primary/30 transition-all text-base sm:text-lg"
                />
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="btn-primary absolute right-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  <Scissors className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Clips</span>
                  <span className="sm:hidden">Go</span>
                </button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card text-sm text-text-secondary hover:text-white transition-all hover:border-primary/30"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Try sample video</span>
              </button>
              <span className="text-text-muted">•</span>
              <span className="text-sm text-text-muted">Works with any public YouTube video</span>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '9:16', label: 'Perfect Ratio', icon: <Film className="w-4 h-4" /> },
              { value: '0', label: 'Watermarks', icon: <Check className="w-4 h-4" /> },
              { value: '10x', label: 'Faster', icon: <Zap className="w-4 h-4" /> },
              { value: '∞', label: 'Clips', icon: <Scissors className="w-4 h-4" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="text-primary-light">{stat.icon}</span>
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</span>
                </div>
                <span className="text-xs text-text-muted">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Users className="w-6 h-6 text-primary-light mb-1" />
              <span className="text-3xl font-bold text-white">50K+</span>
              <span className="text-sm text-text-muted">Creators using ClipForge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6 text-warning mb-1" />
              <span className="text-3xl font-bold text-white">4.9/5</span>
              <span className="text-sm text-text-muted">Average user rating</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-6 h-6 text-accent mb-1" />
              <span className="text-3xl font-bold text-white">2M+</span>
              <span className="text-sm text-text-muted">Clips generated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary-light mb-6 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              Everything You Need to <span className="gradient-text">Go Viral</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Professional video editing tools powered by AI, designed specifically for short-form content creators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-7 rounded-2xl glass-card hover:border-primary/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{feature.description}</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-primary-light">{feature.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent mb-6 uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              Three Simple <span className="gradient-text">Steps</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: '01', title: 'Paste Your Link', desc: 'Drop any YouTube video URL into the input field. We support all public videos.', icon: <Link className="w-8 h-8" /> },
              { step: '02', title: 'AI Finds Clips', desc: 'Our AI analyzes content, detects engaging moments, and scores them by viral potential.', icon: <Wand2 className="w-8 h-8" /> },
              { step: '03', title: 'Export Clean 9:16', desc: 'Download professional vertical shorts with captions, effects, and zero watermarks.', icon: <Download className="w-8 h-8" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center group"
              >
                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 flex items-center justify-center mb-6 text-primary-light group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-xs font-mono text-primary-light mb-3 tracking-widest">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[250px] mx-auto">{item.desc}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-6 lg:-right-8 w-6 h-6 text-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-xs font-medium text-warning mb-6 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 sm:p-16 rounded-3xl glass-card glow-border-strong relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Create Viral Shorts?</h2>
              <p className="text-text-secondary mb-10 text-lg">Start clipping your first video now — completely free.</p>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="YouTube URL..."
                    className="flex-1 px-5 py-4 bg-surface rounded-xl text-white placeholder-text-muted border border-white/10 focus:border-primary/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!url.trim()}
                    className="btn-primary px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold hover:opacity-90 transition-all disabled:opacity-40"
                  >
                    Start Now
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scissors className="w-4 h-4 text-primary-light" />
            <span className="text-sm font-semibold">
              <span className="gradient-text">Clip</span>
              <span className="text-white">Forge</span>
            </span>
          </div>
          <p className="text-text-muted text-sm">
            © 2026 ClipForge. AI-powered video clipping for creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
