"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const path_1 = require("path");
const express_handlebars_1 = require("express-handlebars");
const swagger_1 = require("@nestjs/swagger");
const auth_middleware_1 = require("./auth/auth.middleware");
const process = require("process");
async function bootstrap() {
    require('dotenv').config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT;
    app.enableCors({
        origin: "https://online-bookstore-zirf.onrender.com",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Example API')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('example')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.engine("hbs", (0, express_handlebars_1.engine)({
        extname: ".hbs",
        layoutsDir: (0, path_1.join)(__dirname, "..", "views/layouts"),
        partialsDir: (0, path_1.join)(__dirname, "..", "views/partials"),
        defaultLayout: "main",
    }));
    app.setViewEngine("hbs");
    app.use(session({
        secret: "1234",
        resave: false,
        saveUninitialized: false,
    }));
    app.use(new auth_middleware_1.AuthMiddleware().use);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map