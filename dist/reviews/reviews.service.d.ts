import { PrismaService } from '../prisma/prisma.service';
import { ReviewCreateDto } from './dto/review-create.dto';
import { Review } from "@prisma/client";
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReview(data: ReviewCreateDto): Promise<{
        id: number;
        bookId: number;
        content: string;
        createdAt: Date;
        userId: number;
    }>;
    findReviewsByBookId(bookId: number): Promise<{
        id: number;
        bookId: number;
        content: string;
        createdAt: Date;
        userId: number;
    }[]>;
    reviewsByBookId(bookId: number): Promise<Review[]>;
    deleteReview(id: number): Promise<{
        id: number;
        bookId: number;
        content: string;
        createdAt: Date;
        userId: number;
    }>;
}
