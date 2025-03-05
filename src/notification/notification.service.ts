import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { NotificationType } from './enums/notification-type.enum';

@Injectable()
export class NotificationService {
  constructor(private emailService: EmailService) {}

  async sendNotification(
    type: NotificationType,
    recipientEmail: string,
    data: any,
  ): Promise<void> {
    await this.emailService.sendEmail(recipientEmail, type, data);
  }
}
