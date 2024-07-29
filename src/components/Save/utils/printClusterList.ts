import { ICluster } from "../../../common/interfaces";

export const printClusterList = (clusterList: ICluster[]): void => {
  console.dir(clusterList);
};
