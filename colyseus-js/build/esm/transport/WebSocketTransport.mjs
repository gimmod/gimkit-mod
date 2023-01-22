// colyseus.js@0.14.14
class WebSocketTransport {
    events;
    ws;
    protocols;
    constructor(events) {
        this.events = events;
    }
    send(data) {
        if (data instanceof ArrayBuffer) {
            this.ws.send(data);
        }
        else if (Array.isArray(data)) {
            this.ws.send(new Uint8Array(data).buffer);
        }
    }
    connect() {
        this.ws = window.readonlySocket;
        this.ws.addEventListener("open", this.events.onopen);
        this.ws.addEventListener("message", this.events.onmessage);
        this.ws.addEventListener("close", this.events.onclose);
        this.ws.addEventListener("error", this.events.onerror);
    }
    close(code, reason) {
        this.ws.close(code, reason);
    }
}

export { WebSocketTransport };
//# sourceMappingURL=WebSocketTransport.mjs.map
