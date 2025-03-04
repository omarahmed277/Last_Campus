import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  private activeUsers = new Map<string, string>();

  // 🟢 Handle User Connection
  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        console.log('Invalid token');
        client.disconnect();
        return;
      }

      const decoded = this.jwtService.verify(token);
      this.activeUsers.set(client.id, decoded.sub);

      console.log(`User ${decoded.sub} connected`);
    } catch (error) {
      client.disconnect();
    }
  }

  // 🔴 Handle User Disconnection
  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = this.activeUsers.get(client.id);
    if (userId) {
      this.activeUsers.delete(client.id);
      console.log(`User disconnected: ${userId}`);
    }
  }

  // 🔵 Store Connected Users
  @SubscribeMessage('userConnected')
  handleUserConnected(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.activeUsers.set(client.id, userId);
    console.log(`User ${userId} connected with socket ${client.id}`);
  }

  // 🟢 Send & Broadcast Message
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() body: { chatId: string; senderId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.sendMessage(
      body.chatId,
      body.senderId,
      body.content,
    );

    // Emit message to chat participants
    const chatId = `chat-${body.chatId}`;
    try {
      client.emit(chatId, message);
      client.broadcast.emit(chatId, message);
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  // 🟢 Mark Messages as Read
  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() body: { chatId: string; userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.markMessagesAsRead(body.chatId, body.userId);
    client.broadcast.emit(`chat-${body.chatId}-read`, { userId: body.userId });
  }
}
