import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import serverConfig from './config/serverConfig';
import { JSendInterceptor } from './common/interceptors/jsend.interceptor';
import { JSendExceptionFilter } from './common/filters/jsend-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new I18nValidationPipe());

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  app.useGlobalInterceptors(new JSendInterceptor());
  app.useGlobalFilters(new JSendExceptionFilter());
  await app.listen(serverConfig().port);
}
bootstrap();
