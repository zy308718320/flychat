import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client) {
    // 存在重复执行的现象
    const id = client.id;
    client.emit('connected', id);
  }

  sendMessage(id, data) {
    if (this.server) {
      this.server.to(id).emit('message', data);
    }
  }
}
