
export interface MinSize {
  minWidth: number;
  minHeight: number;
}

export interface MaxSize {
  maxWidth: number;
  maxHeight: number;
}

export type SizeConstraints=MaxSize&MinSize;

export interface MonitorInfo {
  name?: string;
  position: Position;
  scaleFactor: number;
  size: Size;
  modes: VidMode[];
}

export interface VidMode {
  size: Size;
  bitDepth: number;
  refreshRate: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}