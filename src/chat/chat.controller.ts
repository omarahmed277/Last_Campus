import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  // 🟢 Get all Chats
  @Get()
  async getChats() {
    return this.chatService.getChats();
  }

  // 🟢 Create or Get a Chat
  @Post('create')
  async getOrCreateChat(@Body() body: { user1Id: number; user2Id: number }) {
    return this.chatService.getOrCreateChat(body.user1Id, body.user2Id);
  }

  // 🟢 Send a Message
  @Post('send')
  async sendMessage(
    @Body() body: { chatId: string; senderId: number; content: string },
  ) {
    return this.chatService.sendMessage(
      body.chatId,
      body.senderId,
      body.content,
    );
  }

  // 🟢 Get User's Chats
  @Get(':userId/chats')
  async getUserChats(@Param('userId') userId: string) {
    return this.chatService.getUserChats(parseInt(userId, 10));
  }

  // 🟢 Get Messages for a Chat
  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatService.getChatMessages(chatId);
  }

  // 🟢 Mark Messages as Read
  @Post('mark-read')
  async markMessagesAsRead(@Body() body: { chatId: string; userId: number }) {
    return this.chatService.markMessagesAsRead(body.chatId, body.userId);
  }
}
