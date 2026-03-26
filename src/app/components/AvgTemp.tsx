import { Thermometer as IconTemp } from 'lucide-react';

function AvgTemp({ avgTemp }: { avgTemp: number | null }) {
  return (
    <div>
      <span className="svgIcon">
        <IconTemp size={18} />
      </span>
      Avg. temp: {avgTemp ?? 'N/A'}°C
    </div>
  );
}

export default AvgTemp;
