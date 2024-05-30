import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './dto/dto';
import { User } from "@prisma/client";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: UserCreateDto): Promise<User>;
    getUserById(id: number): Promise<{
        id: number;
        auth0Id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: number, data: UserUpdateDto): Promise<User>;
    deleteUser(id: number): Promise<{
        id: number;
        auth0Id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
