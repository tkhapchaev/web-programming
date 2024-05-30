"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTimeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseTimeInterceptor = class ResponseTimeInterceptor {
    intercept(context, next) {
        const now = process.hrtime.bigint();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const res = context.switchToHttp().getResponse();
            if (!res.headersSent) {
                const deltaTime = Number(process.hrtime.bigint() - now) / 1000000;
                res.setHeader("X-Response-Time", `${deltaTime.toFixed(3)} ms`);
            }
        }));
    }
};
exports.ResponseTimeInterceptor = ResponseTimeInterceptor;
exports.ResponseTimeInterceptor = ResponseTimeInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseTimeInterceptor);
//# sourceMappingURL=response-time.interceptor.js.map