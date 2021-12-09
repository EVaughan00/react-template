import { HubConnection } from "@microsoft/signalr";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../providers/WebSocketProvider";
import { HealthCheckService } from "../services/support/HealthCheckService";


export const useHealthCheck = (callback: () => void) => {
    useEffect(() => {
        HealthCheckService.checkServer().then((hc) => {
          if (hc.healthy) {
            console.log("Server available");
            callback()
          } 
          else console.error("Server unavailable...");
        });
    }, [])
}


export const useWebSocket = (websocket: HubConnection, method: string, callBack: (args: any) => void) => {

  const { connected } = useContext(WebSocketContext)

  useEffect(() => {
  
    if (connected)
      websocket.on(method, payload =>
        callBack(payload))

  }, [connected])
}

export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export const useReactPath = () => {
  const [path, setPath] = useState(window.location.pathname);
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
};