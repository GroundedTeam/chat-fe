import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private http: HttpClient) {
    }

    findMessagesInRoom(roomId): Observable<Array<Message>> {
        return this.http.get<Array<Message>>(
            'http://localhost:3000/api/messages/' + roomId,
        );
    }
}
