import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Headphones, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerSimpleProps {
  filename: string;
  duration: number;
  currentTime?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  className?: string;
}

const AudioPlayerSimple: React.FC<AudioPlayerSimpleProps> = ({
  filename,
  duration,
  currentTime = 0,
  onPlay,
  onPause,
  onSeek,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      onPause?.();
    } else {
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setCurrentProgress(parseFloat(e.target.value));
    onSeek?.(newTime);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="h-5 w-5" />
          Запись разговора
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Прогресс-бар */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          
          {/* Время */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Элементы управления */}
          <div className="flex items-center justify-center gap-4">
            <Button size="sm" variant="outline" className="rounded-full p-2">
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              variant="default" 
              className="rounded-full p-3"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            
            <Button size="sm" variant="outline" className="rounded-full p-2">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Скорость воспроизведения */}
          <div className="flex items-center justify-center gap-2">
            {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
              <Button
                key={speed}
                size="sm"
                variant={speed === 1 ? "default" : "outline"}
                className="text-xs px-3 py-1"
              >
                {speed}x
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayerSimple; 