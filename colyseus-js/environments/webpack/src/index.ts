import { Client } from "colyseus.js";

const client = new Client("ws://localhost:2567");
client.joinOrCreate("dummy").then((room: any) => {
    room.onStateChange((state: any) => {
        console.log("onStateChange", state);
    });
    room.onLeave((code: number) => console.log("onLeave:", { code }));
});
