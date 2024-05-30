import { Server } from 'socket.io';
export declare class SocketService {
    server: Server;
    sendMessage(msg: string): void;
    handleMessage(msg: any): void;
}
