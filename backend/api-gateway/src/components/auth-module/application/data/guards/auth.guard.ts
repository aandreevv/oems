import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthenticatedAccountResponse } from '../responses/authenticated-account.response';
import { UsersService } from 'src/shared-module/secondary-adapters/microservices/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext): Observable<boolean> | boolean {
    const request = context.getType() === 'http' ? context.switchToHttp().getRequest() : context.switchToRpc().getContext();
    const authorization = request.headers['authorization'];
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) return false;
    return this.usersService.verifyAccessToken(token).pipe(
      map((res: AuthenticatedAccountResponse) => {
        this.addUserToRequest(res, context);
        return true;
      }),
    );
  }

  addUserToRequest(account: AuthenticatedAccountResponse, context: ExecutionContext): void {
    const request = context.getType() === 'rpc' ? context.switchToHttp().getRequest() : context.switchToRpc().getData();
    request.user = account;
  }
}
