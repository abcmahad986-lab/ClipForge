import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Scan, Scissors, Sparkles, CheckCircle2, Loader2, Film, Wand2 } from 'lucide-react';

interface VideoAnalyzerProps {
  url: string;
}

export default function VideoAnalyzer({ url }: VideoAnalyzerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: <Scan className="w-5 h-5" />, label: 'Fetching video metadata...', sublabel: 'Extracting title, duration, and thumbnail', duration: 1200 },
    { icon: <Brain className="w-5 h-5" />, label: 'Analyzing content with AI...', sublabel: 'Processing audio, visuals, and engagement patterns', duration: 1800 },
    { icon: <Wand2 className="w-5 h-5" />, label: 'Detecting viral moments...', sublabel: 'Scoring segments by engagement potential', duration: 1000 },
    { icon: <Film className="w-5 h-5" />, label: 'Preparing 9:16 clips...', sublabel: 'Smart cropping and subject tracking setup', duration: 500 },
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

    const runSteps = () => {
      if (currentStep < steps.length) {
        const stepDuration = steps[currentStep].duration;
        const stepStart = (currentStep / steps.length) * 100;
        const stepEnd = ((currentStep + 1) / steps.length) * 100;
        let currentProgress = stepStart;
        
        progressInterval = setInterval(() => {
          currentProgress += (stepEnd - stepStart) / (stepDuration / 30);
          setProgress(Math.min(currentProgress, stepEnd));
        }, 30);

        timeout = setTimeout(() => {
          clearInterval(progressInterval);
          setCurrentStep(prev => prev + 1);
        }, stepDuration);
      }
    };

    runSteps();

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [currentStep]);

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-10 glow-border-strong"
        >
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-20" />
              <div className="absolute inset-3 rounded-full bg-surface-light flex items-center justify-center border border-white/5">
                {currentStep < steps.length ? (
                  <motion.div
                    key={currentStep}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="text-primary-light"
                  >
                    <Loader2 className="w-10 h-10 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-success" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentStep < steps.length ? 'Analyzing Your Video' : 'Analysis Complete!'}
            </h2>
            <p className="text-text-secondary text-sm">
              {currentStep < steps.length 
                ? 'Our AI is finding the best moments for your shorts'
                : 'We found 6 amazing clips ready to edit!'
              }
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted">Progress</span>
              <span className="text-xs font-mono text-primary-light">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-lighter rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full relative"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-success/8 border border-success/15'
                    : index === currentStep
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-surface-lighter/30 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  index < currentStep
                    ? 'bg-success/15 text-success'
                    : index === currentStep
                    ? 'bg-primary/15 text-primary-light'
                    : 'bg-surface-lighter text-text-muted'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-white' : 'text-text-muted'
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-text-muted truncate">{step.sublabel}</p>
                </div>
                {index === currentStep && (
                  <Loader2 className="w-4 h-4 text-primary-light animate-spin shrink-0" />
                )}
              </motion.div>
            ))}
          </div>

          {/* URL Display */}
          <div className="mt-8 px-4 py-3 bg-surface-lighter rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <Scissors className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <p className="text-xs text-text-muted truncate">{url}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
