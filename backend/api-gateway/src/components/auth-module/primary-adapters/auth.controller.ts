import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SignInRequest } from '../application/data/requests/sign-in.request';
import { AuthTokensResponse } from '../application/data/responses/auth-tokens.response';
import { Observable } from 'rxjs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpRequest } from '../application/data/requests/sign-up.request';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../../../constants/constants';
import { AuthGuard } from '../application/data/guards/auth.guard';
import { SetupProfileRequest } from '../application/data/requests/setup-profile.request';
import { AccountResponse } from '../../users-module/application/data/responses/account.response';
import { AuthenticatedUser } from '../../../shared-module/application/decorators/authenticated-user.decorator';
import { AccountInterface } from '../application/data/interfaces/account.interface';
import { ACCOUNT_IS_ALREADY_CONFIGURED, USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS } from '../../../constants/exceptions';
import { UsersService } from '../../../shared-module/secondary-adapters/microservices/users.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Sign up request. Pass email and password in request body' })
  @ApiCreatedResponse({ description: 'User successfully signed up', type: AuthTokensResponse })
  @ApiConflictResponse({ description: 'User with such email already exists!' })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() body: SignUpRequest): Observable<AuthTokensResponse> {
    return this.usersService.signUp(body);
  }

  @ApiOperation({ description: 'Sign in request. Pass email and password in request body' })
  @ApiOkResponse({ description: 'User successfully signed in', type: AuthTokensResponse })
  @ApiNotFoundResponse({ description: 'User with such email is not found' })
  @ApiBadRequestResponse({ description: 'Password is invalid' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() body: SignInRequest): Observable<AuthTokensResponse> {
    return this.usersService.signIn(body);
  }

  @ApiBearerAuth(JWT_REFRESH_TOKEN)
  @Post('refresh')
  refresh(@Req() req: Request): Observable<AuthTokensResponse> {
    return this.usersService.refreshTokens({ authorization: req.headers['authorization'] });
  }

  @ApiOperation({ description: 'Setup profile request. Pass required info in request body and access token' })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: AccountResponse })
  @ApiNotFoundResponse({ description: 'Account is not found!' })
  @ApiConflictResponse({
    description: `${ACCOUNT_IS_ALREADY_CONFIGURED} or ${USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS} or ${USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS}`,
  })
  @HttpCode(HttpStatus.CREATED)
  @Put('setup-profile')
  setupProfile(@Body() body: SetupProfileRequest, @AuthenticatedUser() account: AccountInterface): Observable<AccountResponse> {
    return this.usersService.setupProfile(body, account);
  }
}
