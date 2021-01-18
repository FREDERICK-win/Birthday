const routes = [
  {
    path: '/',
    name: 'guard',
    component: () => import(/* webpackChunkName: "guard" */ '../views/Guard.vue'),
    meta: {
      title: 'mhmm...',
      favicon: 'favicon.ico',
    },
  },
  {
    path: '/astrid',
    name: 'astrid',
    component: () => import(/* webpackChunkName: "secret" */ '../views/Astrid.vue'),
    props: {
      validKeys: ['astrid', 'asse', 'pøllemiss', 'pøllemis', 'pølle mis', 'pølle miss'],
    },
    meta: {
      title: 'Til Astrid fra Frederick',
      favicon: 'gift.ico',
    },
  },
  {
    path: '*',
    name: '404',
    redirect: { name: 'guard' },
  },
];

export default routes;
