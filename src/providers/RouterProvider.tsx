import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { Routes } from "../App";
import Drawer from "../components/drawer/Drawer";
import {
  AuthenticationContext,
  AuthenticationLevel,
} from "./AuthenticationProvider";
import { GlobalComponentConsumer } from "./GlobalComponentProvider";

interface RouterProps {
  defaultSecureRoute: string;
  defaultAdminRoute: string;
  defaultInsecureRoute: string;
  navigationComponent: React.ComponentType<any>;
}

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  useNavigation?: boolean;
}

export enum DefaultRoutes {
  Loading = "/loading",
  Login = "/login",
  Logout = "/logout",
}

const RouterProvider: FunctionComponent<RouterProps> = (props) => {
  const { authenticated, authLevel, loggingOut } = useContext(
    AuthenticationContext
  );
  const [secureRoutes, setSecureRoutes] = useState<JSX.Element[]>([]);
  const [adminRoutes, setAdminRoutes] = useState<JSX.Element[]>([]);
  const [insecureRoutes, setInsecureRoutes] = useState<JSX.Element[]>([]);
  const { isLoading } = useAuth0();

  const mapRoutesByType = (routes: Array<JSX.Element>, type: string) => {
    React.Children.map(props.children, (child, index) => {
      if (!React.isValidElement(child)) return;

      if ((child as any).type.name == type) {
        const element = React.cloneElement(child, {
          key: index,
        });

        routes.push(element);
      }
    });

    return routes;
  };

  useEffect(() => {
    setAdminRoutes(mapRoutesByType(secureRoutes, AdminRoute.name));

    setSecureRoutes(mapRoutesByType(secureRoutes, ProtectedRoute.name));

    setInsecureRoutes(mapRoutesByType(insecureRoutes, Route.name));
  }, []);

  return (
    <Router>
      <GlobalComponentConsumer>
        <Switch>
          {authenticated
            ? authLevel == AuthenticationLevel.Administrative
              ? adminRoutes && secureRoutes
              : secureRoutes
            : !loggingOut && insecureRoutes}

          {!isLoading &&
            (authenticated ? (
              authLevel == AuthenticationLevel.Administrative ? (
                <Redirect from="*" to={props.defaultAdminRoute} />
              ) : (
                <Redirect from="*" to={props.defaultSecureRoute} />
              )
            ) : (
              <Redirect from="*" to={props.defaultInsecureRoute} />
            ))}
        </Switch>
      </GlobalComponentConsumer>
    </Router>
  );
};

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { component, ...args } = props;

  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Typography>Redirecting...</Typography>,
      })}
      {...args}
    ></Route>
  );
};

const AdminRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  return <ProtectedRoute {...props} />;
};

export { RouterProvider, ProtectedRoute, AdminRoute };
