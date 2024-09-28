import { io } from "socket.io-client";
import { createContext } from 'react';

export const socket = io(import.meta.env.VITE_WEBSOCKET_URL)
export const SocketContext = createContext(socket)