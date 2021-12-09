import { ENV } from "./env";

const version = "v1"

export const API = {

    local: {
        session: "session-token"
    },
    
    webSockets: {
        productUpdates: `${ENV.connections.api}/${version}/live/uploads`
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

        product: {
            list: `${ENV.connections.api}/${version}/products`, // GET
        },

        uploads: {
            recentAQSync: `${ENV.connections.api}/${version}/uploads/aqsync/recent`, // GET
            recentAQLite: `${ENV.connections.api}/${version}/uploads/aqlite/recent`, // GET
            recentPAM: `${ENV.connections.api}/${version}/uploads/pam/recent`, // GET
            streamAQSync: `${ENV.connections.api}/${version}/uploads/aqsync/stream`, // GET
            streamPAM: `${ENV.connections.api}/${version}/uploads/pam/stream`, // GET
            streamAQLite: `${ENV.connections.api}/${version}/uploads/aqlite/stream` // GET
        },

        device: {
            listByProduct: `${ENV.connections.api}/${version}/devices/%serial%`, // GET
            recentUploads: `${ENV.connections.api}/${version}/uploads/pam/recent` // GET
        }
    }
}