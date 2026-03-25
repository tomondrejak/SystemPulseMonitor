import { useEffect, useRef } from 'react';
import { Pulse } from '../types/eventTypes';
import { BUFFER_MAX_ITEMS } from '@/constants/constants';

export const useStreamMetrics = () => {
  // All metrics stored in refs (no re-renders)
  const avgTempRef = useRef<string | null>(null);
  const bufferSizeRef = useRef(0);
  const eventRateRef = useRef(0);

  const pulseHistoryRef = useRef<Pulse[]>([]);
  const heartbeatHistoryRef = useRef<Pulse[]>([]);
  const heartbeatQueueRef = useRef<Pulse[]>([]);
  const timestampSetRef = useRef<Set<number>>(new Set());

  const eventCounterRef = useRef<number>(0);

  const tempSumRef = useRef(0);
  const tempCountRef = useRef(0);

  const addIncomingEventsData = (pulses: Pulse[]) => {
    eventCounterRef.current += pulses.length;

    pulses.forEach((p) => {
      if (timestampSetRef.current.has(p.timestampRaw)) return;

      timestampSetRef.current.add(p.timestampRaw);
      pulseHistoryRef.current.push(p);

      // Add heartbeats to separate history + queue for chart
      if (p.type === 'HEARTBEAT') {
        heartbeatHistoryRef.current.push(p);
        heartbeatQueueRef.current.push(p);
      }

      // Data for avg temp calculation
      if (p.type === 'TEMP') {
        tempSumRef.current += p.value;
        tempCountRef.current++;
      }
    });

    // Heartbeat history buffer
    if (heartbeatHistoryRef.current.length > BUFFER_MAX_ITEMS) {
      const removed = heartbeatHistoryRef.current.splice(0, heartbeatHistoryRef.current.length - BUFFER_MAX_ITEMS);
      removed.forEach((i) => timestampSetRef.current.delete(i.timestampRaw));
    }

    // Pulse history buffer
    if (pulseHistoryRef.current.length > BUFFER_MAX_ITEMS) {
      pulseHistoryRef.current.splice(0, pulseHistoryRef.current.length - BUFFER_MAX_ITEMS);
    }

    // Calculate avg temp (no re-render)
    if (tempCountRef.current > 0) {
      const avg = tempSumRef.current / tempCountRef.current;
      avgTempRef.current = avg.toFixed(2);
    }

    bufferSizeRef.current = pulseHistoryRef.current.length;
  };

  // Event rate calculation (no re-render)
  useEffect(() => {
    const rateTimer = setInterval(() => {
      eventRateRef.current = eventCounterRef.current;
      eventCounterRef.current = 0;
    }, 1000);

    return () => clearInterval(rateTimer);
  }, []);

  console.log('=== METRICS COMPUTED ===');

  return {
    avgTempRef,
    bufferSizeRef,
    eventRateRef,

    heartbeatHistoryRef,
    heartbeatQueueRef,
    pulseHistoryRef,

    addIncomingEventsData
  };
};
