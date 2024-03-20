import ChatView from '@/views/ChatView.vue';
import ErrorView from '@/views/ErrorView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/chat',
    },
    {
      name: 'join',
      path: '/join',
      component: AuthView,
    },
    {
      name: 'chat',
      path: '/chat',
      component: ChatView,
      beforeEnter: () => {
        if (!useAuthStore().user) {
          return { name: 'join' };
        }
      },
    },
    {
      name: 'error',
      path: '/error',
      component: ErrorView,
      props: (to) => ({ codeOrName: to.query.codeOrName, message: to.query.message }),
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: ErrorView,
      props: { codeOrName: 404, message: 'Not found' },
    },
  ],
});

export default router;
