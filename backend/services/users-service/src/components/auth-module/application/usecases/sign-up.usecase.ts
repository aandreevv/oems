import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpRequest } from '../data/requests/sign-up.request';
import { AuthTokensResponse } from '../data/responses/auth-tokens.response';
import { AccountRepositoryPort } from '../../../account-module/ports/account-repository.port';
import { GenerateAuthTokens } from './generate-auth-tokens.usecase';
import { USER_WITH_SUCH_EMAIL_ALREADY_EXISTS } from '../../../../exceptions';

import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';
import { AccountSignedUpInterface } from '../data/interfaces/account-signed-up.interface';

@Injectable()
export class SignUp {
  private readonly salt: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly accountRepository: AccountRepositoryPort,
    private readonly generateAuthTokens: GenerateAuthTokens,
  ) {
    this.salt = this.configService.get('salt');
  }

  async execute(signUpRequest: SignUpRequest): Promise<AccountSignedUpInterface> {
    const withSuchEmail = await this.accountRepository.findByEmail(signUpRequest.email);
    if (withSuchEmail) throw new RpcException(new ConflictException(USER_WITH_SUCH_EMAIL_ALREADY_EXISTS));
    const hashedPassword = await bcrypt.hash(signUpRequest.password, this.salt);
    const account = await this.accountRepository.save({ ...signUpRequest, password: hashedPassword });
    const { accessToken, refreshToken } = await this.generateAuthTokens.execute(account);
    return { accessToken, refreshToken, accountId: account.id };
  }
}
