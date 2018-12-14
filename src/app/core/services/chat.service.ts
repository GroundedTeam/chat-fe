import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Room } from 'src/app/shared/models/room';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    messages: Subject<any>;

    // Our constructor calls our wsService connect method
    constructor(private wsService: WebsocketService, private http: HttpClient) {
        this.messages = <Subject<any>>wsService.connect().pipe(
            map(
                (response: any): any => {
                    return response;
                }
            )
        );
    }

    // Our simplified interface for sending
    // messages back to our socket.io server
    sendMsg(obj) {
        this.messages.next(obj);
    }

    findChat(senderId, receiverId): Observable<Room> {
        return this.http.get<Room>('http://localhost:3000/api/chats', {
            params: {
                senderId,
                receiverId,
            },
        });
    }

    createChat(senderId, receiverId): Observable<Room> {
        return this.http.post<Room>('http://localhost:3000/api/chats', {
            senderId,
            receiverId,
        });
    }
}
