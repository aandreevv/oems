import { Injectable } from '@nestjs/common';
import { CommunicationService } from '../../../../shared-module/secondary-adapters/services/communication.service';
import { AttendeeRepositoryPort } from '../../ports/attendee-repository.port';
import { AccountInterface } from '../../../../shared-module/application/data/interfaces/account.interface';
import { EventEntity } from '../data/entities/event.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppendAttendedUsers {
  constructor(
    private readonly communicationService: CommunicationService,
    private readonly attendeeRepositoryPort: AttendeeRepositoryPort,
  ) {}

  async execute(account: AccountInterface, event: EventEntity): Promise<void> {
    await this.attendeeRepositoryPort.create(event, account);
    await firstValueFrom(this.communicationService.joinRoom(account, event));
    await firstValueFrom(this.communicationService.joinChat(account, event));
  }
}
