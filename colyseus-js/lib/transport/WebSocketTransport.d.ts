import { ITransport, ITransportEventMap } from "./ITransport";
declare global {
    interface Window {
        readonlySocket: WebSocket;
    }
}
export declare class WebSocketTransport implements ITransport {
    events: ITransportEventMap;
    ws: WebSocket;
    protocols?: string | string[];
    constructor(events: ITransportEventMap);
    send(data: ArrayBuffer | Array<number>): void;
    connect(): void;
    close(code?: number, reason?: string): void;
}
