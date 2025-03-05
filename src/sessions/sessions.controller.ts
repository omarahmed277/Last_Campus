import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('request')
  async requestSession(
    @Body('requesterId') requesterId: number,
    @Body('requestedId') requestedId: number,
    @Body('scheduledAt') scheduledAt: Date,
  ) {
    return this.sessionsService.requestSession(
      requesterId,
      requestedId,
      scheduledAt,
    );
  }

  @Patch(':id/accept')
  async acceptSession(
    @Param('id') sessionId: string,
    @Body('userId') requestedUserId: number,
  ) {
    return this.sessionsService.acceptSession(sessionId, requestedUserId);
  }

  @Patch(':id/reject')
  async rejectSession(
    @Param('id') sessionId: string,
    @Body('userId') requestedUserId: number,
  ) {
    return this.sessionsService.rejectSession(sessionId, requestedUserId);
  }
}
