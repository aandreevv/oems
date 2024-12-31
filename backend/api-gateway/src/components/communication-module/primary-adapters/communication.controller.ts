import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN } from '../../../constants/constants';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../auth-module/application/data/guards/auth.guard';
import { AuthenticatedUser } from '../../../shared-module/application/decorators/authenticated-user.decorator';
import { AuthenticatedAccountResponse } from '../../auth-module/application/data/responses/authenticated-account.response';
import { CommunicationTokenResponse } from '../application/data/responses/communication-token.response';
import { CommunicationService } from '../../../shared-module/secondary-adapters/microservices/communication.service';
import { ChatResponse } from '../application/data/responses/chat.response';
import { AccountResponse } from '../../users-module/application/data/responses/account.response';
import { CHAT_IS_NOT_FOUND } from '../../../constants/exceptions';
import { GetChatByIdRequest } from '../application/data/requests/get-chat-by-id.request';

@ApiTags('Communication')
@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @ApiOperation({ description: 'Get user communication token' })
  @ApiOkResponse({ type: CommunicationTokenResponse })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Post('token')
  @HttpCode(HttpStatus.OK)
  issueToken(@AuthenticatedUser() account: AuthenticatedAccountResponse): Observable<CommunicationTokenResponse> {
    return this.communicationService.getCommunicationToken(account);
  }

  @ApiOperation({ description: 'Get user chats' })
  @ApiOkResponse({ type: ChatResponse, isArray: true })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Get('chats')
  @HttpCode(HttpStatus.OK)
  getUserChats(@AuthenticatedUser() account: AuthenticatedAccountResponse): Observable<ChatResponse[]> {
    return this.communicationService.getUserChats(account);
  }

  @ApiOperation({ description: 'Get chat participants' })
  @ApiOkResponse({ type: AccountResponse, isArray: true })
  @ApiNotFoundResponse({ description: CHAT_IS_NOT_FOUND })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Get('chats/:chatId/participants')
  getChatParticipants(@Param() param: GetChatByIdRequest): Observable<AccountResponse[]> {
    return this.communicationService.getChatParticipants(param);
  }
}
