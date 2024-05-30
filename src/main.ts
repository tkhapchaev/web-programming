import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from '@nestjs/common';
import * as session from "express-session";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { engine } from "express-handlebars";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AuthMiddleware } from "./auth/auth.middleware";
import * as process from "process";

async function bootstrap() {
    require('dotenv').config()

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.PORT;

    app.enableCors({
        origin: "https://online-bookstore-zirf.onrender.com",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Example API')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('example')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.engine(
        "hbs",
        engine({
            extname: ".hbs",
            layoutsDir: join(__dirname, "..", "views/layouts"),
            partialsDir: join(__dirname, "..", "views/partials"),
            defaultLayout: "main",
        }),
    );
    app.setViewEngine("hbs");

    app.use(
        session({
            secret: "1234",
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(new AuthMiddleware().use);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    }));

    await app.listen(port);
}

bootstrap();
