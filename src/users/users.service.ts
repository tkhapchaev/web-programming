import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './dto/dto';
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: UserCreateDto): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async updateUser(id: number, data: UserUpdateDto): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Cannot update user with ID ${id}`);
        }
    }

    async deleteUser(id: number) {
        try {
            return await this.prisma.user.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Cannot delete user with ID ${id}`);
        }
    }
}
