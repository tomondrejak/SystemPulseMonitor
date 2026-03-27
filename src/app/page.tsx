/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { EventsTable } from './components/EventsTable';
import { DebugPanel } from './components/DebugPanel';

import { useSSEStream } from '@/hooks/useSSEStream';
import { BatchMeter } from './components/BatchMeter';
import { EventRateChart } from './components/EventRateChart';
import { HeartbeatChart } from './components/HeartbeatChart';

import './page.scss';

import PauseStream from './components/PauseStream';
import ConnectionStatus from './components/ConnectionStatus';
import AvgTemp from './components/AvgTemp';

export default function Home() {
  const { metrics, isConnected, isPaused, setIsPaused } = useSSEStream();
  const { fps, memory } = usePerformanceMonitor();

  return (
    <main>
      <section className="sectionHeader">
        <h2>Sensor_01</h2>
        <div className='status'>
          <ConnectionStatus isConnected={isConnected} />
          <PauseStream isPaused={isPaused} setIsPaused={setIsPaused} isConnected={isConnected} />
        </div>
      </section>

      <section className="sectionInfo">
        <AvgTemp avgTemp={metrics.avgTempRef.current} />
      </section>

      <section className="sectionCharts">
        <div className="chartContainer">
          <h3>Event rate</h3>
          <EventRateChart rate={metrics.eventRateRef.current} isConnected={isConnected} isPaused={isPaused} />
        </div>

        <div className="chartContainer">
          <h3>Heartbeat monitor</h3>
          <HeartbeatChart queueRef={metrics.heartbeatQueueRef} isConnected={isConnected} isPaused={isPaused} />
        </div>
      </section>

      <section className="sectionTable">
        <EventsTable data={metrics.pulseHistoryRef.current} />
      </section>

      <section className="sectionDebug">
        <DebugPanel fps={fps.current} memory={memory.current} />

        <BatchMeter batchSize={metrics.bufferSizeRef.current} eventRate={metrics.eventRateRef.current} />
      </section>
    </main>
  );
}
