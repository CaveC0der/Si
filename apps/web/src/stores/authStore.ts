import { defineStore } from 'pinia';
import type { User } from '@/types/user';

export interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),
  actions: {
    join(username: string, cb: (ok: boolean) => void) {
      this.$socket.once('join-response', (id: string | null) => {
        if (id) {
          this.user = { id, username };
          cb(true);
        } else {
          cb(false);
        }
      });

      this.$socket.emit('join', username);
    },
    leave() {
      if (this.user) {
        this.user = null;
        this.$socket.emit('leave');
      }
    },
  },
});
