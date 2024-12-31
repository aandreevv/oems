import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenerateAuthTokens } from './generate-auth-tokens.usecase';
import { AccountRepositoryPort } from '../../../account-module/ports/account-repository.port';
import { SignInRequest } from '../data/requests/sign-in.request';
import { AuthTokensResponse } from '../data/responses/auth-tokens.response';

import * as bcrypt from 'bcryptjs';
import { PASSWORD_IS_INVALID, USER_WITH_SUCH_EMAIL_IS_NOT_FOUND } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SignIn {
  constructor(
    private readonly generateAuthTokens: GenerateAuthTokens,
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  async execute(signInRequest: SignInRequest): Promise<AuthTokensResponse> {
    const account = await this.accountRepository.findByEmail(signInRequest.email);
    if (!account) throw new RpcException(new NotFoundException(USER_WITH_SUCH_EMAIL_IS_NOT_FOUND));
    const isPasswordValid = await bcrypt.compare(signInRequest.password, account.password);
    if (!isPasswordValid) throw new RpcException(new BadRequestException(PASSWORD_IS_INVALID));
    return this.generateAuthTokens.execute(account);
  }
}
