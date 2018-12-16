import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { OnlinePipe } from './shared/pipes/online.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        MessageComponent,
        ContactListComponent,
        OnlinePipe,
        SearchPipe,
    ],
    imports: [BrowserModule, FormsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
