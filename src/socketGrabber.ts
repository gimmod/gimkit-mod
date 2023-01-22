interface ExtendedWS extends WebSocket {
  _send: any;
}

export default function () {
  return new Promise((r: (ws: ExtendedWS) => void) => {
    const WebSocketBackup = WebSocket;
    class ExtendedWS extends WebSocket {
      constructor(url: string | URL, protocols?: string | string[]) {
        super(url, protocols);
        r(this);
        window.WebSocket = WebSocketBackup;
      }

      _send: any;
    }
    window.WebSocket = ExtendedWS;
  });
}
