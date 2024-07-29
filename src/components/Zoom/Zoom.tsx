import { useZoomStore } from "../../store/zoomStore/zoomStore";

export const Zoom = () => {
  const { zoomIn, zoomOut, zoomReset } = useZoomStore((state) => ({
    zoomIn: state.zoomIn,
    zoomOut: state.zoomOut,
    zoomReset: state.zoomReset,
  }));

  return (
    <div className="flex flex-col gap-4 py-8 border-b-2 text-black">
      <h2 className="font-bold">Zoom Controls</h2>
      <button onClick={zoomIn}>Zoom In +</button>
      <button onClick={zoomOut}>Zoom Out -</button>
      <button onClick={zoomReset}>Zoom Reset</button>
    </div>
  );
};

export default Zoom;
