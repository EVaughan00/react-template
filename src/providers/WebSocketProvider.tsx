import { useAuth0 } from "@auth0/auth0-react";
import React, { FunctionComponent } from "react";
import { API } from "../api";
import { ENV } from "../env";
import { WebSocketService } from "../utils/WebSocketService";
import { AuthenticationContext } from "./AuthenticationProvider";

const service = new WebSocketService({
  productUpdates: API.webSockets.productUpdates
});

const initialContext = {
  service,
  connected: false,
};

export const WebSocketContext = React.createContext(initialContext);

interface Props {
  bypass?: boolean;
}

const WebSocketProvider: FunctionComponent<Props> = (props) => {
  const [socketContext, setSocketContext] = React.useState(initialContext);
  const authContext = React.useContext(AuthenticationContext);
  const { getAccessTokenSilently } = useAuth0()
  const { productUpdates: deviceUpdates } = service.connections

  React.useEffect(() => {
    if (props.bypass) return setSocketContext({ service, connected: true });
  }, []);

  React.useEffect(() => {
    if (authContext.authenticated) {

      getAccessTokenSilently({ audience: ENV.auth0.audience })
        .then(token => service.addAuthorization(token))
        .then(() => handleServiceConnection())
        .catch(error => console.log(error))

    }
  }, [authContext.authenticated]);

  const handleServiceConnection = () => {
    service
      .connect()
      .then(() => setSocketContext({ connected: true, service }))
      .catch(() => {
        console.log("Failed to connect to websocket... attempting to reconnect")
        setTimeout(handleServiceConnection, 2000)
      });
  }

  // React.useEffect(() => {
    

  // }, [service.connections])

  return (
    <WebSocketContext.Provider value={socketContext}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider };
