import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { EditAccountRequest } from '../data/requests/edit-account.request';
import { AccountResponse } from '../data/responses/account.response';
import { AccountMapper } from '../data/mappers/account.mapper';
import { RpcException } from '@nestjs/microservices';
import {
  ACCOUNT_IS_NOT_FOUND,
  USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS,
  USER_WITH_SUCH_USERNAME_ALREADY_EXISTS,
} from '../../../../exceptions';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';

@Injectable()
export class EditProfile {
  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly profileRepository: ProfileRepositoryPort,
  ) {}

  async execute(body: EditAccountRequest): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(body.accountId);
    if (!account) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));

    if (body.profile?.username) {
      const withSuchUsername = await this.profileRepository.findByUsername(body.profile.username);
      if (withSuchUsername) throw new RpcException(new ConflictException(USER_WITH_SUCH_USERNAME_ALREADY_EXISTS));
    }

    if (body.profile?.phoneNumber) {
      const withSuchPhoneNumber = await this.profileRepository.findByPhoneNumber(body.profile.phoneNumber);
      if (withSuchPhoneNumber) throw new RpcException(new ConflictException(USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS));
    }

    const accountToEdit = AccountMapper.requestToEdit(account, { profile: body.profile });
    const updatedAccount = await this.accountRepository.save(accountToEdit);
    return AccountMapper.requestToGetResponse(updatedAccount);
  }
}
