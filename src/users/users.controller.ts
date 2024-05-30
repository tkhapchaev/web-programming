import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserCreateDto, UserUpdateDto } from './dto/dto';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {User} from "@prisma/client";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBearerAuth()
    async createUser(@Body() userData: UserCreateDto): Promise<UserDto> {
        const user = await this.userService.createUser(userData);
        return this.toUserDto(user);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserById(@Param('id') id: string): Promise<UserDto> {
        const user = await this.userService.getUserById(+id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.toUserDto(user);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('auth0'))
    async updateUser(@Param('id') id: string, @Body() userData: UserUpdateDto): Promise<UserDto> {
        const user = await this.userService.updateUser(+id, userData);
        return this.toUserDto(user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('auth0'))
    async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUser(+id);
    }

    private toUserDto(user: User): UserDto {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            password: null
        };
    }
}
