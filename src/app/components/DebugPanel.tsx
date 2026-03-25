// components/DebugPanel.tsx
export const DebugPanel = ({
  fps,
  memory,
}: {
  fps: number;
  memory: number | null;
}) => (
  <div className="debug">
    <strong>FPS:</strong> {fps} | <strong>Memory: </strong>
    {memory ? `${memory} MB` : 'N/A'}
  </div>
);