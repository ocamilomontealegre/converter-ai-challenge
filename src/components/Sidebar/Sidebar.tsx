import { Title } from "../Title/Title";
import { Toolbar } from "../Toolbar/Toolbar";
import { Zoom } from "../Zoom/Zoom";
import { ClusterList } from "../ClusterList/ClusterList";
import { Save } from "../Save/Save";

export const Sidebar = () => {
  return (
    <div className="col-span-2 h-full py-8 px-2 bg-anti-flash-white">
      <Title />
      <Toolbar />
      <Zoom />
      <ClusterList />
      <Save />
    </div>
  );
};
