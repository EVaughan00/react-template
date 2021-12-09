import React, { FunctionComponent } from "react";
import { Auth0Provider } from "./Auth0Provider";
import { AuthenticationProvider } from "./AuthenticationProvider";
import { GlobalComponentProvider } from "./GlobalComponentProvider";
import { GlobalProviderInjector } from "./GlobalProviderInjector";
import { NavigationProvider } from "./NavigationProvider";
import { RouterProvider } from "./RouterProvider";
import { WebSocketProvider } from "./WebSocketProvider";

interface Props {
  defaultInsecureRoute: string;
  defaultAdminRoute: string;
  defaultSecureRoute: string;
  navigationComponent: React.ComponentType<any>;
  globalComponents: React.ComponentType<any>[];
  globalProviders: React.ComponentType<any>[];
}

const ProviderStack: FunctionComponent<Props> = (props) => {
  return (
    <Auth0Provider>
      <AuthenticationProvider>
        <WebSocketProvider>
          <GlobalProviderInjector {...props}>
            <NavigationProvider {...props}>
              <GlobalComponentProvider {...props}>
                <RouterProvider {...props}>{props.children}</RouterProvider>
              </GlobalComponentProvider>
            </NavigationProvider>
          </GlobalProviderInjector>
        </WebSocketProvider>
      </AuthenticationProvider>
    </Auth0Provider>
  );
};

export { ProviderStack };
