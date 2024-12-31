import { AccountEntity } from '../entities/account.entity';
import { AccountResponse } from '../responses/account.response';
import { ProfileMapper } from './profile.mapper';
import { ProfileEntity } from '../entities/profile.entity';
import { EditAccountRequest } from '../requests/edit-account.request';
import { ProfileDataInterface } from '../interfaces/profile-data.interface';
import { EditAccountInterface } from '../interfaces/edit-account.interface';

export class AccountMapper {
  static requestToGetResponse(account: AccountEntity, data?: ProfileDataInterface): AccountResponse {
    return {
      id: account.id,
      email: account.email,
      profile: account.profile && ProfileMapper.requestToGetResponse(account.profile, data),
    };
  }

  static requestToGetResponseReversed(profile: ProfileEntity): AccountResponse {
    const { account } = profile;
    return this.requestToGetResponse({ ...account, profile });
  }

  static requestToEdit(entity: AccountEntity, body: EditAccountInterface): AccountEntity {
    const updated = new AccountEntity();

    updated.id = entity.id;
    updated.email = body.email ?? entity.email;
    updated.profile = ProfileMapper.requestToEdit(entity.profile, body.profile);

    return updated;
  }
}
