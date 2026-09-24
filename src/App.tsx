import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import VideoAnalyzer from './components/VideoAnalyzer';
import ClipEditor from './components/ClipEditor';
import ExportModal from './components/ExportModal';
import Header from './components/Header';
import { Clip, VideoInfo } from './types';

type AppScreen = 'landing' | 'analyzing' | 'editor' | 'export';

function App() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [showExport, setShowExport] = useState(false);

  const handleUrlSubmit = (url: string) => {
    setVideoUrl(url);
    setScreen('analyzing');
    // Simulate analysis
    setTimeout(() => {
      const mockVideoInfo: VideoInfo = {
        id: '1',
        title: 'Amazing Long Video - Full Episode',
        thumbnail: '',
        duration: 3600,
        channel: 'Creator Channel',
        url: url,
      };
      setVideoInfo(mockVideoInfo);

      const mockClips: Clip[] = [
        {
          id: '1',
          title: 'Epic Opening Moment',
          startTime: 45,
          endTime: 105,
          duration: 60,
          score: 95,
          tags: ['engaging', 'hook', 'viral'],
          thumbnail: '',
        },
        {
          id: '2',
          title: 'Key Insight Revealed',
          startTime: 320,
          endTime: 395,
          duration: 75,
          score: 88,
          tags: ['educational', 'insightful'],
          thumbnail: '',
        },
        {
          id: '3',
          title: 'Funny Reaction',
          startTime: 890,
          endTime: 945,
          duration: 55,
          score: 92,
          tags: ['funny', 'reaction', 'viral'],
          thumbnail: '',
        },
        {
          id: '4',
          title: 'Climactic Moment',
          startTime: 1560,
          endTime: 1630,
          duration: 70,
          score: 97,
          tags: ['climax', 'engaging', 'must-watch'],
          thumbnail: '',
        },
        {
          id: '5',
          title: 'Powerful Conclusion',
          startTime: 2800,
          endTime: 2860,
          duration: 60,
          score: 85,
          tags: ['conclusion', 'inspiring'],
          thumbnail: '',
        },
      ];
      setClips(mockClips);
      setSelectedClip(mockClips[0]);
      setScreen('editor');
    }, 4000);
  };

  const handleClipUpdate = (updatedClip: Clip) => {
    setClips(clips.map(c => c.id === updatedClip.id ? updatedClip : c));
    setSelectedClip(updatedClip);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  const handleBackToLanding = () => {
    setScreen('landing');
    setVideoUrl('');
    setVideoInfo(null);
    setClips([]);
    setSelectedClip(null);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header onLogoClick={handleBackToLanding} />
      
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onSubmit={handleUrlSubmit} />
          </motion.div>
        )}

        {screen === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
            transition={{ duration: 0.3 }}
          >
            <ClipEditor
              videoInfo={videoInfo}
              clips={clips}
              selectedClip={selectedClip}
              onSelectClip={setSelectedClip}
              onUpdateClip={handleClipUpdate}
              onExport={handleExport}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showExport && selectedClip && (
        <ExportModal
          clip={selectedClip}
          onClose={() => setShowExport(false)}
          onConfirm={() => {
            setShowExport(false);
            alert('🎬 Your clip is being processed! It will be ready for download shortly. (Demo mode)');
          }}
        />
      )}
    </div>
  );
}

export default App;
