import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../models/client';

@Pipe({
    name: 'search',
})
export class SearchPipe implements PipeTransform {

    transform(items: Array<Client>, searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.username.toLowerCase().includes(searchText);
        });
    }

}
