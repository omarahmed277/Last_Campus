import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EmailService, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
