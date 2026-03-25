export enum EventTypeEnum {
  TEMP = 'TEMP',
  HEARTBEAT = 'HEARTBEAT',
  ERROR = 'ERROR'
}

export type EventType = 'TEMP' | 'HEARTBEAT' | 'ERROR';

export interface RawPulse {
  guid: string; // unique ID for event tracking
  t: number;
  v: string;
  m: string;
  type: EventType;
  metadata?: {
    device_id?: string | null;
  };
}

export interface Pulse {
  id: number;
  guid: string;
  timestampRaw: number;
  timestamp: string;
  value: number;
  message: string;
  type: EventType;
  deviceId: string;
}
