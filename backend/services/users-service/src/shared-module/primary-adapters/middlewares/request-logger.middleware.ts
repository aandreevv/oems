import { Catch, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Catch()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP Request');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, params } = req;

    res.on('close', () => {
      const { statusCode } = res;

      this.logger.log(`Method: "${method}" Path: "${params[0]}" Code: "${statusCode}"`);
    });

    next();
  }
}
