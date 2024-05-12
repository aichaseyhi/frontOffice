
import { Component, OnInit } from '@angular/core';
import { PusherService } from 'src/app/pusher/pusher.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  channel: any;
  messages: string[] = [];
  messageInput: string = '';
  newMessage: string = '';

  constructor(private pusherService: PusherService) { }

  ngOnInit(): void {
    // this.channel = this.pusherService.subscribeToChannel('chat-channel');

    this.channel.bind('message', (data: any) => {
      this.messages.push(data.message);
    });
  }

  sendMessage() {
    if (this.messageInput.trim() !== '') {
      this.channel.trigger('client-message', {
        message: this.messageInput
      });
      this.messageInput = '';
    }
  }
}
