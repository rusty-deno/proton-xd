
export interface MinSize {
  minWidth: number;
  minHeight: number;
}

export interface MaxSize {
  maxWidth: number;
  maxHeight: number;
}

export type SizeConstraints=MaxSize&MinSize;

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}