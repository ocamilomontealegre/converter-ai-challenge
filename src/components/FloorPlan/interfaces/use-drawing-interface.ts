import { RefObject } from "react";
import type { IPoint } from "../../../common/interfaces";

export interface IUseDrawing {
  svgRef: RefObject<SVGSVGElement>;
  isDrawing: boolean;
  currentPoints: IPoint[];
}
