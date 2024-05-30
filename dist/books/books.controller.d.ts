import { BooksService } from './books.service';
import { BookCreateDto, BookUpdateDto } from './dto/dto';
import { BookDto } from './dto/dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: BookCreateDto): Promise<BookDto>;
    findAll(page: string): Promise<BookDto[]>;
    findOne(id: string): Promise<BookDto>;
    update(id: string, bookUpdateDto: BookUpdateDto): Promise<BookDto>;
    remove(id: string): Promise<void>;
    private toBookDto;
}
