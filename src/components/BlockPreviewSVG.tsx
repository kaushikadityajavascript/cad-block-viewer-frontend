import React from 'react';

interface Entity {
  type: string;
  [key: string]: any;
}

interface Props {
  entities: Entity[];
}

const BlockPreviewSVG: React.FC<Props> = ({ entities }) => {
  const width = 500;
  const height = 500;

 
  const viewBox = `0 0 10 10`;

  return (
    <svg width={width} height={height} viewBox={viewBox} className="border bg-white">
      {entities.map((entity, index) => {
        switch (entity.type) {
          case 'LINE':
            return (
              <line
                key={index}
                x1={entity.start.x}
                y1={-entity.start.y}
                x2={entity.end.x}
                y2={-entity.end.y}
                stroke="black"
                strokeWidth="0.05"
              />
            );

          case 'CIRCLE':
            return (
              <circle
                key={index}
                cx={entity.center.x}
                cy={-entity.center.y}
                r={entity.radius}
                stroke="green"
                strokeWidth="0.05"
                fill="none"
              />
            );

          case 'SPLINE':
            return (
              <polyline
                key={index}
                fill="none"
                stroke="blue"
                strokeWidth="0.05"
                points={entity.controlPoints.map((p: any) => `${p.x},${-p.y}`).join(' ')}
              />
            );

          case 'LWPOLYLINE':
          case 'POLYLINE':
            return (
              <polyline
                key={index}
                fill="none"
                stroke="orange"
                strokeWidth="0.05"
                points={entity.vertices.map((v: any) => `${v.x},${-v.y}`).join(' ')}
              />
            );


          default:
            return null;
        }
      })}
    </svg>
  );
};

export default BlockPreviewSVG;
