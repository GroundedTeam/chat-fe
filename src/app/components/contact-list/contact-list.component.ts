import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { Client } from 'src/app/shared/models/client';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private dataService: DataService,
    ) {}

    public allContacts: Array<Client>;
    public contacts: Array<Client>;

    fetchContacts() {
        this.http
            .get<Array<Client>>('http://localhost:3000/api/users/all')
            .subscribe(contacts => {
                this.allContacts = contacts.map(contact => new Client(contact));
                this.showOnline();
            });
    }

    openDialog(receiver: Client) {
        this.dataService.changeData(receiver);
    }

    showOnline() {
        this.contacts = this.allContacts.filter(contact => {
            return contact.status === 1;
        });
    }

    showAll() {
        this.contacts = this.allContacts;
    }

    ngOnInit() {
        this.fetchContacts();
    }
}
