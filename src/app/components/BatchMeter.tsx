export const BatchMeter = ({ batchSize, eventRate }: { batchSize: number; eventRate: number }) => (
  <div>
    <strong>Buffer size:</strong> {batchSize} events | <strong>Events/sec:</strong> {eventRate}
  </div>
);
