import { ReviewsService } from './reviews.service';
import { BooksService } from '../books/books.service';
import { ReviewDto, ReviewRequestDto } from './dto/review-create.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    private readonly booksService;
    constructor(reviewsService: ReviewsService, booksService: BooksService);
    createReview(reviewData: ReviewRequestDto): Promise<ReviewDto>;
    getReviewsByBookId(bookId: string): Promise<ReviewDto[]>;
    deleteReview(id: string): Promise<void>;
    private toReviewDto;
}
