import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/shared/models/client';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private dataSource = new BehaviorSubject(new Client());
    currentData = this.dataSource.asObservable();

    constructor() {}

    changeData(data: Client) {
        this.dataSource.next(data);
    }
}
