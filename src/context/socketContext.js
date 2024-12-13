import { createContext, useContext } from "react";
import io from "socket.io-client";
import { FancySocketUrl, GlobalWebSocket } from "../utils/constance";

const socketOptions = {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
  reconnectionAttempts: Infinity,
  transports: [
    "websocket",
    "flashsocket",
    "htmlfile",
    "xhr-polling",
    "jsonp-polling",
    "polling",
  ],
};

let fancySocketURL = FancySocketUrl;
let GLOBAL_WS_BASE = GlobalWebSocket;

export const FancySocket = io(fancySocketURL, socketOptions);

export const _socket = io(GLOBAL_WS_BASE, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
  reconnectionAttempts: Infinity,
  transports: ["websocket", "polling", "flashsocket"],
});

export const socketContext = createContext();

export const SocketProvider = socketContext.Provider;

export default function useSocketContext() {
  return useContext(socketContext);
}
