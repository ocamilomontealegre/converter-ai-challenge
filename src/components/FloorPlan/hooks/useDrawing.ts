import { useCallback, useEffect, useRef, useState } from "react";
import type { IPoint } from "../../../common/interfaces";
import type { IUseDrawing } from "../interfaces/use-drawing-interface";

export const useDrawing = (
  addCluster: (cluster: { points: IPoint[]; name: string }) => void,
  clustersLength: number,
): IUseDrawing => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<IPoint[]>([]);
  const [isClosed, setIsClosed] = useState(false);

  const getMousePosition = useCallback(
    (svg: SVGSVGElement | null, event: React.MouseEvent<SVGSVGElement>): IPoint => {
      if (!svg) return { x: 0, y: 0 };
      const CTM = svg.getScreenCTM();
      if (!CTM) return { x: 0, y: 0 };
      return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d,
      };
    },
    [],
  );

  const isPointCloseToStart = useCallback(
    (point: IPoint): boolean => {
      if (currentPoints.length === 0) return false;
      const startPoint = currentPoints[0];
      const distance = Math.sqrt((point.x - startPoint.x) ** 2 + (point.y - startPoint.y) ** 2);
      return distance < 10;
    },
    [currentPoints],
  );

  const clipPointToSVG = useCallback((svg: SVGSVGElement, point: IPoint): IPoint => {
    if (!svg) return { x: 0, y: 0 };
    const { width, height } = svg.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(point.x, width)),
      y: Math.max(0, Math.min(point.y, height)),
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!isDrawing) {
        setIsDrawing(true);
        const svg = svgRef.current;
        if (svg) {
          const point = getMousePosition(svg, e);
          setCurrentPoints([point]);
        }
      } else if (isClosed) {
        setIsDrawing(false);
        if (currentPoints.length > 2) {
          addCluster({
            points: currentPoints,
            name: `Cluster ${clustersLength + 1}`,
          });
        }
        setCurrentPoints([]);
        setIsClosed(false);
      } else {
        const svg = svgRef.current;
        if (svg) {
          const point = getMousePosition(svg, e);
          if (currentPoints.length > 0 && isPointCloseToStart(point)) {
            setIsClosed(true);
          } else {
            const clippedPoint = clipPointToSVG(svg, point);
            setCurrentPoints((prev) => [...prev, clippedPoint]);
          }
        }
      }
    },
    [
      isDrawing,
      isClosed,
      currentPoints,
      clustersLength,
      addCluster,
      getMousePosition,
      isPointCloseToStart,
      clipPointToSVG,
    ],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isDrawing && !isClosed) {
        const svg = svgRef.current;
        if (svg) {
          const point = getMousePosition(svg, e);
          const clippedPoint = clipPointToSVG(svg, point);
          setCurrentPoints((prev) => {
            return prev.length > 1 ? [...prev.slice(0, -1), clippedPoint] : [...prev, clippedPoint];
          });
        }
      }
    },
    [isDrawing, isClosed, getMousePosition, clipPointToSVG],
  );

  const handleMouseUp = useCallback(() => {
    if (isClosed) {
      setIsDrawing(false);
      if (currentPoints.length > 2) {
        addCluster({
          points: currentPoints,
          name: `Cluster ${clustersLength + 1}`,
        });
      }
      setCurrentPoints([]);
      setIsClosed(false);
    }
  }, [isClosed, currentPoints, clustersLength, addCluster]);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener("mousedown", handleMouseDown as unknown as EventListener);
      svg.addEventListener("mousemove", handleMouseMove as unknown as EventListener);
      svg.addEventListener("mouseup", handleMouseUp as unknown as EventListener);

      return () => {
        svg.removeEventListener("mousedown", handleMouseDown as unknown as EventListener);
        svg.removeEventListener("mousemove", handleMouseMove as unknown as EventListener);
        svg.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return {
    svgRef,
    isDrawing,
    currentPoints,
  };
};
