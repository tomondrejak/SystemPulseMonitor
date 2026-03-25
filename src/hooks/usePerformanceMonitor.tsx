/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const fpsRef = useRef(0);
  const memoryRef = useRef<number | null>(null);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let rafId: number;

    const loop = () => {
      frames++;
      const now = performance.now();

      if (now >= last + 1000) {
        fpsRef.current = frames;
        frames = 0;
        last = now;

        if ((performance as any).memory) {
          memoryRef.current = Math.round((performance as any).memory.usedJSHeapSize / 1048576);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return {
    fps: fpsRef,
    memory: memoryRef
  };
};
