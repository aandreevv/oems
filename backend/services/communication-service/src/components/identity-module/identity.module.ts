import { Module } from '@nestjs/common';
import { CommunicationIdentityServicePort } from './ports/communication-identity-service.port';
import { AzureCommunicationIdentityServiceAdapter } from './secondary-adapters/azure-communication-identity-service.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationIdentity } from './application/data/entities/communication-identity.entity';
import { CommunicationIdentityRepositoryPort } from './ports/communication-identity-repository.port';
import { PostgresCommunicationIdentityRepositoryAdapter } from './secondary-adapters/postgres-communication-identity-repository.adapter';
import { CreateCommunicationUser } from './application/usecases/create-communication-user.usecase';
import { IdentityController } from './primary-adapters/identity.controller';
import { GetCommunicationTokens } from './application/usecases/get-communication-tokens.usecase';

@Module({
  exports: [
    CommunicationIdentityServicePort,
    CommunicationIdentityRepositoryPort,
  ],
  imports: [TypeOrmModule.forFeature([CommunicationIdentity])],
  providers: [
    {
      provide: CommunicationIdentityServicePort,
      useClass: AzureCommunicationIdentityServiceAdapter,
    },
    {
      provide: CommunicationIdentityRepositoryPort,
      useClass: PostgresCommunicationIdentityRepositoryAdapter,
    },
    CreateCommunicationUser,
    GetCommunicationTokens,
  ],
  controllers: [IdentityController],
})
export class IdentityModule {}
