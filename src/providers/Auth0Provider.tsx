import { Auth0Provider as Provider } from "@auth0/auth0-react";
import React, { FunctionComponent } from "react";
import { Routes } from "../App";
import { ENV } from "../env";

interface ProviderProps {
  bypass?: boolean
}

const Auth0Provider: FunctionComponent<ProviderProps> = (props) => {

  return (
    <Provider
      {...ENV.auth0}
    >
      {props.children}
    </Provider>
  );
};

export { Auth0Provider };
