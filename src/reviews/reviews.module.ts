import {Module} from "@nestjs/common";
import {ReviewsService} from "./reviews.service";
import {ReviewsController} from "./reviews.controller";
import {PrismaModule} from "../prisma/prisma.module";
import {BooksModule} from "../books/books.module";

@Module({
    imports: [PrismaModule, BooksModule],
    providers: [ReviewsService],
    controllers: [ReviewsController],
    exports: [ReviewsService]
})
export class ReviewsModule {}