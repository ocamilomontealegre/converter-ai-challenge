import { useState } from "react";

export const useZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => setZoomLevel((prevZoom) => prevZoom * 1.2);
  const zoomOut = () => setZoomLevel((prevZoom) => prevZoom / 1.2);

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
  };
};
