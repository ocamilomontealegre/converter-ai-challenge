import type { ICluster } from "../../../common/interfaces";

export interface IClusterStore {
  clusters: ICluster[];
  isDrawing: boolean;
  addCluster: (cluster: ICluster) => void;
  deleteLastCluster: () => void;
  deleteAllClusters: () => void;
  toggleDrawing: () => void;
}
