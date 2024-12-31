import { Controller } from '@nestjs/common';
import { GetAccountById } from '../application/usecases/get-account-by-id.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountResponse } from '../application/data/responses/account.response';
import { GetAccountByIdRequest } from '../application/data/requests/get-account-by-id.request';
import { FollowResponse } from '../application/data/responses/follow.response';
import { FollowUser } from '../application/usecases/follow-user.usecase';
import { FollowRequest } from '../application/data/requests/follow.request';
import { UnfollowUser } from '../application/usecases/unfollow-user.usecase';
import { GetUserFollowers } from '../application/usecases/get-user-followers.usecase';
import { GetUserFollowings } from '../application/usecases/get-user-followings.usecase';
import { GetUserConnections } from '../application/usecases/get-user-connections.usecase';
import { AddUserConnection } from '../application/usecases/add-user-connection.usecase';
import { RemoveUserConnection } from '../application/usecases/remove-user-connection.usecase';
import { ConnectionResponse } from '../application/data/responses/connection.response';
import { CreateConnectionRequest } from '../application/data/requests/create-connection.request';
import { GetConnectionRequest } from '../application/data/requests/get-connection.request';
import { InterestResponse } from '../application/data/responses/interest.response';
import { GetUserInterests } from '../application/usecases/get-user-interests.usecase';
import { AddUserInterest } from '../application/usecases/add-user-interest.usecase';
import { RemoveUserInterest } from '../application/usecases/remove-user-interest.usecase';
import { CreateInterestRequest } from '../application/data/requests/create-interest.request';
import { GetInterestRequest } from '../application/data/requests/get-interest.request';
import { SearchUsersRequest } from '../application/data/requests/search-users.request';
import { SearchUsers } from '../application/usecases/search-users.usecase';
import { GetAccountsByIdsRequest } from '../application/data/requests/get-accounts-by-ids.request';
import { GetAccountsByIds } from '../application/usecases/get-accounts-by-ids.usecase';
import { UploadProfileImageRequest } from '../application/data/requests/upload-profile-image.request';
import { UploadProfileImage } from '../application/usecases/upload-profile-image.usecase';
import { GetProfileById } from '../application/usecases/get-profile-by-id.usecase';
import { EditProfile } from '../application/usecases/edit-profile.usecase';
import { EditProfileRequest } from '../application/data/requests/edit-profile.request';
import { EditAccountRequest } from '../application/data/requests/edit-account.request';
import { GetRecommendedUsers } from '../application/usecases/get-recommended-users.usecase';

@Controller('account')
export class AccountController {
  constructor(
    private readonly getAccountByIdUsecase: GetAccountById,
    private readonly followUserUsecase: FollowUser,
    private readonly unfollowUserUsecase: UnfollowUser,
    private readonly getUserFollowersUsecase: GetUserFollowers,
    private readonly getUserFollowingsUsecase: GetUserFollowings,
    private readonly getUserConnectionsUsecase: GetUserConnections,
    private readonly addUserConnectionUsecase: AddUserConnection,
    private readonly removeUserConnectionUsecase: RemoveUserConnection,
    private readonly getUserInterestsUsecase: GetUserInterests,
    private readonly addUserInterestUsecase: AddUserInterest,
    private readonly removeUserInterestUsecase: RemoveUserInterest,
    private readonly searchUsersUsecase: SearchUsers,
    private readonly getAccountsByIdsUsecase: GetAccountsByIds,
    private readonly uploadProfileImageUsecase: UploadProfileImage,
    private readonly getProfileByIdUsecase: GetProfileById,
    private readonly editProfileUsecase: EditProfile,
    private readonly getRecommendedUsersUsecase: GetRecommendedUsers,
  ) {}

  @MessagePattern('get_account_by_id')
  getAccountByIdRequest(@Payload() payload: GetAccountByIdRequest): Promise<AccountResponse> {
    return this.getAccountByIdUsecase.execute(payload);
  }

  @MessagePattern('follow')
  follow(@Payload() payload: FollowRequest): Promise<FollowResponse> {
    return this.followUserUsecase.execute(payload);
  }

  @MessagePattern('unfollow')
  unfollow(@Payload() payload: FollowRequest): Promise<FollowResponse> {
    return this.unfollowUserUsecase.execute(payload);
  }

  @MessagePattern('get_user_followers')
  getUserFollowers(@Payload() payload: GetAccountByIdRequest): Promise<AccountResponse[]> {
    return this.getUserFollowersUsecase.execute(payload);
  }

  @MessagePattern('get_user_followings')
  getUserFollowings(@Payload() payload: GetAccountByIdRequest): Promise<AccountResponse[]> {
    return this.getUserFollowingsUsecase.execute(payload);
  }

  @MessagePattern('get_user_connections')
  getUserConnections(@Payload() payload: GetAccountByIdRequest): Promise<ConnectionResponse[]> {
    return this.getUserConnectionsUsecase.execute(payload);
  }

  @MessagePattern('add_user_connection')
  addUserConnection(@Payload() payload: CreateConnectionRequest): Promise<ConnectionResponse[]> {
    return this.addUserConnectionUsecase.execute(payload);
  }

  @MessagePattern('remove_user_connection')
  removeUserConnection(@Payload() payload: GetConnectionRequest): Promise<ConnectionResponse[]> {
    return this.removeUserConnectionUsecase.execute(payload);
  }

  @MessagePattern('get_user_interests')
  getUserInterests(@Payload() payload: GetAccountByIdRequest): Promise<InterestResponse[]> {
    return this.getUserInterestsUsecase.execute(payload);
  }

  @MessagePattern('add_user_interests')
  addUserInterest(@Payload() payload: CreateInterestRequest): Promise<InterestResponse[]> {
    return this.addUserInterestUsecase.execute(payload);
  }

  @MessagePattern('remove_user_interest')
  removeUserInterest(@Payload() payload: GetInterestRequest): Promise<InterestResponse[]> {
    return this.removeUserInterestUsecase.execute(payload);
  }

  @MessagePattern('search_users')
  searchUsers(@Payload() payload: SearchUsersRequest): Promise<AccountResponse[]> {
    return this.searchUsersUsecase.execute(payload);
  }

  @MessagePattern('get_accounts_by_ids')
  getAccountsByIds(@Payload() payload: GetAccountsByIdsRequest): Promise<AccountResponse[]> {
    return this.getAccountsByIdsUsecase.execute(payload);
  }

  @MessagePattern('upload_profile_image')
  uploadProfileImage(@Payload() payload: UploadProfileImageRequest): Promise<AccountResponse> {
    return this.uploadProfileImageUsecase.execute(payload);
  }

  @MessagePattern('get_profile_by_id')
  getProfileById(@Payload() payload: GetAccountByIdRequest): Promise<AccountResponse> {
    return this.getProfileByIdUsecase.execute(payload);
  }

  @MessagePattern('edit_profile')
  editProfile(@Payload() payload: EditAccountRequest): Promise<AccountResponse> {
    return this.editProfileUsecase.execute(payload);
  }

  @MessagePattern('get_recommended_users')
  getRecommendedUsers(@Payload() payload: GetAccountByIdRequest): Promise<AccountResponse[]> {
    return this.getRecommendedUsersUsecase.execute(payload);
  }
}
