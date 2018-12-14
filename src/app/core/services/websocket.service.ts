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
    constructor() {}

    connect(): Rx.Subject<MessageEvent> {
        const userId = localStorage.getItem('userId');
        if (userId) {
            console.log('Log with userId');

            this.socket = io(environment.ws_url, { query: `userId=${userId}` });
        } else {
            console.log('New user');

            this.socket = io(environment.ws_url);
        }

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        const observable = new Observable(subscriber => {
            this.socket.on('message', data => {
                console.log('Received message from Websocket Server');
                subscriber.next(data);
            });

            this.socket.on('register', data => {
                console.log('Received register event for user');
                localStorage.setItem('userId', data.user.id);
                subscriber.next(data);
            });

            this.socket.on('existing-user', data => {
                console.log('Received existing user');
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
            next: (data: Object) => {
                this.socket.emit('message', JSON.stringify(data));
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Rx.Subject.create(observer, observable);
    }
}
