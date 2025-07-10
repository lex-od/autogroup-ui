import { FC, RefObject, useState, useEffect, JSX } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDuration } from '../call-details.utils';

interface AudioPlayerProps {
  src?: JSX.IntrinsicElements['audio']['src'];
  audioRef: RefObject<HTMLAudioElement | null>;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src, audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!Number.isNaN(audio.duration)) {
      setDuration(audio.duration);
    }
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    seek(newTime);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5" />
          <span>Запись разговора</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <audio
          ref={audioRef}
          src={src}
          onEnded={() => setIsPlaying(false)}
          // onLoadedMetadata={}
          // onTimeUpdate={}
        />

        {/* Прогресс бар */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
          <div
            className="h-2 w-full cursor-pointer rounded-full bg-gray-200"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seek(percent * duration);
            }}
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Контролы */}
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => skipTime(-10)}>
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            size="lg"
            onClick={togglePlayPause}
            className="h-12 w-12 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={() => skipTime(10)}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Скорость воспроизведения */}
        <div className="flex items-center justify-center space-x-2">
          {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
            <Button
              key={rate}
              variant={playbackRate === rate ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.playbackRate = rate;
                  setPlaybackRate(rate);
                }
              }}
            >
              {rate}x
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
