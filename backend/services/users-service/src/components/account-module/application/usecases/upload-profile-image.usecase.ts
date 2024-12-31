import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { UploadsService } from '../../../../shared-module/secondary-adapters/microservices/uploads.service';
import { UploadProfileImageRequest } from '../data/requests/upload-profile-image.request';
import { AccountResponse } from '../data/responses/account.response';
import { firstValueFrom } from 'rxjs';
import { AccountMapper } from '../data/mappers/account.mapper';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';

@Injectable()
export class UploadProfileImage {
  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly uploadsService: UploadsService,
  ) {}

  async execute(body: UploadProfileImageRequest): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(body.accountId);
    if (!account) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    const { path } = await firstValueFrom(this.uploadsService.uploadFile(body));
    const updatedAccount = await this.accountRepository.save(AccountMapper.requestToEdit(account, { profile: { picture: path } }));
    return AccountMapper.requestToGetResponse(updatedAccount);
  }
}
