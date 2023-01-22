// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(events) {
        this.events = events;
    }
    WebSocketTransport.prototype.send = function (data) {
        if (data instanceof ArrayBuffer) {
            this.ws.send(data);
        }
        else if (Array.isArray(data)) {
            this.ws.send(new Uint8Array(data).buffer);
        }
    };
    WebSocketTransport.prototype.connect = function () {
        this.ws = window.readonlySocket;
        this.ws.addEventListener("open", this.events.onopen);
        this.ws.addEventListener("message", this.events.onmessage);
        this.ws.addEventListener("close", this.events.onclose);
        this.ws.addEventListener("error", this.events.onerror);
    };
    WebSocketTransport.prototype.close = function (code, reason) {
        this.ws.close(code, reason);
    };
    return WebSocketTransport;
}());

exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map
