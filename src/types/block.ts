// src/types/block.ts

export interface ControlPoint {
  x: number;
  y: number;
  z: number;
}

export interface Block {
  id: number;
  name: string;
  type: string;
  file: { id: number; name: string };
  properties: {
    color: number;
    layer: string;
    controlPoints: ControlPoint[];
  };
}

export interface BlockDetailsProps {
  block: Block | null;
  onClose: () => void;
}
