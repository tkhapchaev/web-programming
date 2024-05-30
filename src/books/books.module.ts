import {Module} from "@nestjs/common";
import {BooksService} from "./books.service";
import {BooksController} from "./books.controller";
import {PrismaModule} from "../prisma/prisma.module";
import {SocketModule} from "../socket/socket.module";

@Module({
    imports: [PrismaModule, SocketModule],
    providers: [BooksService],
    controllers: [BooksController],
    exports: [BooksService]
})
export class BooksModule {}