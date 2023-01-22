var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import socketGrabber from "./socketGrabber.js";
import { captureHttpResponse } from "./captureHttpRequest.js";
import { Client, Protocol, msgpack } from "../colyseus-js/build/esm/index.js";
import { decode, encode, Schema, defineTypes, type, MapSchema, } from "@colyseus/schema";
const [res, ws] = await Promise.all([
    captureHttpResponse(/https:\/\/.+\.gimkitconnect\.com\/matchmake\/joinById\/.+/g),
    socketGrabber(),
]);
window.ws = ws;
window.readonlySocket = new EventTarget();
window.readonlySocket.addEventListener = ws.addEventListener.bind(ws);
window.readonlySocket.removeEventListener = ws.removeEventListener.bind(ws);
window.readonlySocket.dispatchEvent = ws.dispatchEvent.bind(ws);
Object.defineProperties(window.readonlySocket, {
    readyState: {
        get: () => ws.readyState,
    },
    url: {
        get: () => ws.url,
    },
    protocol: {
        get: () => ws.protocol,
    },
    binaryType: {
        get: () => ws.binaryType,
    },
    bufferedAmount: {
        get: () => ws.bufferedAmount,
    },
    extensions: {
        get: () => ws.extensions,
    },
    onopen: {
        get: () => ws.onopen,
    },
    onmessage: {
        get: () => ws.onmessage,
    },
    onclose: {
        get: () => ws.onclose,
    },
    onerror: {
        get: () => ws.onerror,
    },
    send: {
        value: (data) => {
            console.log("send", data);
        },
    },
    close: {
        value: () => { },
    },
});
const client = new Client();
const room = await client.consumeSeatReservation(JSON.parse(res));
room.onMessage("*", (type, message) => {
    console.log("RECV", type, message);
});
let qs = [];
room.onMessage("DEVICES_STATES_CHANGES", (message) => {
    const qDevice = JSON.parse(message).changes.find((e) => e.changes.keys.includes("GLOBAL_questions"));
    if (qDevice) {
        qs = JSON.parse(qDevice.changes.values[qDevice.changes.keys.indexOf("GLOBAL_questions")]);
    }
});
ws._send = ws.send;
ws.send = (data) => {
    if (data instanceof ArrayBuffer &&
        new Uint8Array(data)[0] === Protocol.ROOM_DATA) {
        const bytes = Array.from(new Uint8Array(data));
        const it = { offset: 1 };
        const type = decode.stringCheck(bytes, it)
            ? decode.string(bytes, it)
            : decode.number(bytes, it);
        const message = bytes.length > it.offset ? msgpack.decode(data, it.offset) : undefined;
        console.log("SEND", type, message);
    }
    ws._send(data);
};
console.log(Schema, encode, defineTypes);
class Player extends Schema {
    name = "";
}
__decorate([
    type("string")
], Player.prototype, "name", void 0);
class State extends Schema {
    characters = new MapSchema();
}
__decorate([
    type({ map: Player })
], State.prototype, "characters", void 0);
console.log(State);
console.log(qs);
//# sourceMappingURL=index.js.map