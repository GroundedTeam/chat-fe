import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../models/client';

@Pipe({
    name: 'online',
})
export class OnlinePipe implements PipeTransform {
    transform(clients: Array<Client>, status?: number): Array<Client> {
        if (!clients) {
            return clients;
        }
        return clients.filter(client => {
            if (status && client.status === status) {
                return client;
            } else if (!status) {
                return client;
            }
        });
    }
}
