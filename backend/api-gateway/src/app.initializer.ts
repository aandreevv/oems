import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from './constants/constants';

import * as swaggerStats from 'swagger-stats';
import * as basicAuth from 'express-basic-auth';

export function initApi(app: NestExpressApplication) {
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: [{ path: 'health', method: RequestMethod.GET }] });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

export function initDocs(app: NestExpressApplication) {
  const documentBuilder = new DocumentBuilder();

  const options = documentBuilder
    .setDescription('Online event management system documentation')
    .setTitle('Online event management system API')
    .setVersion(process.env.VERSION || '1.0.0')
    .addBearerAuth({ scheme: 'bearer', type: 'http' }, JWT_ACCESS_TOKEN)
    .addBearerAuth({ scheme: 'bearer', type: 'http' }, JWT_REFRESH_TOKEN)
    .build();

  const swagger = SwaggerModule.createDocument(app, options);

  app.use(
    swaggerStats.getMiddleware({
      uriPath: '/docs/stats',
      swaggerSpec: swagger,
      authentication: true,
      onAuthenticate: function (req, username, password) {
        return username === process.env.DOCS_USER && password === process.env.DOCS_PASSWORD;
      },
    }),
  );

  app.use(
    `/docs`,
    basicAuth({
      users: {
        [process.env.DOCS_USER || 'developer']: process.env.DOCS_PASSWORD || '12345',
      },
      challenge: true,
    }),
  );

  SwaggerModule.setup('docs', app, swagger, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
