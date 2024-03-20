import Message from '@/common/message';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

export interface ChatState {
  messages: Message[];
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: [],
  }),
  actions: {
    subscribe() {
      this.$socket.once('messages-response', (msgs: Message[]) => {
        this.messages = msgs;
      });
      this.$socket.emit('messages');

      this.$socket.on('new-message', (msg: Message) => {
        this.messages.push(msg);
      });
    },
    unsubscribe() {
      this.$socket.removeAllListeners('new-message');
    },
    sendMessage(data: string) {
      const user = useAuthStore().user;
      if (user) {
        const msg = new Message(user, data);
        this.messages.push(msg);
        this.$socket.emit('message', msg);
      }
    },
  },
});
