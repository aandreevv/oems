import { Injectable } from '@nestjs/common';
import { AccountRepositoryPort } from '../../../account-module/ports/account-repository.port';
import { TokenServicePort } from '../../ports/token-service.port';
import { RefreshTokensRequest } from '../data/requests/refresh-tokens.request';
import { AuthTokensResponse } from '../data/responses/auth-tokens.response';
import { TokenType } from '../data/enums/token-type.enum';
import * as crypto from 'node:crypto';
import { TokenRepositoryPort } from '../../ports/token-repository.port';
import { GenerateAuthTokens } from './generate-auth-tokens.usecase';

@Injectable()
export class RefreshTokens {
  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly tokenService: TokenServicePort,
    private readonly tokenRepository: TokenRepositoryPort,
    private readonly generateAuthTokens: GenerateAuthTokens,
  ) {}

  async execute({ token }: RefreshTokensRequest): Promise<AuthTokensResponse> {
    const { userId } = this.tokenService.verify(token, TokenType.REFRESH);
    const account = await this.accountRepository.findById(userId);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    await this.tokenRepository.delete(tokenHash, account);
    return this.generateAuthTokens.execute(account);
  }
}
