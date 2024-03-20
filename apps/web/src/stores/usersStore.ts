import type { User } from '@/types/user';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

export interface UsersState {
  users: User[];
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
  }),
  actions: {
    subscribe() {
      this.$socket.once('users-response', (users: User[]) => {
        const id = useAuthStore().user?.id;
        this.users = users.filter((u) => u.id !== id);
      });
      this.$socket.emit('users');

      this.$socket.on('joined', (user: User) => {
        this.users.push(user);
      });
      this.$socket.on('left', (username: string) => {
        this.users = this.users.filter((u) => u.username !== username);
      });
    },
    unsubscribe() {
      this.$socket.removeAllListeners('joined');
      this.$socket.removeAllListeners('left');
    },
  },
});
