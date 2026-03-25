/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler, TimeScale, ChartOptions } from 'chart.js';

import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

// Register the streaming plugin. This enables the 'realtime' scale type.
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Filler, TimeScale, StreamingPlugin);

export const EventRateChart = ({ rate }: { rate: number }) => {
  const rateRef = useRef(rate);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  const options = useMemo(
    (): ChartOptions<'line'> => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false as const,
      scales: {
        x: {
          type: 'realtime' as const, // Now recognized thanks to the plugin
          realtime: {
            duration: 20000,
            refresh: 1000,
            delay: 2000,
            onRefresh: (chart: any) => {
              chart.data.datasets[0].data.push({
                x: Date.now(),
                y: rateRef.current
              });
            }
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 100 // Stays low until spikes exceed 100
        }
      },
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'index' as const,
          intersect: false
        }
      }
    }),
    []
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          label: 'Events/sec',
 		      borderColor: '#1cb5bd',
          backgroundColor: 'rgba(0, 224, 255, 0.1)',
          fill: true,
          data: [],
          tension: 0.2,
          pointRadius: 0,
          borderWidth: 2
        }
      ]
    }),
    []
  );

  return (
    <div className="chartWrapper">
      <Line data={data} options={options} redraw={false} />
    </div>
  );
};
