# System Pulse monitor

System Pulse Monitor application built with Next.js, React, and Chart.js to visualize real-time sensor data and performance metrics.

Screenshot: 
https://drive.google.com/file/d/1T6Ni-kJZ-88i5oCBN8F2PpkVxGxVF5FS/view?usp=sharing

## Installation

App requires Node.js v24.7.0+

Install pnpm package manager [pnpm](https://pnpm.io/).

```bash
npm install -g pnpm
```

Install your packages in your root directory:

```bash
pnpm install
```

## Run the app

First, run local SSE server which will stream events at http://localhost:1337/stream

```bash
pnpm run sse_server
```

Than run the app at http://localhost:3000/

```bash
pnpm run dev
```

Default configuration:

```python
export const SERVER_STREAM_URL = 'http://localhost:1337/stream';
export const SERVER_PORT = 1337;
export const SERVER_STREAM_FREQUENCY = 100; // ms between server events
export const SERVER_RECONNECT_INTERVAL = 2000; // ms

export const BUFFER_UPDATE_INTERVAL =  500; // ms
export const BUFFER_MAX_ITEMS = 200;

export const TABLE_ITEM_HEIGHT = 32;
export const TABLE_CONTAINER_HEIGHT = 320;

```
