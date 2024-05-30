"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const socket_service_1 = require("../socket/socket.service");
let BooksService = class BooksService {
    constructor(prisma, webSocketService) {
        this.prisma = prisma;
        this.webSocketService = webSocketService;
    }
    async createBook(data) {
        await this.sendNotification();
        return this.prisma.book.create({ data });
    }
    async findAllBooks() {
        return this.prisma.book.findMany();
    }
    async findBookByTitleAndAuthor(title, author) {
        return this.prisma.book.findFirst({
            where: {
                title,
                author
            }
        });
    }
    async findBooksByPage(page) {
        switch (page) {
            case 'index':
                return this.prisma.book.findMany({
                    where: { isNewRelease: true }
                });
            case 'catalog':
                return this.prisma.book.findMany();
            case 'top-of-the-week':
                return this.prisma.book.findMany({
                    where: { weeklyTop: true }
                });
            default:
                return this.prisma.book.findMany();
        }
    }
    async findBookById(id) {
        const book = await this.prisma.book.findUnique({
            where: { id },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async updateBook(id, data) {
        await this.sendNotification();
        return this.prisma.book.update({
            where: { id },
            data,
        });
    }
    async deleteBook(id) {
        try {
            await this.sendNotification();
            return await this.prisma.book.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot delete book with ID ${id}`);
        }
    }
    async bookById(id) {
        return this.prisma.book.findUnique({
            where: { id },
        });
    }
    async books() {
        return this.prisma.book.findMany();
    }
    async sendNotification() {
        this.webSocketService.sendMessage('Внесены изменения в книжный каталог. Пожалуйста, обновите страницу.');
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, socket_service_1.SocketService])
], BooksService);
//# sourceMappingURL=books.service.js.map