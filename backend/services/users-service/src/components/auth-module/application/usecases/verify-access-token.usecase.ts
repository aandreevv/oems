import { Injectable } from '@nestjs/common';
import { AccountRepositoryPort } from '../../../account-module/ports/account-repository.port';
import { TokenServicePort } from '../../ports/token-service.port';
import { TokenType } from '../data/enums/token-type.enum';
import { VerifyTokenRequest } from '../data/requests/verify-token.request';
import { AccountInterface } from '../../../account-module/application/data/interfaces/account.interface';

@Injectable()
export class VerifyAccessToken {
  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute({ token }: VerifyTokenRequest): Promise<AccountInterface> {
    const { userId } = this.tokenService.verify(token, TokenType.ACCESS);
    const { password, ...account } = await this.accountRepository.findById(userId);
    return account as AccountInterface;
  }
}
