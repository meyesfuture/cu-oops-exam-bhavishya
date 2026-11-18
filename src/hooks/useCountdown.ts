import { useState, useEffect, useCallback, useRef } from 'react';
import { formatTimeUnits, FormattedTimeUnits } from '../utils/formatters';

interface UseCountdownOptions {
  initialSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export function useCountdown({
  initialSeconds,
  onExpire,
  autoStart = true,
}: UseCountdownOptions) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const reset = useCallback(
    (newSeconds?: number) => {
      setSecondsRemaining(newSeconds ?? initialSeconds);
      setIsRunning(autoStart);
    },
    [initialSeconds, autoStart]
  );

  const timeUnits: FormattedTimeUnits = formatTimeUnits(secondsRemaining);
  const isWarning = secondsRemaining > 0 && secondsRemaining <= 600; // < 10 mins
  const isExpired = secondsRemaining === 0;

  return {
    secondsRemaining,
    timeUnits,
    isRunning,
    isWarning,
    isExpired,
    pause,
    resume,
    reset,
  };
}
