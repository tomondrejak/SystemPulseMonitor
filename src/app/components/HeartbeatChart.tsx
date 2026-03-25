/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useMemo } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from 'chart.js';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import { Pulse } from '@/types/eventTypes';
import { getChartItemColor } from '@/helpers/helpers';

ChartJS.register(ChartStreaming, LinearScale, PointElement, Tooltip);

interface HeartbeatChartProps {
  queueRef: React.RefObject<Pulse[]>;
}

export const HeartbeatChart = ({ queueRef }: HeartbeatChartProps) => {
  const chartRef = useRef<any>(null);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false as const,
      scales: {
        x: {
          type: 'realtime' as const,
          realtime: {
            duration: 10000,
            refresh: 50,
            delay: 800,
            ttl: 600000,
            frameRate: 60,
            onRefresh: (chart: any) => {
              const realtime = chart.options.scales.x.realtime;

              if (realtime.pause) return; // 👈 skip processing

              const queue = queueRef.current || [];
              const dataset = chart.data.datasets[0].data;

              const items = queue.splice(0);

              items.forEach((pulse) => {
                dataset.push({
                  x: new Date(pulse.timestampRaw),
                  y: pulse.value
                });
              });
            }
          },
          time: {
            unit: 'second' as const,
            displayFormats: { second: 'HH:mm:ss' }
          },
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#666' }
        },
        y: {
          beginAtZero: true,
          max: 150,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#666' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#222',
          displayColors: false,
          callbacks: {
            title: () => '',
            label: (ctx: any) => `Value: ${ctx.raw.y}`
          }
        }
      }
    }),
    [queueRef]
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          label: '',
          data: [],
          pointStyle: 'rect',
          radius: 3,
          borderColor: 'transparent',
          showLine: false,
          backgroundColor: (ctx: any) => {
            return getChartItemColor(ctx.raw?.y || 0);
          }
        }
      ]
    }),
    []
  );

  const handlePause = (paused: boolean) => {
    const chart = chartRef.current?.chart || chartRef.current;

    if (!chart) return;

    // Access realtime scale
    const realtime = chart.options.scales.x.realtime;

    if (!realtime) return;

    realtime.pause = paused;

    chart.update('none');
  };

  return (
    <div className="chartWrapper" style={{ width: '100%', height: '220px' }} onMouseEnter={() => handlePause(true)} onMouseLeave={() => handlePause(false)}>
      <Scatter ref={chartRef} data={data} options={options} />
    </div>
  );
};
