/**
 * Time and Metric Formatters
 */

export interface FormattedTimeUnits {
  hours: string;
  minutes: string;
  seconds: string;
}

export function formatTimeUnits(totalSeconds: number): FormattedTimeUnits {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export function formatTimeDisplay(totalSeconds: number): string {
  const { hours, minutes, seconds } = formatTimeUnits(totalSeconds);
  if (Number(hours) > 0) {
    return `${hours} Hrs : ${minutes} Min : ${seconds} Sec`;
  }
  return `${minutes} Min : ${seconds} Sec`;
}

export function formatExecutionTime(ms?: number): string {
  if (ms === undefined) return '--';
  if (ms < 1000) return `${ms.toFixed(0)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

export function formatMemory(mb?: number): string {
  if (mb === undefined) return '--';
  return `${mb.toFixed(1)} MB`;
}
