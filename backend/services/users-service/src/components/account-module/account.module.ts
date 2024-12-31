import { Module } from '@nestjs/common';
import { AccountRepositoryPort } from './ports/account-repository.port';
import { PostgresAccountRepositoryAdapter } from './secondary-adapters/postgres-account-repository.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './application/data/entities/account.entity';
import { GetAccountById } from './application/usecases/get-account-by-id.usecase';
import { ProfileEntity } from './application/data/entities/profile.entity';
import { FollowEntity } from './application/data/entities/follow.entity';
import { ProfileRepositoryPort } from './ports/profile-repository.port';
import { PostgresProfileRepositoryAdapter } from './secondary-adapters/postgres-profile-repository.adapter';
import { FollowRepositoryPort } from './ports/follow-repository.port';
import { PostgresFollowRepositoryAdapter } from './secondary-adapters/postgres-follow-repository.adapter';
import { FollowUser } from './application/usecases/follow-user.usecase';
import { AccountController } from './primary-adapters/account.controller';
import { UnfollowUser } from './application/usecases/unfollow-user.usecase';
import { GetUserFollowings } from './application/usecases/get-user-followings.usecase';
import { GetUserFollowers } from './application/usecases/get-user-followers.usecase';
import { ConnectionEntity } from './application/data/entities/connection.entity';
import { InterestEntity } from './application/data/entities/interest.entity';
import { ConnectionRepositoryPort } from './ports/connection-repository.port';
import { PostgresConnectionRepositoryAdapter } from './secondary-adapters/postgres-connection-repository.adapter';
import { GetUserConnections } from './application/usecases/get-user-connections.usecase';
import { AddUserConnection } from './application/usecases/add-user-connection.usecase';
import { RemoveUserConnection } from './application/usecases/remove-user-connection.usecase';
import { InterestRepositoryPort } from './ports/interest-repository.port';
import { PostgresInterestRepositoryAdapter } from './secondary-adapters/postgres-interest-repository.adapter';
import { GetUserInterests } from './application/usecases/get-user-interests.usecase';
import { AddUserInterest } from './application/usecases/add-user-interest.usecase';
import { RemoveUserInterest } from './application/usecases/remove-user-interest.usecase';
import { SearchUsers } from './application/usecases/search-users.usecase';
import { GetAccountsByIds } from './application/usecases/get-accounts-by-ids.usecase';
import { SharedModule } from '../../shared-module/shared.module';
import { UploadProfileImage } from './application/usecases/upload-profile-image.usecase';
import { GetProfileById } from './application/usecases/get-profile-by-id.usecase';
import { EditProfile } from './application/usecases/edit-profile.usecase';
import { GetRecommendedUsers } from './application/usecases/get-recommended-users.usecase';

@Module({
  exports: [AccountRepositoryPort, GetAccountById, ProfileRepositoryPort],
  imports: [TypeOrmModule.forFeature([AccountEntity, ProfileEntity, FollowEntity, ConnectionEntity, InterestEntity]), SharedModule],
  providers: [
    { provide: AccountRepositoryPort, useClass: PostgresAccountRepositoryAdapter },
    { provide: ProfileRepositoryPort, useClass: PostgresProfileRepositoryAdapter },
    { provide: FollowRepositoryPort, useClass: PostgresFollowRepositoryAdapter },
    { provide: ConnectionRepositoryPort, useClass: PostgresConnectionRepositoryAdapter },
    { provide: InterestRepositoryPort, useClass: PostgresInterestRepositoryAdapter },
    FollowUser,
    UnfollowUser,
    GetAccountById,
    GetUserFollowings,
    GetUserFollowers,
    GetUserConnections,
    AddUserConnection,
    RemoveUserConnection,
    GetUserInterests,
    AddUserInterest,
    RemoveUserInterest,
    SearchUsers,
    GetAccountsByIds,
    UploadProfileImage,
    GetProfileById,
    EditProfile,
    GetRecommendedUsers,
  ],
  controllers: [AccountController],
})
export class AccountModule {}
