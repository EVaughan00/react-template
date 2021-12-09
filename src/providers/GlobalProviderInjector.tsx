import React, { FunctionComponent, ReactElement, ReactNode, useEffect } from "react";
import { Routes } from "../App";
import { AuthenticationLevel } from "./AuthenticationProvider";

interface ProviderProps {
  globalProviders: React.ComponentType<any>[];
}


const GlobalProviderInjector: FunctionComponent<ProviderProps> = (props) => {

  const nestProviders = (
    provider: React.ComponentType<any>,
    children: ReactNode,
    index: number
  ) => {


    if (!props.globalProviders[index + 1]) {

        const element = React.createElement(provider, {}, children)
        
        return element;
    }

    return React.createElement(provider, 
      {},
      nestProviders(
        props.globalProviders[index + 1],
        children,
        index + 1
      ),
    );
  };

  if (props.globalProviders.length < 1) return <>{props.children}</>


  const providers = nestProviders(
    props.globalProviders[0],
    props.children,
    0
  )

  return providers
};

export {
  GlobalProviderInjector,
};
