import { Component } from '@angular/core'
import { ChatContactComponent } from './components/chat-contact/chat-contact.component'
import { MessageComponent } from './components/message/message.component'
import type { ContactType } from './data'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-chat',
  imports: [ChatContactComponent, MessageComponent, PagetitleComponent],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {
  profileDetail!: ContactType

  receiveDataFromChild(data: ContactType) {
    this.profileDetail = data
  }
}
