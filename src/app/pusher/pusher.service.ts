import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

type pusher = Pusher.Channel;

@Injectable({
  providedIn: 'root'
})
export class PusherService {


  constructor() {
    // this.pusher = new Pusher('8a3ed820322ff1c8eb10', {
   //  cluster: 'eu',
   //   encrypted: true
   //  });
 // }

   //subscribeToChannel(front_office: string): pusher {
  //  return this.pusher.subscribe(front_office);
   }
}
