import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

interface WebSocketConnections {
    [connection: string]: string
}

type WebSocketHub<C extends WebSocketConnections> = {
    [K in keyof C]: HubConnection
}

interface HubConfiguration {
    [hub: string]: (connection: HubConnection) => void
}

export class WebSocketService<C extends WebSocketConnections> {
    public connections: WebSocketHub<C>;

    constructor(connections: C) {
        this.connections = <WebSocketHub<C>> {};

        Object.keys(connections).forEach((connection: keyof C) => {
            this.connections[connection] = new HubConnectionBuilder()
                .withUrl(connections[connection])
                .build();
        });
    }

    public addAuthorization(token: string): void {
        Object.keys(this.connections).forEach((connection: keyof C) => {
            this.connections[connection] = new HubConnectionBuilder()
                .withUrl(this.connections[connection].baseUrl, {accessTokenFactory: () => token})
                .withAutomaticReconnect()
                .build();
        });    
    }
    
    public configure(configurations: HubConfiguration): void {   
        Object.keys(configurations).forEach(name => {
            const connection = this.connections[name];
            const configure = configurations[name];

            if (connection)
                configure(connection);
        });
    }  


    public disconnect(): Promise<WebSocketHub<C>> {
        const promises: Promise<any>[] = [];   

        Object.keys(this.connections).forEach(connection => {
            promises.push(this.connections[connection].stop());
        })

        return Promise.all(promises).then(() => this.connections);
    }
    
    public connect(): Promise<WebSocketHub<C>> {     
        const promises: Promise<any>[] = [];   
        
        Object.keys(this.connections).forEach(connection => {
            promises.push(this.connections[connection].start());
        });

        return Promise.all(promises).then(() => this.connections);
    }    
}

