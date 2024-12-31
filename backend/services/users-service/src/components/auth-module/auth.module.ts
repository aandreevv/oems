import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './application/data/entities/token.entity';
import { TokenRepositoryPort } from './ports/token-repository.port';
import { PostgresTokenRepositoryAdapter } from './secondary-adapters/postgres-token-repository.adapter';
import { TokenServicePort } from './ports/token-service.port';
import { JwtTokenServiceAdapter } from './secondary-adapters/jwt-token-service.adapter';
import { SignUp } from './application/usecases/sign-up.usecase';
import { GenerateAuthTokens } from './application/usecases/generate-auth-tokens.usecase';
import { AccountModule } from '../account-module/account.module';
import { SignIn } from './application/usecases/sign-in.usecase';
import { AuthController } from './primary-adapters/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { VerifyAccessToken } from './application/usecases/verify-access-token.usecase';
import { RefreshTokens } from './application/usecases/refresh-tokens.usecase';
import { SetupProfile } from './application/usecases/setup-profile.usecase';

@Module({
  exports: [],
  imports: [TypeOrmModule.forFeature([TokenEntity]), AccountModule],
  providers: [
    GenerateAuthTokens,
    SignUp,
    SignIn,
    JwtService,
    VerifyAccessToken,
    RefreshTokens,
    SetupProfile,
    { provide: TokenRepositoryPort, useClass: PostgresTokenRepositoryAdapter },
    { provide: TokenServicePort, useClass: JwtTokenServiceAdapter },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
