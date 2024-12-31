import { ConflictException, Injectable } from '@nestjs/common';
import { ProfileRepositoryPort } from '../../../account-module/ports/profile-repository.port';
import { CreateProfileRequest } from '../../../account-module/application/data/requests/create-profile.request';
import { AccountResponse } from '../../../account-module/application/data/responses/account.response';
import { AccountMapper } from '../../../account-module/application/data/mappers/account.mapper';
import { AccountRepositoryPort } from '../../../account-module/ports/account-repository.port';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_ALREADY_CONFIGURED } from '../../../../exceptions';

@Injectable()
export class SetupProfile {
  constructor(
    private readonly profileRepository: ProfileRepositoryPort,
    private readonly accountRepositoryPort: AccountRepositoryPort,
  ) {}

  async execute(body: CreateProfileRequest): Promise<AccountResponse> {
    const account = await this.accountRepositoryPort.findById(body.accountId);
    if (account.profile) throw new RpcException(new ConflictException(ACCOUNT_IS_ALREADY_CONFIGURED));
    const profile = await this.profileRepository.create(body, account);
    return AccountMapper.requestToGetResponse({ ...account, profile });
  }
}
