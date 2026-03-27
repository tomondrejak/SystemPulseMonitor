import { useEffect, useRef, useState } from 'react';
import { Pulse } from '../types/eventTypes';
import { pulseAdapter } from '../adapters/pulseAdapter';
import { useStreamMetrics } from './useStreamMetrics';
import { BUFFER_UPDATE_INTERVAL, SERVER_RECONNECT_INTERVAL, SERVER_STREAM_URL } from '@/constants/constants';

export const useSSEStream = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [, forceRender] = useState(0);

  const isPausedRef = useRef(isPaused);

  const metrics = useStreamMetrics();
  const bufferRef = useRef<Pulse[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const eventCounterRef = useRef(0);

  useEffect(() => {
    isPausedRef.current = isPaused;

    if (isPaused) {
      bufferRef.current = [];
    }
  }, [isPaused]);

  useEffect(() => {
    const connectSSE = () => {
      const es = new EventSource(SERVER_STREAM_URL);
      eventSourceRef.current = es;

      es.onopen = () => {
        console.log('SSE connected');
        setIsConnected(true);
      };

      es.onmessage = (event) => {
        if (isPausedRef.current) return;

        try {
          const rawEvent = JSON.parse(event.data);
          const parsedEvent = pulseAdapter(rawEvent, ++eventCounterRef.current);
          bufferRef.current.push(parsedEvent);
        } catch (err) {
          console.error('SSE data JSON parse error:', err);
        }
      };

      es.onerror = () => {
        console.error('SSE connection error');
        setIsConnected(false);
        es.close();
        setTimeout(connectSSE, SERVER_RECONNECT_INTERVAL);
      };
    };

    connectSSE();

    // Proces buffer in batches at regular intervals to avoid UI freezes and improve performance
    const batchTimer = setInterval(() => {
      if (isPausedRef.current || !bufferRef.current.length) return;

      const s = performance.now();

      const batch = bufferRef.current.splice(0);
      metrics.addIncomingEventsData(batch);

      forceRender((v) => v + 1); // !!Force re-render to update UI with new metrics/buffer state

      const e = performance.now();
      console.log(`Processed batch of ${batch.length} events in ${(e - s).toFixed(2)} ms`);
    }, BUFFER_UPDATE_INTERVAL);

    return () => {
      eventSourceRef.current?.close();
      clearInterval(batchTimer);
    };
  }, []); // Important to run only once on mount

  console.log('=== SSE STREAM HOOK RENDER ===');

  return {
    metrics,
    bufferRef,
    isConnected,
    isPaused,
    setIsPaused
  };
};
