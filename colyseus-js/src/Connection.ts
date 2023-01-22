import { ITransport, ITransportEventMap } from "./transport/ITransport";
import { WebSocketTransport } from "./transport/WebSocketTransport";

export class Connection implements ITransport {
    transport: ITransport;
    events: ITransportEventMap = {};

    constructor() {
        this.transport = new WebSocketTransport(this.events);
    }

    send(data: ArrayBuffer | Array<number>): void {
        this.transport.send(data);
    }

    connect(): void {
        this.transport.connect();
    }

    close(code?: number, reason?: string): void {
        this.transport.close(code, reason);
    }
}
