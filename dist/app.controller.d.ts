import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from "./auth/auth.service";
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
    getIndexPage(req: Request): Promise<{
        isUserLoggedIn: boolean;
        userName: string;
        renderTime: string;
        title: string;
    }>;
    getAboutPage(): {
        title: string;
    };
    getCatalogPage(): {
        title: string;
    };
    getContactsPage(): {
        title: string;
    };
    getFeedbackPage(): {
        title: string;
    };
    getCartPage(): {
        title: string;
    };
    getTopWeekPage(): {
        title: string;
    };
    login(req: any, res: Response): any;
    callback(req: any, session: Record<string, any>, res: Response): Promise<void>;
    getStatus(req: any, res: Response): void;
    logout(req: Request, res: Response): void;
}
