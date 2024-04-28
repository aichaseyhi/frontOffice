import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

type pusher = Pusher.Channel;

@Injectable({
  providedIn: 'root'
})
export class PusherService {


  constructor() {
    // this.pusher = new Pusher('YOUR_PUSHER_APP_KEY', {
    //   cluster: 'YOUR_PUSHER_CLUSTER',
    //   encrypted: true
    // });
  }

  // subscribeToChannel(channelName: string): pusher {
  //   return this.pusher.subscribe(channelName);
  // }
}
