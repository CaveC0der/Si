import { markRaw } from 'vue';
import { socket } from '@/common/socket';

export default function socketPlugin() {
  return { $socket: markRaw(socket) };
}
