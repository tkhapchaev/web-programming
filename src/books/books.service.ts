import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookCreateDto, BookUpdateDto } from './dto/dto';
import {Book} from "@prisma/client";
import {SocketService} from "../socket/socket.service";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService, private readonly webSocketService: SocketService) {}

    async createBook(data: BookCreateDto) {
        await this.sendNotification();
        return this.prisma.book.create({ data });
    }

    async findAllBooks(): Promise<Book[]> {
        return this.prisma.book.findMany();
    }

    async findBookByTitleAndAuthor(title: string, author: string): Promise<Book | null> {
        return this.prisma.book.findFirst({
            where: {
                title,
                author
            }
        });
    }

    async findBooksByPage(page: string): Promise<Book[]> {
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

    async findBookById(id: number) {
        const book = await this.prisma.book.findUnique({
            where: { id },
        });
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async updateBook(id: number, data: BookUpdateDto): Promise<Book> {
        await this.sendNotification();

        return this.prisma.book.update({
            where: { id },
            data,
        });
    }

    async deleteBook(id: number) {
        try {
            await this.sendNotification();

            return await this.prisma.book.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Cannot delete book with ID ${id}`);
        }
    }

    async bookById(id: number): Promise<Book | null> {
        return this.prisma.book.findUnique({
            where: { id },
        });
    }

    async books(): Promise<Book[]> {
        return this.prisma.book.findMany();
    }

    async sendNotification() {
        this.webSocketService.sendMessage('Внесены изменения в книжный каталог. Пожалуйста, обновите страницу.');
    }
}