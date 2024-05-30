import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewCreateDto } from './dto/review-create.dto';
import {Prisma, Review} from "@prisma/client";

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) {}

    async createReview(data: ReviewCreateDto) {
        try {
            console.log('Creating review with data:', data);
            return this.prisma.review.create({ data });
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    }
    async findReviewsByBookId(bookId: number) {
        return this.prisma.review.findMany({
            where: { bookId },
        });
    }
    async reviewsByBookId(bookId: number): Promise<Review[]> {
        return this.prisma.review.findMany({
            where: { bookId },
        });
    }

    async deleteReview(id: number) {
        try {
            return await this.prisma.review.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Cannot delete review with ID ${id}`);
        }
    }
}
