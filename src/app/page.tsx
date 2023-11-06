import Dashboard from "@/app/components/Dashboard";
import RootLayout from "@/app/layout";
import DashboardContext from "@/app/DashboardContext";

const HomeRoute = () => (
  <RootLayout>
    <DashboardContext><Dashboard /></DashboardContext>
  </RootLayout>
);

export default HomeRoute;
