
import React, { FunctionComponent, ReactElement, useEffect } from "react";
import { Routes } from "../App";
import { AuthenticationLevel } from "./AuthenticationProvider";

interface ProviderProps {
  globalComponents: React.ComponentType<any>[];
}

interface ConsumerProps {}

const initialContext = {
  components: new Array<ReactElement>(),
};

export interface GlobalComponent {
  renderCondition: (authLevel: AuthenticationLevel, route: Routes) => boolean;
}

const GlobalComponentContext = React.createContext(initialContext);

const GlobalComponentProvider: FunctionComponent<ProviderProps> = (props) => {
  const [componentContext, setComponentContext] =
    React.useState(initialContext);

  useEffect(() => {
    const children: ReactElement[] = [];

    props.globalComponents.forEach((component, index) => {
      children.push(React.createElement(component, { key: index }));
    });

    setComponentContext({ components: children });
  }, []);

  return (
    <GlobalComponentContext.Provider value={componentContext}>
      {props.children}
    </GlobalComponentContext.Provider>
  );
};

const GlobalComponentConsumer: FunctionComponent<ConsumerProps> = (props) => {
  return (
    <GlobalComponentContext.Consumer>
      {(context) => (
        <>
          {context.components}
          {props.children}
        </>
      )}
    </GlobalComponentContext.Consumer>
  );
};

export function WithRenderCondition(
  Component: FunctionComponent<GlobalComponent>,
  condition: (authLevel: AuthenticationLevel, route: Routes) => boolean
) {
  return class extends React.Component {
    render() {
      return <Component renderCondition={condition} />;
    }
  };
}

export { GlobalComponentProvider, GlobalComponentContext, GlobalComponentConsumer };
