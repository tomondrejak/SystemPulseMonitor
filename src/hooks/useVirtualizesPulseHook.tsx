'use client';
import { useState } from 'react';

export const useVirtualizedList = (itemHeight: number, containerHeight: number, total: number) => {
  const [scrollTop, setScrollTop] = useState(0);

  const rawStartIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  // ✅ CLAMP startIndex
  const startIndex = Math.min(rawStartIndex, Math.max(0, total - visibleCount));

  // ✅ CLAMP endIndex
  const endIndex = Math.min(startIndex + visibleCount, total);

  return {
    startIndex,
    endIndex,
    offsetY: startIndex * itemHeight,
    setScrollTop
  };
};
