import { Controller } from '@nestjs/common';
import { SignIn } from '../application/usecases/sign-in.usecase';
import { SignUp } from '../application/usecases/sign-up.usecase';
import { AuthTokensResponse } from '../application/data/responses/auth-tokens.response';
import { SignUpRequest } from '../application/data/requests/sign-up.request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInRequest } from '../application/data/requests/sign-in.request';
import { VerifyAccessToken } from '../application/usecases/verify-access-token.usecase';
import { VerifyTokenRequest } from '../application/data/requests/verify-token.request';
import { AccountResponse } from '../../account-module/application/data/responses/account.response';
import { RefreshTokensRequest } from '../application/data/requests/refresh-tokens.request';
import { RefreshTokens } from '../application/usecases/refresh-tokens.usecase';
import { AccountSignedUpInterface } from '../application/data/interfaces/account-signed-up.interface';
import { SetupProfile } from '../application/usecases/setup-profile.usecase';
import { CreateProfileRequest } from '../../account-module/application/data/requests/create-profile.request';
import { AccountInterface } from '../../account-module/application/data/interfaces/account.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUsecase: SignIn,
    private readonly signUpUsecase: SignUp,
    private readonly verifyAccessTokenUsecase: VerifyAccessToken,
    private readonly refreshTokensUsecase: RefreshTokens,
    private readonly setupProfileUsecase: SetupProfile,
  ) {}

  @MessagePattern('sign_up')
  async signUpRequest(@Payload() body: SignUpRequest): Promise<AccountSignedUpInterface> {
    return this.signUpUsecase.execute(body);
  }

  @MessagePattern('sign_in')
  async signInRequest(@Payload() body: SignInRequest): Promise<AuthTokensResponse> {
    return this.signInUsecase.execute(body);
  }

  @MessagePattern('verify_access_token')
  async verifyAccessTokenRequest(@Payload() body: VerifyTokenRequest): Promise<AccountInterface> {
    return this.verifyAccessTokenUsecase.execute(body);
  }

  @MessagePattern('refresh_tokens')
  async refreshTokensRequest(@Payload() body: RefreshTokensRequest): Promise<AuthTokensResponse> {
    return this.refreshTokensUsecase.execute(body);
  }

  @MessagePattern('setup_profile')
  async setupProfile(@Payload() body: CreateProfileRequest): Promise<AccountResponse> {
    return this.setupProfileUsecase.execute(body);
  }
}
