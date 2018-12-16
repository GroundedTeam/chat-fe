import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Room } from 'src/app/shared/models/room';
import { environment } from '../../../environments/environment';

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
                },
            ),
        );
    }

    sendMsg(obj) {
        this.messages.next({ type: 'message', content: obj });
    }

    joinRoom(obj) {
        this.messages.next({ type: 'join-room', content: obj });
    }

    leaveRoom(obj) {
        this.messages.next({ type: 'leave-room', content: obj });
    }

    checkOnline() {
        this.messages.next({ type: 'connection-list' });
    }

    findChat(senderId, receiverId): Observable<{ data: Room }> {
        return this.http.get<{ data: Room }>(`${environment.api_url}/chats`, {
            params: {
                senderId,
                receiverId,
            },
        });
    }

    createChat(senderId, receiverId): Observable<Room> {
        return this.http.post<Room>(`${environment.api_url}/chats`, {
            senderId,
            receiverId,
        });
    }
}
