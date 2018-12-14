import { Client } from './client';
import { Room } from './room';

export class Message {
    sender: Client;
    text: string;
    createdAt: Date;
    chat: Room;
}
