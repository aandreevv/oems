import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedAccountResponse } from '../../../components/auth-module/application/data/responses/authenticated-account.response';

export const AuthenticatedUser = createParamDecorator((_data, context: ExecutionContext): AuthenticatedAccountResponse => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});
