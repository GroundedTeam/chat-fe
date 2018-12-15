import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WebsocketService {
    // Our socket connection
    private socket;

    constructor() {
    }

    connect(): Rx.Subject<MessageEvent> {
        this.socket = io(environment.ws_url);

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        const observable = new Observable(subscriber => {
            this.socket.on('new-message', data => {
                subscriber.next(data);
            });

            this.socket.on('register', data => {
                subscriber.next(data);
            });

            this.socket.on('new-user-connected', data => {
                subscriber.next(data);
            });

            this.socket.on('user-disconnected', data => {
                subscriber.next(data);
            });

            this.socket.on('connection-list', data => {
                subscriber.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });

        // We define our Observer which will listen to messages
        // from our other components and send messages back to our
        // socket server whenever the `next()` method is called.
        const observer = {
            next: (data: any) => {
                this.socket.emit(data.type, JSON.stringify(data.content));
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Rx.Subject.create(observer, observable);
    }
}
