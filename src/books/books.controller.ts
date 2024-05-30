import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BooksService } from './books.service';
import {BookCreateDto, BookUpdateDto} from './dto/dto';
import { BookDto } from './dto/dto';
import {Book} from "@prisma/client";

@ApiTags('books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully created', type: BookDto })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async create(@Body() createBookDto: BookCreateDto): Promise<BookDto> {
        const book = await this.booksService.createBook(createBookDto);
        return this.toBookDto(book);
    }

    @Get()
    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'Return all books', type: [BookDto] })
    async findAll(@Query('page') page: string): Promise<BookDto[]> {
        const books = await this.booksService.findBooksByPage(page);
        return books.map(book => this.toBookDto(book));
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get a book by id' })
    @ApiResponse({ status: 200, description: 'Return a single book', type: BookDto })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async findOne(@Param('id') id: string): Promise<BookDto> {
        const book = await this.booksService.bookById(+id);
        return this.toBookDto(book);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a book' })
    @ApiResponse({ status: 200, description: 'The book has been successfully updated', type: BookDto })
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() bookUpdateDto: BookUpdateDto): Promise<BookDto> {
        const book = await this.booksService.updateBook(+id, bookUpdateDto);
        return this.toBookDto(book);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book' })
    @ApiResponse({ status: 200, description: 'The book has been successfully deleted' })
    @ApiBearerAuth()
    async remove(@Param('id') id: string): Promise<void> {
        await this.booksService.deleteBook(+id);
    }

    private toBookDto(book: Book): BookDto {
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
}