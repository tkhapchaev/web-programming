import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ReviewRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    book: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
}

export class ReviewCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    bookId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
}

export class ReviewDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    bookId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
}
