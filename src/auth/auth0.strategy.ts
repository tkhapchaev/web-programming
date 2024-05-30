import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { Logger } from '@nestjs/common';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
    private readonly logger = new Logger(Auth0Strategy.name);

    constructor() {
        super({
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            domain: process.env.AUTH0_DOMAIN,
            callbackURL: process.env.AUTH0_CALLBACK_URL,
            scope: 'openid email profile',
        });
    }

    async validate(accessToken: string, refreshToken: string, extraParams: any, profile: any, done: Function): Promise<any> {
        this.logger.debug(`Access Token: ${accessToken}`);
        this.logger.debug(`Refresh Token: ${refreshToken}`);
        this.logger.debug(`Profile: ${JSON.stringify(profile)}`);

        const { sub, email, nickname } = profile._json;

        if (!email) {
            this.logger.error('No email found in user profile');
            return done(new Error('No email found in user profile'), null);
        }

        const user = {
            auth0Id: sub,
            email: email,
            name: nickname
        };

        this.logger.debug(`User constructed from profile: ${JSON.stringify(user)}`);
        done(null, user);
    }
}
