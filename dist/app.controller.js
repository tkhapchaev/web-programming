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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth/auth.service");
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    async getIndexPage(req) {
        const startTime = process.hrtime();
        const isUserLoggedIn = !!req.session.user;
        const userName = isUserLoggedIn ? req.session.user.email : '';
        const endTime = process.hrtime(startTime);
        const renderTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
        return {
            isUserLoggedIn,
            userName: isUserLoggedIn ? req.session.user.email : '',
            renderTime,
            title: 'Главная | Читай.ru',
        };
    }
    getAboutPage() {
        return {
            title: 'О нас | Читай.ru',
        };
    }
    getCatalogPage() {
        return {
            title: 'Каталог | Читай.ru',
        };
    }
    getContactsPage() {
        return {
            title: 'Контакты | Читай.ru',
        };
    }
    getFeedbackPage() {
        return {
            title: 'Отзывы | Читай.ru',
        };
    }
    getCartPage() {
        return {
            title: 'Корзина | Читай.ru',
        };
    }
    getTopWeekPage() {
        return {
            title: 'Лучшее за неделю | Читай.ru',
        };
    }
    login(req, res) {
        res.redirect('/');
    }
    async callback(req, session, res) {
        session.user = req.user;
        const user = await this.authService.validateUser(req.user.auth0Id, req.user.email, req.user.name);
        session.userId = user.id;
        res.redirect('/');
    }
    getStatus(req, res) {
        if (req.session.user) {
            res.json({
                isAuthenticated: true,
                user: req.session.user,
                userId: req.session.userId
            });
        }
        else {
            res.json({ isAuthenticated: false });
        }
    }
    logout(req, res) {
        req.session.destroy((err) => {
            if (err)
                console.log(err);
            res.redirect('/');
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getIndexPage", null);
__decorate([
    (0, common_1.Get)('/about-us'),
    (0, common_1.Render)('about-us'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAboutPage", null);
__decorate([
    (0, common_1.Get)('/catalog'),
    (0, common_1.Render)('catalog'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCatalogPage", null);
__decorate([
    (0, common_1.Get)('/contacts'),
    (0, common_1.Render)('contacts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContactsPage", null);
__decorate([
    (0, common_1.Get)('/feedback'),
    (0, common_1.Render)('feedback'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFeedbackPage", null);
__decorate([
    (0, common_1.Get)('/cart'),
    (0, common_1.Render)('cart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCartPage", null);
__decorate([
    (0, common_1.Get)('/top-of-the-week'),
    (0, common_1.Render)('top-of-the-week'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTopWeekPage", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('auth0')),
    (0, common_1.Get)('auth/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('auth/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('auth0')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Session)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('auth/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('auth/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "logout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map