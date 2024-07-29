import React from "react";
import { useClusterStore } from "../../store/clusterStore/clusterStore";
import { useZoomStore } from "../../store/zoomStore/zoomStore";
import { useDrawing } from "./hooks";
import { generateKey } from "../../common/utils/generateKey";
import { FLOOR_PLAN_PREFIX } from "./constants/floor-plan-constant";
import { ReactComponent as FloorPlanSVG } from "../../common/assets/floor_plan.svg";

export const FloorPlan: React.FC = () => {
  const { clusters, isDrawing } = useClusterStore((state) => ({
    clusters: state.clusters,
    isDrawing: state.isDrawing,
  }));
  const addCluster = useClusterStore((state) => state.addCluster);
  const { zoomLevel } = useZoomStore((state) => ({
    zoomLevel: state.zoomLevel,
  }));
  const { svgRef, currentPoints } = useDrawing(addCluster, clusters.length);

  return (
    <div className="col-span-10 flex justify-center items-center">
      <svg className="w-full h-full" ref={svgRef} style={{ transform: `scale(${zoomLevel})` }}>
        <FloorPlanSVG />
        {isDrawing && currentPoints.length > 0 && (
          <polygon
            points={currentPoints.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="rgba(0, 0, 255, 0.3)"
            stroke="blue"
            strokeWidth="2"
          />
        )}
        {clusters.map((cluster, index) => (
          <g key={generateKey(FLOOR_PLAN_PREFIX, index)}>
            <polygon
              points={cluster.points.map((point) => `${point.x},${point.y}`).join(" ")}
              fill="rgba(0, 255, 0, 0.3)"
              stroke="green"
              strokeWidth="2"
            />
            <text
              x={cluster.points.reduce((sum, point) => sum + point.x, 0) / cluster.points.length}
              y={cluster.points.reduce((sum, point) => sum + point.y, 0) / cluster.points.length}
              fill="black"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="12"
            >
              {cluster.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FloorPlan;
