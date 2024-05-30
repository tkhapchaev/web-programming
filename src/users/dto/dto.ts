import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';


export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: "User's password (optional)" })
    @IsNotEmpty()
    @IsString()
    password?: string;
}

export class UserCreateDto {
    @ApiProperty({ description: "Auth0 unique identifier" })
    @IsNotEmpty()
    auth0Id: string;

    @ApiProperty({ description: "User's email address" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: "User's name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: "User's password (optional)" })
    @IsString()
    @IsOptional()
    @MinLength(6)
    password?: string;
}

export class UserUpdateDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}