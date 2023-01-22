"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgpack = exports.SchemaSerializer = exports.registerSerializer = exports.Platform = exports.Auth = exports.Room = exports.ErrorCode = exports.Protocol = exports.Client = void 0;
require("./legacy");
var Client_1 = require("./Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Protocol_1 = require("./Protocol");
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return Protocol_1.Protocol; } });
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return Protocol_1.ErrorCode; } });
var Room_1 = require("./Room");
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return Room_1.Room; } });
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_1.Auth; } });
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return Auth_1.Platform; } });
/*
 * Serializers
 */
const SchemaSerializer_1 = require("./serializer/SchemaSerializer");
Object.defineProperty(exports, "SchemaSerializer", { enumerable: true, get: function () { return SchemaSerializer_1.SchemaSerializer; } });
const NoneSerializer_1 = require("./serializer/NoneSerializer");
const Serializer_1 = require("./serializer/Serializer");
Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function () { return Serializer_1.registerSerializer; } });
(0, Serializer_1.registerSerializer)("schema", SchemaSerializer_1.SchemaSerializer);
(0, Serializer_1.registerSerializer)("none", NoneSerializer_1.NoneSerializer);
exports.msgpack = __importStar(require("./msgpack"));
//# sourceMappingURL=index.js.map