import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class OrderCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString({ each: true })
    items: string[];
}

export class OrderDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    items: string;
}

