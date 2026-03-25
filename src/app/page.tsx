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

import { Thermometer as IconTemp } from 'lucide-react';
import PauseStream from './components/PauseStream';
import ConnectionStatus from './components/ConnectionStatus';

export default function Home() {
  const { metrics, isPaused, setIsPaused } = useSSEStream();
  const { fps, memory } = usePerformanceMonitor();

  return (
    <main>
      <h2>
        Sensor_01
        <ConnectionStatus />
      </h2>

      <section className="sectionInfo">
        <span className="svgIcon">
          <IconTemp size={18} />
        </span>
        Avg. temp: {metrics.avgTempRef.current ?? 'N/A'}°C
      </section>

      <section className="sectionCharts">
        <div className="chartContainer">
          <h3>Event rate</h3>
          <EventRateChart rate={metrics.eventRateRef.current} />
        </div>

        <div className="chartContainer">
          <h3>Heartbeat monitor</h3>
          <HeartbeatChart queueRef={metrics.heartbeatQueueRef} />
        </div>
      </section>

      <section className="sectionFilters">
        <PauseStream isPaused={isPaused} setIsPaused={setIsPaused} />

        {/* <div className="filterGroup">
              <label >Filter events by type: </label>
              <select name="filterEventsSelect" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
                <option value="ALL">ALL</option>
                <option value="TEMP">TEMP</option>
                <option value="HEARTBEAT">HEARTBEAT</option>
                <option value="ERROR">ERROR</option>
              </select>
            </div> */}
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
