import { RawPulse, Pulse } from '../types/eventTypes';

export const pulseAdapter = (raw: RawPulse, eventNum: number): Pulse => ({
  id: eventNum,
  guid: raw.guid,
  timestampRaw: raw.t,
  timestamp: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  }),
  value: Number(raw.v),
  message: raw.m,
  type: raw.type,
  deviceId: raw.metadata?.device_id || 'N/A'
});
