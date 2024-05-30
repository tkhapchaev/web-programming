import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    validateUser(auth0Id: string, email: string, name: string): Promise<User>;
}
