import { PrismaService } from '../prisma/prisma.service';
import { BookCreateDto, BookUpdateDto } from './dto/dto';
import { Book } from "@prisma/client";
import { SocketService } from "../socket/socket.service";
export declare class BooksService {
    private prisma;
    private readonly webSocketService;
    constructor(prisma: PrismaService, webSocketService: SocketService);
    createBook(data: BookCreateDto): Promise<{
        id: number;
        title: string;
        author: string;
        price: number;
        coverImage: string;
        createdAt: Date;
        updatedAt: Date;
        isNewRelease: boolean;
        weeklyTop: boolean;
    }>;
    findAllBooks(): Promise<Book[]>;
    findBookByTitleAndAuthor(title: string, author: string): Promise<Book | null>;
    findBooksByPage(page: string): Promise<Book[]>;
    findBookById(id: number): Promise<{
        id: number;
        title: string;
        author: string;
        price: number;
        coverImage: string;
        createdAt: Date;
        updatedAt: Date;
        isNewRelease: boolean;
        weeklyTop: boolean;
    }>;
    updateBook(id: number, data: BookUpdateDto): Promise<Book>;
    deleteBook(id: number): Promise<{
        id: number;
        title: string;
        author: string;
        price: number;
        coverImage: string;
        createdAt: Date;
        updatedAt: Date;
        isNewRelease: boolean;
        weeklyTop: boolean;
    }>;
    bookById(id: number): Promise<Book | null>;
    books(): Promise<Book[]>;
    sendNotification(): Promise<void>;
}
