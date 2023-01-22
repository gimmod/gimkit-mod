import { ITransport, ITransportEventMap } from "./ITransport";

declare global {
    interface Window {
        readonlySocket: WebSocket;
    }
}

export class WebSocketTransport implements ITransport {
    ws: WebSocket;
    protocols?: string | string[];

    constructor(public events: ITransportEventMap) {}

    public send(data: ArrayBuffer | Array<number>): void {
        if (data instanceof ArrayBuffer) {
            this.ws.send(data);
        } else if (Array.isArray(data)) {
            this.ws.send(new Uint8Array(data).buffer);
        }
    }

    public connect() {
        this.ws = window.readonlySocket;
        this.ws.addEventListener("open", this.events.onopen);
        this.ws.addEventListener("message", this.events.onmessage);
        this.ws.addEventListener("close", this.events.onclose);
        this.ws.addEventListener("error", this.events.onerror);
    }

    public close(code?: number, reason?: string) {
        this.ws.close(code, reason);
    }
}
