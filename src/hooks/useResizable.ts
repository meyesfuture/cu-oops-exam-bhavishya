import { useState, useCallback, useRef } from 'react';

interface UseResizableOptions {
  direction?: 'horizontal' | 'vertical';
  initialSize: number;
  minSize: number;
  maxSize: number;
  defaultSize?: number;
  isPercentage?: boolean;
  onSizeChange?: (size: number) => void;
}

export function useResizable({
  direction = 'horizontal',
  initialSize,
  minSize,
  maxSize,
  defaultSize,
  isPercentage = true,
  onSizeChange,
}: UseResizableOptions) {
  const [size, setSize] = useState<number>(initialSize);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onSizeChangeRef = useRef(onSizeChange);
  onSizeChangeRef.current = onSizeChange;

  const updateSize = useCallback(
    (newSize: number) => {
      const clamped = Math.max(minSize, Math.min(maxSize, newSize));
      setSize(clamped);
      onSizeChangeRef.current?.(clamped);
    },
    [minSize, maxSize]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        if (direction === 'horizontal') {
          const offsetX = moveEvent.clientX - rect.left;
          if (isPercentage) {
            const pct = (offsetX / rect.width) * 100;
            updateSize(pct);
          } else {
            updateSize(offsetX);
          }
        } else {
          // Vertical drawer: measuring from bottom or top
          const offsetY = rect.bottom - moveEvent.clientY;
          updateSize(offsetY);
        }
      };

      const handlePointerUp = () => {
        setIsDragging(false);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [direction, isPercentage, updateSize]
  );

  const handleDoubleClick = useCallback(() => {
    if (defaultSize !== undefined) {
      updateSize(defaultSize);
    }
  }, [defaultSize, updateSize]);

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = isPercentage ? 1 : 10;
      if (direction === 'horizontal') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          updateSize(size - step);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          updateSize(size + step);
        }
      } else {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          updateSize(size - step);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          updateSize(size + step);
        }
      }
    },
    [direction, isPercentage, size, updateSize]
  );

  return {
    size,
    isDragging,
    containerRef,
    handlePointerDown,
    handleDoubleClick,
    handleKeyDown,
    setSize: updateSize,
  };
}
