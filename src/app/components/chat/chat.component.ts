import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';
import { DataService } from 'src/app/core/services/data.service';
import { Client } from 'src/app/shared/models/client';
import { Room } from 'src/app/shared/models/room';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/shared/models/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    public username: string;
    private user = new Client();
    private receiver = new Client();
    private message: string;
    private messagesArray: Array<Message>;
    private room: Room;

    constructor(
        private chatService: ChatService,
        private dataService: DataService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.chatService.messages.subscribe(data => {
            if (data.type === 'user') {
                this.user = data.user;

                this.username = this.user.username;
            } else if (data.type === 'new-message') {
                console.log(['new message', data.text]);

                // const newString = data.text
                //     .substr(0, data.text.length - 1)
                //     .substr(1);
                // this.printMessage('income-message', 'Someone', newString);
            }
        });

        this.dataService.currentData.subscribe((data: Client) => {
            if (data.isEmpty()) {
                return;
            }
            this.receiver = data;
            // find chat room
            this.chatService
                .findChat(this.user.id, this.receiver.id)
                .subscribe(room => {
                    if (room) {
                        this.room = room;
                        this.fetchMessagesFromRoom();
                    } else {
                        // if no chat room -> create it
                        this.chatService
                            .createChat(this.user.id, this.receiver.id)
                            .subscribe(newRoom => {
                                this.room = newRoom;
                                this.fetchMessagesFromRoom();
                            });
                    }
                });
        });
    }

    sendMessage() {
        this.chatService.sendMsg({
            message: this.message,
            receiver: this.user.id,
            roomId: this.room.id,
        });
        this.printMessage(this.user, this.message, new Date());
        this.message = '';
    }

    printMessage(sender: Client, text: string, time: Date) {
        const newMessage = new Message();
        newMessage.sender = sender;
        newMessage.text = text;
        newMessage.createdAt = time;
        this.messagesArray.push(newMessage);
    }

    private fetchMessagesFromRoom() {
        this.messageService
            .findMessagesInRoom(this.room.id)
            .subscribe(messages => {
                this.messagesArray = messages;
            });
    }
}
