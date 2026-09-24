import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import VideoAnalyzer from './components/VideoAnalyzer';
import ClipEditor from './components/ClipEditor';
import ExportModal from './components/ExportModal';
import Header from './components/Header';
import { Clip, VideoInfo } from './types';

type AppScreen = 'landing' | 'analyzing' | 'editor';

function App() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [exportBatch, setExportBatch] = useState(false);

  const handleUrlSubmit = useCallback((url: string) => {
    console.log('Starting clip analysis for URL:', url);
    setVideoUrl(url);
    setScreen('analyzing');
    
    setTimeout(() => {
      console.log('Analysis complete, showing editor');
      const mockVideoInfo: VideoInfo = {
        id: '1',
        title: 'The Ultimate Guide to Productivity - 2 Hour Masterclass',
        thumbnail: '',
        duration: 7200,
        channel: 'Productivity Masters',
        url: url,
        views: '2.4M',
        uploadDate: '2 months ago',
      };
      setVideoInfo(mockVideoInfo);

      const mockClips: Clip[] = [
        {
          id: '1',
          title: 'The 5AM Rule That Changed Everything',
          startTime: 45,
          endTime: 105,
          duration: 60,
          score: 95,
          tags: ['hook', 'viral', 'engaging'],
          thumbnail: '',
          highlight: 'The moment that hooks viewers in the first 3 seconds',
        },
        {
          id: '2',
          title: 'The Pomodoro Technique Explained',
          startTime: 320,
          endTime: 395,
          duration: 75,
          score: 88,
          tags: ['educational', 'insightful', 'practical'],
          thumbnail: '',
          highlight: 'Clear explanation with visual examples',
        },
        {
          id: '3',
          title: 'When I Failed Miserably',
          startTime: 890,
          endTime: 945,
          duration: 55,
          score: 92,
          tags: ['emotional', 'storytelling', 'relatable'],
          thumbnail: '',
          highlight: 'Vulnerable moment that connects with audience',
        },
        {
          id: '4',
          title: 'The Secret Nobody Talks About',
          startTime: 1560,
          endTime: 1630,
          duration: 70,
          score: 97,
          tags: ['revelation', 'must-watch', 'viral'],
          thumbnail: '',
          highlight: 'High-retention moment with peak engagement',
        },
        {
          id: '5',
          title: '3 Steps to Transform Your Morning',
          startTime: 2800,
          endTime: 2860,
          duration: 60,
          score: 85,
          tags: ['actionable', 'list', 'save-worthy'],
          thumbnail: '',
          highlight: 'Actionable advice viewers will save',
        },
        {
          id: '6',
          title: 'The Mindset Shift You Need',
          startTime: 3400,
          endTime: 3460,
          duration: 60,
          score: 91,
          tags: ['mindset', 'inspiring', 'shareable'],
          thumbnail: '',
          highlight: 'Powerful mindset reframe',
        },
      ];
      setClips(mockClips);
      setSelectedClip(mockClips[0]);
      setScreen('editor');
    }, 4500);
  }, []);

  const handleClipUpdate = useCallback((updatedClip: Clip) => {
    setClips(prev => prev.map(c => c.id === updatedClip.id ? updatedClip : c));
    setSelectedClip(updatedClip);
  }, []);

  const handleDeleteClip = useCallback((clipId: string) => {
    setClips(prev => {
      const filtered = prev.filter(c => c.id !== clipId);
      if (selectedClip?.id === clipId) {
        setSelectedClip(filtered[0] || null);
      }
      return filtered;
    });
  }, [selectedClip]);

  const handleExport = useCallback((batch: boolean = false) => {
    setExportBatch(batch);
    setShowExport(true);
  }, []);

  const handleBackToLanding = useCallback(() => {
    setScreen('landing');
    setVideoUrl('');
    setVideoInfo(null);
    setClips([]);
    setSelectedClip(null);
  }, []);

  return (
    <div className="min-h-screen bg-surface relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      <Header onLogoClick={handleBackToLanding} clipCount={clips.length} />
      
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage onSubmit={handleUrlSubmit} />
          </motion.div>
        )}

        {screen === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <VideoAnalyzer url={videoUrl} />
          </motion.div>
        )}

        {screen === 'editor' && videoInfo && (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ClipEditor
              videoInfo={videoInfo}
              clips={clips}
              selectedClip={selectedClip}
              onSelectClip={setSelectedClip}
              onUpdateClip={handleClipUpdate}
              onDeleteClip={handleDeleteClip}
              onExport={handleExport}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExport && selectedClip && (
          <ExportModal
            clip={selectedClip}
            clips={exportBatch ? clips : [selectedClip]}
            batchMode={exportBatch}
            onClose={() => setShowExport(false)}
            onConfirm={() => {
              setShowExport(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
