/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import cors from 'cors';
import { SERVER_PORT, SERVER_STREAM_FREQUENCY } from '../constants/constants.ts';

const app = express();
app.use(cors());

const clients: any = [];

const startEventStream = () => {
  setInterval(() => {
    const types = ['TEMP', 'HEARTBEAT', 'ERROR'];
    const type = types[Math.floor(Math.random() * types.length)];

    const event = {
      guid: crypto.randomUUID(), // unique ID for event tracking
      t: Date.now(),
      v: (Math.random() * 100).toFixed(2),
      m: `Message_${Math.random().toString(36).slice(-4)}`,
      type,
      metadata: {
        device_id: Math.random() > 0.1 ? 'SENSOR_01' : 'Unknown_Device'
      }
    };

    const data = `data: ${JSON.stringify(event)}\n\n`;

    clients.forEach((res) => res.write(data));
  }, SERVER_STREAM_FREQUENCY);
};

app.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  res.write('\n');

  clients.push(res);

  req.on('close', () => {
    const index = clients.indexOf(res);
    if (index !== -1) clients.splice(index, 1);
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`SSE server is running on http://localhost:${SERVER_PORT}/stream`);
  startEventStream();
});
