"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Auth0Strategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth0Strategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_auth0_1 = require("passport-auth0");
const common_2 = require("@nestjs/common");
let Auth0Strategy = Auth0Strategy_1 = class Auth0Strategy extends (0, passport_1.PassportStrategy)(passport_auth0_1.Strategy, 'auth0') {
    constructor() {
        super({
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            domain: process.env.AUTH0_DOMAIN,
            callbackURL: process.env.AUTH0_CALLBACK_URL,
            scope: 'openid email profile',
        });
        this.logger = new common_2.Logger(Auth0Strategy_1.name);
    }
    async validate(accessToken, refreshToken, extraParams, profile, done) {
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
};
exports.Auth0Strategy = Auth0Strategy;
exports.Auth0Strategy = Auth0Strategy = Auth0Strategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Auth0Strategy);
//# sourceMappingURL=auth0.strategy.js.map