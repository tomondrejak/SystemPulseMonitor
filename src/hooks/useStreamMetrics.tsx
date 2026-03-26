import { useEffect, useRef } from 'react';
import { Pulse } from '../types/eventTypes';
import { BUFFER_MAX_ITEMS, LAST_TEMP_N_ITEMS } from '@/constants/constants';

export const useStreamMetrics = () => {
  // Metric refs
  const avgTempRef = useRef<number | null>(null);
  const bufferSizeRef = useRef(0);
  const eventRateRef = useRef(0);

  // Data storage refs
  const pulseHistoryRef = useRef<Pulse[]>([]);
  const heartbeatQueueRef = useRef<Pulse[]>([]);

  // Temperature rolling average state
  const tempDataRef = useRef<{
    temps: number[];
    sum: number;
  }>({
    temps: [],
    sum: 0
  });

  // De-duplication set for incoming events based on timestamp
  const timestampSetRef = useRef<Set<number>>(new Set());

  // Event rate calculation every second
  const eventCounterRef = useRef<number>(0);

  const addIncomingEventsData = (pulses: Pulse[]) => {
    eventCounterRef.current += pulses.length;

    pulses.forEach((p) => {
      // De-duplication based on timestamp
      if (timestampSetRef.current.has(p.timestampRaw)) return;
      timestampSetRef.current.add(p.timestampRaw);

      // Global pulse history for table
      pulseHistoryRef.current.push(p);

      // Heartbeat queue for chart
      if (p.type === 'HEARTBEAT') {
        heartbeatQueueRef.current.push(p);
      }

      // Temperature processing for rolling average
      if (p.type === 'TEMP') {
        const tempState = tempDataRef.current;

        tempState.temps.push(p.value);
        tempState.sum += p.value;

        // Keep only last N
        if (tempState.temps.length > LAST_TEMP_N_ITEMS) {
          const removed = tempState.temps.shift()!;
          tempState.sum -= removed;
        }

        // Compute avg. temp
        avgTempRef.current = Number((tempState.sum / tempState.temps.length).toFixed(2));
      }
    });

    // Memory management: trim history and heartbeat queues to max buffer size

    if (pulseHistoryRef.current.length > BUFFER_MAX_ITEMS) {
      pulseHistoryRef.current.splice(0, pulseHistoryRef.current.length - BUFFER_MAX_ITEMS);
    }

    if (heartbeatQueueRef.current.length > BUFFER_MAX_ITEMS) {
      heartbeatQueueRef.current.splice(0, heartbeatQueueRef.current.length - BUFFER_MAX_ITEMS);
    }

    bufferSizeRef.current = pulseHistoryRef.current.length;
  };

  // Event rate calculation every second
  useEffect(() => {
    const rateTimer = setInterval(() => {
      eventRateRef.current = eventCounterRef.current;
      eventCounterRef.current = 0;
    }, 1000);

    return () => clearInterval(rateTimer);
  }, []);

  return {
    avgTempRef,
    bufferSizeRef,
    eventRateRef,
    pulseHistoryRef,
    heartbeatQueueRef,
    addIncomingEventsData
  };
};
