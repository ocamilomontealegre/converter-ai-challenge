export interface IZoomStore {
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomReset: () => void;
}
