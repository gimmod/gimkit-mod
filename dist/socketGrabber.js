export default function () {
    return new Promise((r) => {
        const WebSocketBackup = WebSocket;
        class ExtendedWS extends WebSocket {
            constructor(url, protocols) {
                super(url, protocols);
                r(this);
                window.WebSocket = WebSocketBackup;
            }
            _send;
        }
        window.WebSocket = ExtendedWS;
    });
}
//# sourceMappingURL=socketGrabber.js.map