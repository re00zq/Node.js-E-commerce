import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverConfig from './config/serverConfig';
import { JSendInterceptor } from './common/interceptors/jsend.interceptor';
import { JSendExceptionFilter } from './common/filters/jsend-exception.filter';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalInterceptors(new JSendInterceptor());

  await app.listen(serverConfig().port);
}
bootstrap();
