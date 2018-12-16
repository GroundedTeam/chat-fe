import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private http: HttpClient) {
    }

    findMessagesInRoom(roomId): Observable<Array<any>> {
        return this.http.get<Array<any>>(
            `${environment.api_url}/messages/${roomId}`,
        );
    }
}
