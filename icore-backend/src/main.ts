import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3001', 'https://theicore.org'], // Allow only your Next.js app to access the API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204, // Some legacy browsers choke on 204
  };

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
