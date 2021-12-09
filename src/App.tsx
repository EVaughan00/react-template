import React, { FunctionComponent } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./areas/dashboard/layouts";
import LandingPage from "./areas/landing/layouts";
import NavigationBar from "./components/navigationbar/NavigationBar";
import { ProviderStack } from "./providers/ProviderStack";
import { AdminRoute, ProtectedRoute } from "./providers/RouterProvider";
import { useHealthCheck } from "./utils/Hooks";

export enum Routes {
  Dashboard = "/dashboard",
  Landing = "/landing",
  Profile = "/profile",
  Admin = "/admin",
  Login = "/login",
}

export const RouteResolver: Record<Routes, string> = {
  "/dashboard": "Dashboard",
  "/landing": "Landing",
  "/profile": "Profile",
  "/admin": "Admin",
  "/login": "Login",
};
 
const App: FunctionComponent = (props) => {
  const onSuccessfulHealthCheck = () => {};
  useHealthCheck(onSuccessfulHealthCheck);

  return (
    <ProviderStack
      defaultSecureRoute={Routes.Dashboard}
      defaultAdminRoute={Routes.Admin}
      defaultInsecureRoute={Routes.Landing}
      navigationComponent={NavigationBar}
      globalProviders={[]}
      globalComponents={[]}
    >
      <AdminRoute exact path={Routes.Admin} component={Dashboard} />
      <ProtectedRoute exact path={Routes.Dashboard} component={Dashboard} />
      <Route exact path={Routes.Landing} component={LandingPage}></Route>
    </ProviderStack>
  );
};

export { App };
