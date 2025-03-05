import { Controller, Post, Body, Param, Patch, Get, UseGuards, Req } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse } from 'src/common/interfaces/response.interface';

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

  @Get("user")
  @UseGuards(JwtAuthGuard)
  async getUserSessions(@Req() req): Promise<ApiResponse<any>> {
    return this.sessionsService.userSessions(req.user.id)
  }
}
