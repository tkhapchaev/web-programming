import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService) {}

  async validateUser(auth0Id: string, email: string, name: string): Promise<User> {
    this.logger.debug(`Validating user: ${auth0Id}`);
    let user = await this.prisma.user.findUnique({ where: { auth0Id } });
    if (!user) {
      this.logger.debug(`Creating new user: ${email}`);
      user = await this.prisma.user.create({
        data: { auth0Id, email, name },
      });
    } else {
      this.logger.debug(`User found: ${user.id}`);
    }
    return user;
  }
}
