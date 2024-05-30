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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const books_service_1 = require("./books.service");
const dto_1 = require("./dto/dto");
const dto_2 = require("./dto/dto");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async create(createBookDto) {
        const book = await this.booksService.createBook(createBookDto);
        return this.toBookDto(book);
    }
    async findAll(page) {
        const books = await this.booksService.findBooksByPage(page);
        return books.map(book => this.toBookDto(book));
    }
    async findOne(id) {
        const book = await this.booksService.bookById(+id);
        return this.toBookDto(book);
    }
    async update(id, bookUpdateDto) {
        const book = await this.booksService.updateBook(+id, bookUpdateDto);
        return this.toBookDto(book);
    }
    async remove(id) {
        await this.booksService.deleteBook(+id);
    }
    toBookDto(book) {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            coverImage: book.coverImage,
            isNewRelease: book.isNewRelease,
            weeklyTop: book.weeklyTop,
        };
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The book has been successfully created', type: dto_2.BookDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BookCreateDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all books', type: [dto_2.BookDto] }),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single book', type: dto_2.BookDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Book not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The book has been successfully updated', type: dto_2.BookDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.BookUpdateDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The book has been successfully deleted' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "remove", null);
exports.BooksController = BooksController = __decorate([
    (0, swagger_1.ApiTags)('books'),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map