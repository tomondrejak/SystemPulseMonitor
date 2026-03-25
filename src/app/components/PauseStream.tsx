import Button from './ui/Button';
import { Pause, Play } from 'lucide-react';

const PauseStream = ({ isPaused, setIsPaused }: { isPaused: boolean; setIsPaused: (isPaused: boolean) => void }) => {
  return (
    <Button
      variant="secondary"
      label={
        isPaused ? (
          <>
            <span className="svgIcon">
              <Play size={16} />
            </span>
            Resume stream
          </>
        ) : (
          <>
            <span className="svgIcon">
              <Pause size={16} />
            </span>
            Pause stream
          </>
        )
      }
      onClick={() => setIsPaused(!isPaused)}
    />
  );
};

export default PauseStream;
