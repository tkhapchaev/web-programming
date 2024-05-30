import {Controller, Get, Post, Render, Req, Res, Session, UseGuards} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService
  ) {}


  @Get('/')
  @Render('index')
  async getIndexPage(@Req() req: Request) {
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
  @Get('/about-us')
  @Render('about-us')
  getAboutPage() {
    return {
      title: 'О нас | Читай.ru',
    };
  }
  @Get('/catalog')
  @Render('catalog')
  getCatalogPage() {
    return {
      title: 'Каталог | Читай.ru',
    };
  }
  @Get('/contacts')
  @Render('contacts')
  getContactsPage() {
    return {
      title: 'Контакты | Читай.ru',
    };
  }
  @Get('/feedback')
  @Render('feedback')
  getFeedbackPage() {
    return {
      title: 'Отзывы | Читай.ru',
    };
  }

  @Get('/cart')
  @Render('cart')
  getCartPage() {
    return {
      title: 'Корзина | Читай.ru',
    };
  }

  @Get('/top-of-the-week')
  @Render('top-of-the-week')
  getTopWeekPage() {
    return {
      title: 'Лучшее за неделю | Читай.ru',
    };
  }
  @UseGuards(AuthGuard('auth0'))
  @Get('auth/login')
  login(@Req() req, @Res() res: Response): any {
    res.redirect('/');
  }

  @Get('auth/callback')
  @UseGuards(AuthGuard('auth0'))
  async callback(@Req() req, @Session() session: Record<string, any>, @Res() res: Response) {
    session.user = req.user;
    const user = await this.authService.validateUser(req.user.auth0Id, req.user.email, req.user.name);
    session.userId = user.id;
    res.redirect('/');
  }


  @Get('auth/status')
  getStatus(@Req() req, @Res() res: Response) {
    if (req.session.user) {
      res.json({
        isAuthenticated: true,
        user: req.session.user,
        userId: req.session.userId
      });
    } else {
      res.json({ isAuthenticated: false });
    }
  }

  @Post('auth/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      res.redirect('/');
    });
  }
}
