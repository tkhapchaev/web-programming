import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from './prisma/prisma.service';
import { BooksService } from './books/books.service';
import { ReviewsService } from './reviews/reviews.service';
import { BooksController } from './books/books.controller';
import { ReviewsController } from './reviews/reviews.controller';
import {UsersService} from "./users/users.service";
import {UsersController} from "./users/users.controller";
import { PassportModule } from '@nestjs/passport';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseTimeInterceptor } from "./interceptors/response-time.interceptor";
import {OrdersController} from "./orders/orders.controller";
import {OrdersService} from "./orders/orders.service";
import {SocketModule} from "./socket/socket.module";
import {BooksModule} from "./books/books.module";
import {ReviewsModule} from "./reviews/reviews.module";
import {UsersModule} from "./users/users.module";
import {OrdersModule} from "./orders/orders.module";

@Module({
  imports: [AuthModule, PassportModule, SocketModule, BooksModule, ReviewsModule, UsersModule, OrdersModule],
  controllers: [AppController, BooksController, ReviewsController, UsersController, OrdersController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
    PrismaService,
    BooksService,
    ReviewsService,
    UsersService,
    OrdersService,
  ],
})
export class AppModule {}