import { create } from "zustand";
import type { IZoomStore } from "./interfaces/zoom-store-interface";

export const useZoomStore = create<IZoomStore>((set) => ({
  zoomLevel: 1,
  zoomIn: () => set((state) => ({ zoomLevel: state.zoomLevel * 1.2 })),
  zoomOut: () => set((state) => ({ zoomLevel: state.zoomLevel / 1.2 })),
  zoomReset: () => set(() => ({ zoomLevel: 1 })),
}));
