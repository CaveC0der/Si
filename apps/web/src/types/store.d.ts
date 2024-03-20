import 'pinia';
import { Socket } from 'socket.io-client';
import type { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $socket: Socket;
    $router: Router;
  }
}
