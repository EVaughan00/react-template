import { ENV } from "./env";

const version = "v1"

export const API = {

    local: {
        session: "session-token"
    },
    
    webSockets: {
        updates: `${ENV.connections.api}/${version}/updates`
    },

    server: {
        healthCheck: `${ENV.connections.api}/hc`, // GET

        account: {
            details: `${ENV.connections.api}/${version}/users/%email%`, // GET
            list: `${ENV.connections.api}/${version}/users/list`, // GET
        },

        password: {
            update: `${ENV.connections.api}/${version}/password/update`, // POST
            requestReset: `${ENV.connections.api}/${version}/password/reset`, // POST
            verifyReset: `${ENV.connections.api}/${version}/password/verify`, // POST
        },

    }
}