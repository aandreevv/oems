import { Injectable } from '@nestjs/common';
import { TokenRepositoryPort } from '../../ports/token-repository.port';
import { AuthTokensResponse } from '../data/responses/auth-tokens.response';
import { TokenServicePort } from '../../ports/token-service.port';
import { AccountEntity } from '../../../account-module/application/data/entities/account.entity';
import { ITokenPayload } from '../data/interfaces/token-payload.interface';
import { TokenType } from '../data/enums/token-type.enum';

import * as crypto from 'node:crypto';

@Injectable()
export class GenerateAuthTokens {
  constructor(
    private readonly tokenRepository: TokenRepositoryPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(account: AccountEntity): Promise<AuthTokensResponse> {
    const payload: ITokenPayload = { userId: account.id };
    const accessToken = this.tokenService.sign(payload, TokenType.ACCESS);
    const refreshToken = this.tokenService.sign(payload, TokenType.REFRESH);
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await this.tokenRepository.save(hashedRefreshToken, account);
    return { accessToken, refreshToken };
  }
}
