import type { User } from '@/types/user';

export default class Message {
  user: User;
  data: string;
  timestamp: number;

  constructor(user: User, data: string) {
    this.user = user;
    this.data = data;
    this.timestamp = Date.now();
  }
}
