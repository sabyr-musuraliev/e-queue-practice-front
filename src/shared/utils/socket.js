import { io } from "socket.io-client";

const URL = "http://localhost:8000";

export const socket = io(URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});
