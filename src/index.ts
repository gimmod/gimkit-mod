import socketGrabber from "./socketGrabber.js";
import { captureHttpResponse } from "./captureHttpRequest.js";
import { Client, Protocol, msgpack } from "../colyseus-js/build/esm/index.js";
import {
  decode,
  encode,
  Schema,
  defineTypes,
  type,
  MapSchema,
} from "@colyseus/schema";

const [res, ws] = await Promise.all([
  captureHttpResponse(
    /https:\/\/.+\.gimkitconnect\.com\/matchmake\/joinById\/.+/g
  ),
  socketGrabber(),
] as const);

declare global {
  interface Window {
    ws: WebSocket;
    readonlySocket: any;
  }
}

window.ws = ws;

window.readonlySocket = new EventTarget() as any;
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
    value: (data: any) => {
      console.log("send", data);
    },
  },
  close: {
    value: () => {},
  },
});

const client = new Client();

const room = await client.consumeSeatReservation(JSON.parse(res));

room.onMessage("*", (type, message) => {
  console.log("RECV", type, message);
});

interface Answer {
  correct: boolean;
  _id: string;
  text: string;
}

interface Question {
  __v: number;
  _id: string;
  answers: Answer[];
  audio: string;
  game: string;
  image: string;
  isActive: boolean;
  position: number;
  source: string;
  text: string;
  type: string;
}

let qs: Question[] = [];

room.onMessage("DEVICES_STATES_CHANGES", (message) => {
  const qDevice = JSON.parse(message).changes.find((e: any) =>
    e.changes.keys.includes("GLOBAL_questions")
  );
  if (qDevice) {
    qs = JSON.parse(
      qDevice.changes.values[qDevice.changes.keys.indexOf("GLOBAL_questions")]
    );
  }
});

ws._send = ws.send;
ws.send = (data: ArrayBuffer) => {
  if (
    data instanceof ArrayBuffer &&
    new Uint8Array(data)[0] === Protocol.ROOM_DATA
  ) {
    const bytes = Array.from(new Uint8Array(data));
    const it = { offset: 1 };

    const type = decode.stringCheck(bytes, it)
      ? decode.string(bytes, it)
      : decode.number(bytes, it);

    const message =
      bytes.length > it.offset ? msgpack.decode(data, it.offset) : undefined;

    console.log("SEND", type, message);
  }
  ws._send(data);
};

console.log(Schema, encode, defineTypes);

class Player extends Schema {
  @type("string") name: string = "";
}

class State extends Schema {
  @type({ map: Player }) characters = new MapSchema<Player>();
}

console.log(State);
console.log(qs);
