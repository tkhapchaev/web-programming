import { Strategy } from 'passport-auth0';
declare const Auth0Strategy_base: new (...args: any[]) => Strategy;
export declare class Auth0Strategy extends Auth0Strategy_base {
    private readonly logger;
    constructor();
    validate(accessToken: string, refreshToken: string, extraParams: any, profile: any, done: Function): Promise<any>;
}
export {};
