import { FloorPlan } from "../FloorPlan/FloorPlan";
import { Sidebar } from "../Sidebar/Sidebar";

const Dashboard = (): JSX.Element => {
  return (
    <main className="grid grid-cols-12 w-full h-full">
      <Sidebar />
      <FloorPlan />
    </main>
  );
};

export default Dashboard;
