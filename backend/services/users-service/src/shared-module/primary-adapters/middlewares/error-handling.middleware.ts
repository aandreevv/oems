import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { v4 } from 'uuid';
import { ErrorResponse } from '../../application/responses/error.response';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException, RpcException)
export class ErrorHandlingMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const id = v4();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: any = exception.response?.message || exception.message;
    const detail = exception?.detail;
    const errorName = exception.response?.error;

    console.log(exception);
    if (exception instanceof QueryFailedError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      messages = detail || exception.message;
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      messages = exception.message;
    }

    if (Array.isArray(messages)) messages = messages.flat();

    const body: ErrorResponse = {
      errorId: id,
      error: errorName,
      code: status,
      messages,
    };

    response.status(status).send(body);
  }
}
