import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth0Strategy } from './auth0.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'auth0' }),
        PrismaModule
    ],
    providers: [AuthService, Auth0Strategy],
    exports: [AuthService]
})
export class AuthModule {}
