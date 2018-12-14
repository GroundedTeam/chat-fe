import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/shared/models/client';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
    @Input() className;
    @Input() receiver: Client;
    @Input() text: string;

    constructor() {}

    ngOnInit() {}
}
