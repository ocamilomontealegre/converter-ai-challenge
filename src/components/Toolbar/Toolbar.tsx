import React from "react";
import { useClusterStore } from "../../store/clusterStore/clusterStore";
import { Button } from "../Button/Button";

export const Toolbar: React.FC = () => {
  const { isDrawing, toggleDrawing, deleteLastCluster, deleteAllClusters } = useClusterStore(
    (state) => ({
      isDrawing: state.isDrawing,
      toggleDrawing: state.toggleDrawing,
      deleteLastCluster: state.deleteLastCluster,
      deleteAllClusters: state.deleteAllClusters,
    }),
  );

  return (
    <div className="col-span-2 flex flex-col gap-4 py-8 border-b-2 text-black">
      <h2 className="font-bold">Tools</h2>
      <Button
        className="py-1 px-1 rounded-lg hover:bg-lighter-purple"
        text={isDrawing ? "Stop Drawing" : "Start Drawing"}
        onClick={toggleDrawing}
      />
      <Button
        className="py-1 px-1 rounded-lg hover:bg-lighter-purple"
        text="Delete Last Cluster"
        onClick={deleteLastCluster}
      />
      <Button
        className="py-1 px-1 rounded-lg hover:bg-lighter-purple"
        text="Delete All Clusters"
        onClick={deleteAllClusters}
      />
    </div>
  );
};

export default Toolbar;
