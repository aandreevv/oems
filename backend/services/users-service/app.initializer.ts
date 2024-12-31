import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

export function initApi(app: NestExpressApplication) {
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: [{ path: 'health', method: RequestMethod.GET }] });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}
