import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Scan, Scissors, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface VideoAnalyzerProps {
  url: string;
}

export default function VideoAnalyzer({ url }: VideoAnalyzerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: <Scan className="w-5 h-5" />, label: 'Fetching video data...', duration: 1000 },
    { icon: <Brain className="w-5 h-5" />, label: 'Analyzing content with AI...', duration: 1500 },
    { icon: <Sparkles className="w-5 h-5" />, label: 'Detecting engaging moments...', duration: 1000 },
    { icon: <Scissors className="w-5 h-5" />, label: 'Preparing clips in 9:16 format...', duration: 500 },
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

    const runSteps = () => {
      if (currentStep < steps.length) {
        const stepDuration = steps[currentStep].duration;
        
        // Progress animation for current step
        const stepStart = (currentStep / steps.length) * 100;
        const stepEnd = ((currentStep + 1) / steps.length) * 100;
        let currentProgress = stepStart;
        
        progressInterval = setInterval(() => {
          currentProgress += (stepEnd - stepStart) / (stepDuration / 50);
          setProgress(Math.min(currentProgress, stepEnd));
        }, 50);

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
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 glow-border"
        >
          {/* Animated Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-surface-light flex items-center justify-center">
              {currentStep < steps.length ? (
                <Loader2 className="w-10 h-10 text-primary-light animate-spin" />
              ) : (
                <CheckCircle2 className="w-10 h-10 text-success" />
              )}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {currentStep < steps.length ? 'Analyzing Your Video' : 'Analysis Complete!'}
          </h2>
          <p className="text-text-secondary mb-8 text-sm">
            {currentStep < steps.length 
              ? 'Our AI is finding the best moments for your shorts'
              : 'We found 5 amazing clips ready to edit!'
            }
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-surface-lighter rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-3 text-left">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  index < currentStep
                    ? 'bg-success/10 border border-success/20'
                    : index === currentStep
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-surface-lighter/50 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  index < currentStep
                    ? 'bg-success/20 text-success'
                    : index === currentStep
                    ? 'bg-primary/20 text-primary-light'
                    : 'bg-surface-lighter text-text-secondary'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`text-sm ${
                  index <= currentStep ? 'text-white' : 'text-text-secondary'
                }`}>
                  {step.label}
                </span>
                {index === currentStep && (
                  <Loader2 className="w-3.5 h-3.5 text-primary-light animate-spin ml-auto" />
                )}
              </motion.div>
            ))}
          </div>

          {/* URL Display */}
          <div className="mt-8 px-4 py-3 bg-surface-lighter rounded-xl">
            <p className="text-xs text-text-secondary truncate">{url}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
