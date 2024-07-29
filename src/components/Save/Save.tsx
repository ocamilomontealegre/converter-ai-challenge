import { Button } from "../Button/Button";
import { useClusterStore } from "../../store/clusterStore/clusterStore";
import { printClusterList } from "./utils/printClusterList";

export const Save = () => {
  const clusters = useClusterStore((state) => state.clusters);

  return (
    <div className="flex flex-col gap-4 py-8 text-black">
      <h2 className="font-bold">Print Cluster List</h2>
      <Button text="Save" onClick={() => printClusterList(clusters)} />
    </div>
  );
};
