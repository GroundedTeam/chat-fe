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
        private chatService: ChatService,
    ) {
    }

    public status = 1;
    public contacts: Array<Client>;

    fetchContacts() {
        this.http
            .get<Array<Client>>('http://localhost:3000/api/users')
            .subscribe(contacts => {
                this.contacts = contacts.map(contact => new Client(contact));
                setTimeout(() => {
                    this.chatService.checkOnline();
                }, 1000);
            });
    }

    openDialog(receiver: Client) {
        this.dataService.changeData(receiver);
    }

    showOnline() {
        this.status = 1;
    }

    showAll() {
        this.status = 0;
    }

    ngOnInit() {
        this.fetchContacts();

        this.chatService.messages.subscribe(data => {
            if (data.type === 'connected-user') {
                data.user.status = 1;
                const clientModel = new Client(data.user);
                const userExist = this.changeStatusClient(clientModel, 1);
                if (!userExist) {
                    // reassigning array reference to make pipe work
                    const newContacts = [...this.contacts, clientModel];
                    this.contacts = newContacts;
                }
            } else if (data.type === 'disconnected-user') {
                this.changeStatusClient(new Client(data.user), 0);
                // reassigning array reference to make pipe work
                this.contacts = [...this.contacts];
            } else if (data.type === 'connection-list') {
                this.contacts.map((contact) => {
                    if (data.content.includes(contact.id)) {
                        contact.status = 1;
                    }
                });
                this.contacts = [...this.contacts];
            }
        });
    }

    private changeStatusClient(client: Client, status: number) {
        return this.contacts.find((element, id) => {
            if (element.id === client.id) {
                this.contacts[id].status = status;

                return true;
            }
            return false;
        });
    }
}
