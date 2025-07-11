import { FC, useState, useEffect, useRef, useImperativeHandle } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDuration } from '../call-details.utils';

export interface AudioPlayerHandle {
  play: () => void;
  seek: (time: number) => void;
}
interface AudioPlayerProps {
  src?: React.JSX.IntrinsicElements['audio']['src'];
  ref: React.Ref<AudioPlayerHandle>;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src, ref }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({ play, seek }), []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (!Number.isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  }, [src]);

  const play = () => {
    audioRef.current?.play();
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  };

  const skipTime = (time: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + time));
    seek(newTime);
  };

  const setPlaybackRate = (playbackRate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = playbackRate;
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
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onRateChange={(e) => setRate(e.currentTarget.playbackRate)}
        />

        {/* Прогресс бар */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
          <div
            className="h-2 w-full rounded-full bg-gray-200"
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
          {[0.5, 1, 1.25, 1.5, 2].map((rateItem) => (
            <Button
              key={rateItem}
              variant={rateItem === rate ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPlaybackRate(rateItem)}
            >
              {rateItem}x
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
