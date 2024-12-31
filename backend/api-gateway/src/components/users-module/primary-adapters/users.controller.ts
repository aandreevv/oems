import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FollowService } from '../secondary-adapters/follow.service';
import { FollowResponse } from '../application/data/responses/follow.response';
import {
  ACCOUNT_IS_NOT_FOUND,
  CAN_NOT_FIND_RECOMMENDED_USERS,
  CAN_NOT_FOLLOW_OURSELF,
  CONNECTION_IS_ALREADY_ADDED,
  CONNECTION_IS_NOT_FOUND,
  INTEREST_IS_ALREADY_ADDED,
  INTEREST_IS_NOT_FOUND,
  INVITE_IS_NOT_FOUND,
  USER_IS_ALREADY_FOLLOWED,
  USER_IS_NOT_FOLLOWED,
  USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS,
  USER_WITH_SUCH_USERNAME_ALREADY_EXISTS,
  YOU_ARE_NOT_THE_RECEIVER_OF_THIS_INVITE,
} from '../../../constants/exceptions';
import { JWT_ACCESS_TOKEN } from '../../../constants/constants';
import { AuthGuard } from '../../auth-module/application/data/guards/auth.guard';
import { FollowRequest } from '../application/data/requests/follow.request';
import { AuthenticatedUser } from '../../../shared-module/application/decorators/authenticated-user.decorator';
import { AccountResponse } from '../application/data/responses/account.response';
import { Observable } from 'rxjs';
import { GetUserRequest } from '../application/data/requests/get-user.request';
import { ConnectionResponse } from '../application/data/responses/connection.response';
import { AddConnectionRequest } from '../application/data/requests/add-connection.request';
import { GetUserConnectionRequest } from '../application/data/requests/get-user-connection.request';
import { InterestResponse } from '../application/data/responses/interest.response';
import { AddInterestsRequest } from '../application/data/requests/add-interests.request';
import { GetUserInterestRequest } from '../application/data/requests/get-user-interest.request';
import { SearchUsersRequest } from '../application/data/requests/search-users.request';
import { AccountInterface } from '../../auth-module/application/data/interfaces/account.interface';
import { UploadProfileImageRequest } from '../application/data/requests/upload-profile-image.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccountFullResponse } from '../application/data/responses/account-full.response';
import { EventsService } from '../../../shared-module/secondary-adapters/microservices/events.service';
import { PastAndFutureEventsResponse } from '../application/data/responses/past-and-future-events.response';
import { EventResponse } from '../../events-module/application/data/responses/event.response';
import { EventInviteReceiverResponse } from '../../events-module/application/data/responses/event-invite-receiver.response';
import { EditProfileRequest } from '../application/data/requests/edit-profile.request';
import { MyAccountFullResponse } from '../application/data/responses/my-account-full.response';
import { SetInviteStatusBody } from '../../events-module/application/data/requests/set-invite-status.body';
import { SetInviteStatusParams } from '../../events-module/application/data/requests/set-invite-status.params';
import { EventInviteSenderResponse } from '../../events-module/application/data/responses/event-invite-sender.response';
import { UsersService } from '../../../shared-module/secondary-adapters/microservices/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly followService: FollowService,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  @ApiOperation({ description: 'Get recommended users by interests. Pass access token' })
  @ApiOkResponse({ type: [AccountResponse] })
  @ApiBadRequestResponse({ description: CAN_NOT_FIND_RECOMMENDED_USERS })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get('recommended')
  getRecommendedUsers(@AuthenticatedUser() account: AccountInterface): Observable<AccountResponse[]> {
    return this.usersService.getRecommendedUsers(account);
  }

  @ApiOperation({ description: 'Get my user info' })
  @ApiOkResponse({ type: MyAccountFullResponse })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Get('me')
  getMyUserInfo(@AuthenticatedUser() account: AccountInterface): Observable<MyAccountFullResponse> {
    return this.usersService.getProfile({ userId: account.id });
  }

  @ApiOperation({
    description:
      'Add connection request. Pass type and URL of existing connection and access token. Type can be one of the following: [ LINKED_IN, INSTAGRAM, TELEGRAM, FACEBOOK, X ]',
  })
  @ApiCreatedResponse({ type: [ConnectionResponse] })
  @ApiConflictResponse({ description: CONNECTION_IS_ALREADY_ADDED })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Post('connections')
  addConnection(@Body() body: AddConnectionRequest, @AuthenticatedUser() account: AccountInterface): Observable<ConnectionResponse[]> {
    return this.usersService.addConnection(body, account);
  }

  @ApiOperation({
    description:
      'Add interest request. Pass type (enum) and access token. Type can be one of the following: [ SPORTS, MUSIC, MOVIES_AND_TV_SHOWS, TRAVEL_AND_ADVENTURE, FOOD_AND_COOKING, TECHNOLOGY_AND_GADGETS, ART_AND_DESIGN, HEALTH_AND_FITNESS, LITERATURE_AND_WRITING, GAMING, FASHION_AND_BEAUTY, SCIENCE_AND_NATURE, DIY_AND_CRAFTS, POLITICS_AND_CURRENT_EVENTS, FINANCE_AND_INVESTING, PETS_AND_ANIMALS, CARS_AND_AUTOMOBILES, HISTORY, GARDENING, PHOTOGRAPHY, BLOGGING ]',
  })
  @ApiCreatedResponse({ type: [InterestResponse] })
  @ApiConflictResponse({ description: INTEREST_IS_ALREADY_ADDED })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Post('interests')
  addInterests(@Body() body: AddInterestsRequest, @AuthenticatedUser() account: AccountInterface): Observable<InterestResponse[]> {
    return this.usersService.addInterest(body, account);
  }

  @ApiOperation({ description: 'Delete connection request. Pass connection id and access token' })
  @ApiOkResponse({ type: [ConnectionResponse] })
  @ApiNotFoundResponse({ description: CONNECTION_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Delete('connections/:connectionId')
  deleteConnection(@Param() param: GetUserConnectionRequest): Observable<ConnectionResponse[]> {
    return this.usersService.deleteConnection(param);
  }

  @ApiOperation({ description: 'Delete interest request. Pass interest id and access token' })
  @ApiOkResponse({ type: [InterestResponse] })
  @ApiNotFoundResponse({ description: INTEREST_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Delete('interests/:interestId')
  deleteInterest(@Param() param: GetUserInterestRequest): Observable<InterestResponse[]> {
    return this.usersService.deleteInterest(param);
  }

  @ApiOperation({ description: 'Search users by username or full name (or part of username or full name)' })
  @ApiOkResponse({ type: [AccountResponse] })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get('search')
  searchUsers(@Query() query: SearchUsersRequest, @AuthenticatedUser() account: AccountInterface): Observable<AccountResponse[]> {
    return this.usersService.searchUsers(query, account);
  }

  @ApiOperation({ description: 'Get user info' })
  @ApiOkResponse({ type: AccountFullResponse })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Get(':userId')
  getUserInfo(@Param() param: GetUserRequest, @AuthenticatedUser() user: AccountInterface): Observable<AccountFullResponse> {
    return this.usersService.getProfile(param, user);
  }

  @ApiOperation({ description: 'Get user connections request. Pass account id and access token' })
  @ApiOkResponse({ type: [ConnectionResponse] })
  @ApiNotFoundResponse({ description: ACCOUNT_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get(':userId/connections')
  getUserConnections(@Param() param: GetUserRequest): Observable<ConnectionResponse[]> {
    return this.usersService.getUserConnections(param);
  }

  @ApiOperation({ description: 'Get user interests request. Pass account id and access token' })
  @ApiOkResponse({ type: [InterestResponse] })
  @ApiNotFoundResponse({ description: ACCOUNT_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get(':userId/interests')
  getUserInterests(@Param() param: GetUserRequest): Observable<InterestResponse[]> {
    return this.usersService.getUserInterests(param);
  }

  @ApiOperation({ description: 'Get user followers request. Pass user id to get followers and access token' })
  @ApiOkResponse({ type: [AccountResponse] })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Get(':userId/followers')
  getUserFollowers(@Param() param: GetUserRequest): Observable<AccountResponse[]> {
    return this.followService.getUserFollowers(param);
  }

  @ApiOperation({ description: 'Get user followers request. Pass user id to get followers and access token' })
  @ApiOkResponse({ type: [AccountResponse] })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Get(':userId/followings')
  getUserFollowings(@Param() param: GetUserRequest): Observable<AccountResponse[]> {
    return this.followService.getUserFollowings(param);
  }

  @ApiOperation({ description: 'Follow user request. Pass user id to follow and access token' })
  @ApiOkResponse({ type: FollowResponse })
  @ApiNotFoundResponse({ description: ACCOUNT_IS_NOT_FOUND })
  @ApiBadRequestResponse({ description: CAN_NOT_FOLLOW_OURSELF })
  @ApiConflictResponse({ description: USER_IS_ALREADY_FOLLOWED })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Post(':userId/follow')
  follow(@Param() param: FollowRequest, @AuthenticatedUser() account: AccountInterface): Observable<FollowResponse> {
    return this.followService.follow(param, account);
  }

  @ApiOperation({ description: 'Unfollow user request. Pass user id to unfollow and access token' })
  @ApiOkResponse({ type: FollowResponse })
  @ApiNotFoundResponse({ description: ACCOUNT_IS_NOT_FOUND })
  @ApiBadRequestResponse({ description: USER_IS_NOT_FOLLOWED })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Delete(':userId/unfollow')
  unfollow(@Param() param: FollowRequest, @AuthenticatedUser() account: AccountInterface): Observable<FollowResponse> {
    return this.followService.unfollow(param, account);
  }

  @ApiOperation({ description: 'Upload a profile image' })
  @ApiOkResponse({ type: AccountResponse })
  @ApiBody({ type: UploadProfileImageRequest })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Patch('image')
  uploadProfileImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 20 * 1000 * 1000 }), new FileTypeValidator({ fileType: /image\/(jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @AuthenticatedUser() account: AccountInterface,
  ): Observable<AccountResponse> {
    return this.usersService.uploadFile(file, account);
  }

  @ApiOperation({ description: 'Get user events. Pass user id and access token' })
  @ApiOkResponse({ type: PastAndFutureEventsResponse })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get(':userId/events')
  getUserEvents(@Param() param: GetUserRequest): Observable<PastAndFutureEventsResponse> {
    return this.eventsService.getUserEvents(param);
  }

  @ApiOperation({ description: 'Get user attendances. Pass user id and access token' })
  @ApiOkResponse({ type: [EventResponse] })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get(':userId/attendances')
  getUserAttendances(@Param() param: GetUserRequest): Observable<EventResponse[]> {
    return this.eventsService.getUserAttendances(param);
  }

  @ApiOperation({ description: 'Get user invites. Pass user id and access token' })
  @ApiOkResponse({ type: [EventInviteReceiverResponse] })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Get(':userId/invites')
  getUserInvites(@Param() param: GetUserRequest): Observable<EventInviteReceiverResponse[]> {
    return this.eventsService.getUserInvites(param);
  }

  @ApiOperation({ description: 'Edit user profile. Pass only edited fields and access token' })
  @ApiOkResponse({ type: AccountResponse })
  @ApiConflictResponse({ description: `${USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS} or ${USER_WITH_SUCH_USERNAME_ALREADY_EXISTS}` })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @Patch('me')
  editProfile(@Body() body: EditProfileRequest, @AuthenticatedUser() account: AccountInterface): Observable<AccountResponse> {
    return this.usersService.editProfile(body, account);
  }

  @ApiOperation({
    description:
      'Set invite status (for receiver only!). Pass invite id, status of the response to the invite, response text (optional) and access token.',
  })
  @ApiOkResponse({ type: EventInviteReceiverResponse })
  @ApiNotFoundResponse({ description: INVITE_IS_NOT_FOUND })
  @ApiForbiddenResponse({ description: YOU_ARE_NOT_THE_RECEIVER_OF_THIS_INVITE })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Patch('invites/:inviteId/status/:status')
  setInviteStatus(
    @Param() params: SetInviteStatusParams,
    @Body() body: SetInviteStatusBody,
    @AuthenticatedUser() account: AccountInterface,
  ): Observable<EventInviteSenderResponse> {
    return this.eventsService.setInviteStatus(params, body, account);
  }
}
