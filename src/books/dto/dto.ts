import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsOptional, IsString, Min, IsNumber } from 'class-validator';

export class BookCreateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    price: number;

    @ApiProperty({ required: false })
    coverImage: string;

    @ApiProperty({ default: false })
    isNewRelease: boolean;

    @ApiProperty({ default: false })
    weeklyTop: boolean;
}


export class BookUpdateDto {
    @ApiPropertyOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional()
    @IsString()
    author?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiPropertyOptional({ required: false })
    coverImage?: string;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    isNewRelease?: boolean;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    weeklyTop?: boolean;
}

export class BookDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    price: number;

    @ApiProperty({ required: false })
    coverImage?: string;

    @ApiProperty({ default: false })
    isNewRelease: boolean;

    @ApiProperty({ default: false })
    weeklyTop: boolean;
}