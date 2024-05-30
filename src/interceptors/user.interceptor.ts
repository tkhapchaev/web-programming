import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Render,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        const isUserLoggedIn = !!req.session?.user;
        const userName = isUserLoggedIn ? req.session.user.username : "";

        return {
          ...data,
          isUserLoggedIn,
          userName,
        };
      }),
    );
  }
}
