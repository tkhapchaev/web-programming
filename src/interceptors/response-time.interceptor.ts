import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Response } from "express";
import { tap } from "rxjs/operators";

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const now = process.hrtime.bigint();

        return next.handle().pipe(
            tap(() => {
                const res = context.switchToHttp().getResponse<Response>();
                if (!res.headersSent) {
                    const deltaTime = Number(process.hrtime.bigint() - now) / 1000000;
                    res.setHeader("X-Response-Time", `${deltaTime.toFixed(3)} ms`);
                }
            }),
        );
    }
}
