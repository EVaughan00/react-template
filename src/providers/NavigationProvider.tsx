import React, { FunctionComponent } from "react";

interface ProviderProps {
  navigationComponent: React.ComponentType<any>;
}

interface ConsumerProps {
}

const initialContext = {
  navigationComponent: {},
};

const NavigationContext = React.createContext(initialContext);

const NavigationProvider: FunctionComponent<ProviderProps> = (props) => {
  const navigationComponent = React.createElement(props.navigationComponent);

  const [navigationContext, setNavigationContext] = React.useState({
    navigationComponent: navigationComponent,
  });

  return (
    <NavigationContext.Provider value={navigationContext}>
      {props.children}
    </NavigationContext.Provider>
  );
};

const NavigationConsumer: FunctionComponent<ConsumerProps> = (props) => {
  return (
    <NavigationContext.Consumer>
      {(context) => (
        <>
          {context.navigationComponent}
          {props.children}
        </>
      )}
    </NavigationContext.Consumer>
  );
};

function WithNavigation(Component: FunctionComponent) {

  return class extends React.Component {
    render() {
      return (
        <NavigationConsumer>
          <Component />
        </NavigationConsumer>
      )
    }
  }  
}

export { NavigationProvider, NavigationContext, NavigationConsumer, WithNavigation };
