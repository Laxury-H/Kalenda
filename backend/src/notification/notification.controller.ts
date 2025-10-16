import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  async sendEmail(@Body() emailData: { to: string; subject: string; body: string }): Promise<void> {
    await this.notificationService.sendEmail(emailData.to, emailData.subject, emailData.body);
  }

  @Post('in-app')
  async sendInApp(@Body() notificationData: { userId: number; message: string }): Promise<void> {
    await this.notificationService.sendInAppNotification(notificationData.userId, notificationData.message);
  }
}