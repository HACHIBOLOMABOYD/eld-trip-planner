import React from 'react';

const LogSheetCanvas = ({ statusBlocks }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getColor = (status) => {
    switch (status) {
      case 'driving': return '#3b82f6'; // blue
      case 'rest': return '#10b981'; // green
      case 'off-duty': return '#6b7280'; // gray
      default: return '#f59e0b'; // amber
    }
  };

  return (
    <svg width="100%" height="60">
      {hours.map((hour, i) => {
        const block = statusBlocks.find(b => b.hour === hour);
        const color = block ? getColor(block.status) : '#e5e7eb'; // default gray
        return (
          <rect
            key={i}
            x={i * 40}
            y={10}
            width={40}
            height={40}
            fill={color}
            stroke="#fff"
          />
        );
      })}
      {hours.map((hour, i) => (
        <text
          key={`label-${i}`}
          x={i * 40 + 10}
          y={55}
          fontSize="10"
          fill="#374151"
        >
          {hour}
        </text>
      ))}
    </svg>
  );
};

export default LogSheetCanvas;