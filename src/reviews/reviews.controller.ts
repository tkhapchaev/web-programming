import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { BooksService } from '../books/books.service';
import { ReviewDto, ReviewCreateDto, ReviewRequestDto } from './dto/review-create.dto';
import { Review } from "@prisma/client";
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService,
        private readonly booksService: BooksService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a review' })
    @ApiResponse({ status: 201, description: 'Review created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async createReview(@Body() reviewData: ReviewRequestDto): Promise<ReviewDto> {
        console.log('Attempting to find book by:', reviewData.book, 'and author:', reviewData.author);
        const book = await this.booksService.findBookByTitleAndAuthor(reviewData.book, reviewData.author);
        if (!book) {
            console.error(`Book with title ${reviewData.book} and author ${reviewData.author} not found`);
            throw new NotFoundException(`Book with title ${reviewData.book} and author ${reviewData.author} not found`);
        }

        const newReviewData: ReviewCreateDto = {
            bookId: book.id,
            content: reviewData.content,
            userId: reviewData.userId
        };

        const review = await this.reviewsService.createReview(newReviewData);
        return this.toReviewDto(review);
    }
    @ApiOperation({ summary: 'Get a bookid for review request' })
    @ApiResponse({ status: 201, description: 'Review created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get('book/:bookId')
    async getReviewsByBookId(@Param('bookId') bookId: string): Promise<ReviewDto[]> {
        const reviews = await this.reviewsService.reviewsByBookId(+bookId);
        if (!reviews.length) {
            throw new NotFoundException(`No reviews found for book with ID ${bookId}`);
        }
        return reviews.map(review => this.toReviewDto(review));
    }
    @ApiOperation({ summary: 'Delete a review' })
    @ApiResponse({ status: 201, description: 'Review deleted successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Delete(':id')
    async deleteReview(@Param('id') id: string): Promise<void> {
        await this.reviewsService.deleteReview(+id);
    }

    private toReviewDto(review: Review): ReviewDto {
        return {
            id: review.id,
            bookId: review.bookId,
            content: review.content,
            userId: review.userId
        };
    }
}
