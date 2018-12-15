import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/shared/models/client';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
    @Input() user: Client;
    @Input() sender: Client;
    @Input() text: string;

    className: string;

    constructor() {
    }

    ngOnInit() {
        const result = this.myMessage();
        if (result) {
            this.className = 'my-message';
        } else {
            this.className = 'income-message';
        }
    }

    myMessage() {
        return this.sender.id === this.user.id;
    }
}
