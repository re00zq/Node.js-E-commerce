import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppService } from './app.service';
import authConfig from './config/authConfig';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return authConfig();
  }

  @Get('/hello')
  async getI18nHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
  }
}
