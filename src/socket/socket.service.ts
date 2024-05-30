import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets' ;
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'https://online-bookstore-zirf.onrender.com'
    }
})
@Injectable()
export class SocketService {
    @WebSocketServer()
    server: Server;

    sendMessage(msg: string): void {
        this.server.emit('catalogUpdated', msg);
    }

    @SubscribeMessage('catalogUpdated')
    handleMessage(msg: any): void {
        console.log('message: ', msg);
    }
}