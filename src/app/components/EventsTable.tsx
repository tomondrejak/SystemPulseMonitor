/* eslint-disable @typescript-eslint/no-explicit-any */
import { TABLE_CONTAINER_HEIGHT, TABLE_ITEM_HEIGHT } from '@/constants/constants';
import { useVirtualizedList } from '@/hooks/useVirtualizesPulseHook';
import { Pulse, EventTypeEnum } from '@/types/eventTypes';
import { HeartPulse, Thermometer, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import './EventsTable.scss';

export const EventsTable = ({ data }: { data: Pulse[] }) => {
  const [filter, setFilter] = useState<'ALL' | EventTypeEnum>('ALL');

  const filteredData = () => {
    if (filter === 'ALL') return data;
    return data.filter((d) => d.type === filter);
  };

  const sortedData = [...filteredData()].sort((a, b) => b.timestampRaw - a.timestampRaw);

  const { startIndex, endIndex, offsetY, setScrollTop } = useVirtualizedList(TABLE_ITEM_HEIGHT, TABLE_CONTAINER_HEIGHT, sortedData.length);

  const visibleItems = sortedData.slice(startIndex, endIndex);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'HEARTBEAT':
        return (
          <span className="svgIcon">
            <HeartPulse size={16} />
          </span>
        );
      case 'TEMP':
        return (
          <span className="svgIcon">
            <Thermometer size={16} />
          </span>
        );
      case 'ERROR':
        return (
          <span className="svgIcon">
            <TriangleAlert size={16} />
          </span>
        );
      default:
        return '';
    }
  };

  useEffect(() => {
    setScrollTop(0);
  }, [filter, setScrollTop, sortedData.length]);

  return (
    <>
      <div className="filterGroup">
        <label htmlFor="filter">Filter events by type: </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="ALL">ALL</option>
          <option value="TEMP">TEMP</option>
          <option value="HEARTBEAT">HEARTBEAT</option>
          <option value="ERROR">ERROR</option>
        </select>
      </div>

      {sortedData.length === 0 ? (
        <div
          style={{
            height: TABLE_CONTAINER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          No data available
        </div>
      ) : (
        <div style={{ height: TABLE_CONTAINER_HEIGHT, overflowY: 'auto' }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
          <div
            style={{
              height: sortedData.length * TABLE_ITEM_HEIGHT,
              position: 'relative'
            }}
          >
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {/* HEADER */}
              <div className="eventRow eventRow--header" style={{ height: TABLE_ITEM_HEIGHT }}>
                <span>ID</span>
                <span>Timestamp</span>
                <span>Type</span>
                <span>Value</span>
                <span>DeviceId</span>
                <span>Message</span>
              </div>

              {/* ROWS */}
              {visibleItems.map((d) => (
                <div key={d.id} className={`eventRow ${d.type === EventTypeEnum.ERROR ? 'eventRow--error' : ''}`} style={{ height: TABLE_ITEM_HEIGHT }}>
                  <span>{d.id}</span>
                  <span>{d.timestamp}</span>
                  <span>
                    {getEventIcon(d.type)} {d.type}
                  </span>
                  <span>{d.value}</span>
                  <span>{d.deviceId}</span>
                  <span>{d.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
