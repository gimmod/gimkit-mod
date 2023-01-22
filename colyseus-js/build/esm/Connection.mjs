// colyseus.js@0.14.14
import { WebSocketTransport } from './transport/WebSocketTransport.mjs';

class Connection {
    transport;
    events = {};
    constructor() {
        this.transport = new WebSocketTransport(this.events);
    }
    send(data) {
        this.transport.send(data);
    }
    connect() {
        this.transport.connect();
    }
    close(code, reason) {
        this.transport.close(code, reason);
    }
}

export { Connection };
//# sourceMappingURL=Connection.mjs.map
