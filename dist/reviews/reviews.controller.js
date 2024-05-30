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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const books_service_1 = require("../books/books.service");
const review_create_dto_1 = require("./dto/review-create.dto");
const swagger_1 = require("@nestjs/swagger");
let ReviewsController = class ReviewsController {
    constructor(reviewsService, booksService) {
        this.reviewsService = reviewsService;
        this.booksService = booksService;
    }
    async createReview(reviewData) {
        console.log('Attempting to find book by:', reviewData.book, 'and author:', reviewData.author);
        const book = await this.booksService.findBookByTitleAndAuthor(reviewData.book, reviewData.author);
        if (!book) {
            console.error(`Book with title ${reviewData.book} and author ${reviewData.author} not found`);
            throw new common_1.NotFoundException(`Book with title ${reviewData.book} and author ${reviewData.author} not found`);
        }
        const newReviewData = {
            bookId: book.id,
            content: reviewData.content,
            userId: reviewData.userId
        };
        const review = await this.reviewsService.createReview(newReviewData);
        return this.toReviewDto(review);
    }
    async getReviewsByBookId(bookId) {
        const reviews = await this.reviewsService.reviewsByBookId(+bookId);
        if (!reviews.length) {
            throw new common_1.NotFoundException(`No reviews found for book with ID ${bookId}`);
        }
        return reviews.map(review => this.toReviewDto(review));
    }
    async deleteReview(id) {
        await this.reviewsService.deleteReview(+id);
    }
    toReviewDto(review) {
        return {
            id: review.id,
            bookId: review.bookId,
            content: review.content,
            userId: review.userId
        };
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_create_dto_1.ReviewRequestDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a bookid for review request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.Get)('book/:bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewsByBookId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "deleteReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService,
        books_service_1.BooksService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map