import { Module } from '@nestjs/common'
import { WebSocketGateway} from '@nestjs/websockets';
import { SocketService } from './socket.service';

@WebSocketGateway()
@Module({
    providers: [SocketService],
    exports: [SocketService]
})
export class SocketModule {}