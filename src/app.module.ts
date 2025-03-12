import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { SessionsModule } from './sessions/sessions.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ChatModule,
    SessionsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
