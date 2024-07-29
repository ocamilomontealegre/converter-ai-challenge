import React from "react";
import { useClusterStore } from "../../store/clusterStore/clusterStore";
import { generateKey } from "../../common/utils/generateKey";
import { CLUSTER_LIST_PREFIX } from "./constants/cluster-list-prefix-constant";

export const ClusterList: React.FC = () => {
  const clusters = useClusterStore((state) => state.clusters);

  return (
    <div className="col-span-2 flex flex-col gap-8 py-8 px-2 border-b-2 text-black">
      <h2 className="font-bold">Cluster List</h2>
      <ul>
        {clusters.map((cluster, index) => (
          <li key={generateKey(CLUSTER_LIST_PREFIX, index)}>{cluster.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClusterList;
