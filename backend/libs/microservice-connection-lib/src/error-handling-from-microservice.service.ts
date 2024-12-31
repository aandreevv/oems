import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ErrorHandlingFromMicroserviceService {
  handleError(error: any): Observable<never> {
    return throwError(() => new RpcException(error.response));
  }
}
