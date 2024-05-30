import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isUserLoggedIn = !!req.session?.user;
    res.locals.isUserLoggedIn = isUserLoggedIn;
    res.locals.userName = isUserLoggedIn ? req.session.user.email : "";
    next();
  }
}
