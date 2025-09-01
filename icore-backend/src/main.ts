import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ICORE API')
    .setDescription('The API documentation for the ICORE project')
    .setVersion('1.0')
    .addTag('Development Version')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const frontendPublicUrl = process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000';
  const frontendAdminUrl = process.env.FRONTEND_ADMIN_URL || 'http://localhost:3001';

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'https://theicore.org', 'https://dev-portal.theicore.org','https://icore-steel.vercel.app'], // Allow only your Next.js app to access the API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
