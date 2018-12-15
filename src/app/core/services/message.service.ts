import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private http: HttpClient) {
    }

    findMessagesInRoom(roomId): Observable<Array<any>> {
        return this.http.get<Array<any>>(
            'http://localhost:3000/api/messages/' + roomId,
        );
    }
}
