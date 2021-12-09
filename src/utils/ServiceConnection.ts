interface ConnectionSetting {
    Host?: string;
    Path?: string;
    Port?: number;
}

export class ServiceConnection {
    public readonly name: string;
    public readonly port: number;
    public readonly host: string;
    private readonly _path: string;
    private static Secure: boolean = process.env.CONNECTIONS == "local" ? false : true;

    constructor(name: string, setting: ConnectionSetting) {
        this.host = setting.Host ?? "";
        this._path = setting.Path ?? "";
        this.port = !setting.Port || setting.Port < 0 ? 80 : setting.Port;
        this.name = name;
    }

    public get address() {
        const prefix = ServiceConnection.Secure ? "https" : "http";
        const port = this.port == 80 ? "" : `:${this.port}`;

        return `${prefix}://${this.host}${port}${this._path}`;
    }

    public static import<T extends string>(settings: Record<T, ConnectionSetting>) {
        let connections: any = {};

        Object.keys(settings).forEach(key => {
            connections[key] = new ServiceConnection(key, settings[key as keyof Record<T, ConnectionSetting>]);
        });

        return <Record<T, ServiceConnection>> connections;
    }

    public toString() {
        return this.address;
    }
}