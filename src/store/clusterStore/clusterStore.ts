import { create } from "zustand";
import type { ICluster } from "../../common/interfaces";
import type { IClusterStore } from "./interfaces/cluster-store-interface";

export const useClusterStore = create<IClusterStore>((set) => ({
  clusters: [],
  isDrawing: false,
  addCluster: (cluster: ICluster) => set((state) => ({ clusters: [...state.clusters, cluster] })),
  deleteLastCluster: () => set((state) => ({ clusters: state.clusters.slice(0, -1) })),
  deleteAllClusters: () => set((state) => ({ clusters: [] })),
  toggleDrawing: () => set((state) => ({ isDrawing: !state.isDrawing })),
}));
