"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketTransport = void 0;
class WebSocketTransport {
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
exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map