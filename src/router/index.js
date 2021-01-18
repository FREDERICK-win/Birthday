import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => { // eslint-disable-line no-unused-vars
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    if (to.meta?.favicon) document.getElementById('favicon').href = to.meta.favicon;
    if (to.meta?.title) document.title = to.meta.title;
  });
});

export default router;
