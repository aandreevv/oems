import { ProfileEntity } from '../entities/profile.entity';
import { ProfileResponse } from '../responses/profile.response';
import { EditProfileRequest } from '../requests/edit-profile.request';
import { USERS_STORAGE } from '../../../../../constants/constants';
import { ProfileDataInterface } from '../interfaces/profile-data.interface';

export class ProfileMapper {
  static requestToGetResponse(entity: ProfileEntity, data?: ProfileDataInterface): ProfileResponse {
    return {
      fullName: entity.fullName,
      username: entity.username,
      dateOfBirth: entity.dateOfBirth,
      bio: entity.bio,
      picture: entity.picture ? `${USERS_STORAGE}/${entity.picture}` : null,
      phoneNumber: entity.phoneNumber,
      language: entity.language,
      data: data ? { followers: data.followers, followings: data.followings, events: data.events, followed: data.followed } : undefined,
    };
  }

  static requestToEdit(entity: ProfileEntity, body: EditProfileRequest): ProfileEntity {
    const updated = new ProfileEntity();

    updated.id = entity.id;
    updated.fullName = body?.fullName ?? entity.fullName;
    updated.username = body?.username ?? entity.username;
    updated.dateOfBirth = body?.dateOfBirth ?? entity.dateOfBirth;
    updated.bio = body?.bio ?? entity.bio;
    updated.picture = body?.picture ?? entity.picture;
    updated.phoneNumber = body?.phoneNumber ?? entity.phoneNumber;
    updated.language = body?.language ?? entity.language;

    return updated;
  }
}
