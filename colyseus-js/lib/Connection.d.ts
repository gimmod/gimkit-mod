import { ITransport, ITransportEventMap } from "./transport/ITransport";
export declare class Connection implements ITransport {
    transport: ITransport;
    events: ITransportEventMap;
    constructor();
    send(data: ArrayBuffer | Array<number>): void;
    connect(): void;
    close(code?: number, reason?: string): void;
}
