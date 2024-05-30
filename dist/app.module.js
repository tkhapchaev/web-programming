"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const books_service_1 = require("./books/books.service");
const reviews_service_1 = require("./reviews/reviews.service");
const books_controller_1 = require("./books/books.controller");
const reviews_controller_1 = require("./reviews/reviews.controller");
const users_service_1 = require("./users/users.service");
const users_controller_1 = require("./users/users.controller");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const response_time_interceptor_1 = require("./interceptors/response-time.interceptor");
const orders_controller_1 = require("./orders/orders.controller");
const orders_service_1 = require("./orders/orders.service");
const socket_module_1 = require("./socket/socket.module");
const books_module_1 = require("./books/books.module");
const reviews_module_1 = require("./reviews/reviews.module");
const users_module_1 = require("./users/users.module");
const orders_module_1 = require("./orders/orders.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, passport_1.PassportModule, socket_module_1.SocketModule, books_module_1.BooksModule, reviews_module_1.ReviewsModule, users_module_1.UsersModule, orders_module_1.OrdersModule],
        controllers: [app_controller_1.AppController, books_controller_1.BooksController, reviews_controller_1.ReviewsController, users_controller_1.UsersController, orders_controller_1.OrdersController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_time_interceptor_1.ResponseTimeInterceptor,
            },
            prisma_service_1.PrismaService,
            books_service_1.BooksService,
            reviews_service_1.ReviewsService,
            users_service_1.UsersService,
            orders_service_1.OrdersService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map