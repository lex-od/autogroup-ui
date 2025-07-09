export const formatDuration = (seconds: number) => {
  const fullMinutes = Math.floor(seconds / 60);
  const restSeconds = Math.floor(seconds % 60);
  return `${fullMinutes}:${restSeconds.toString().padStart(2, '0')}`;
};
