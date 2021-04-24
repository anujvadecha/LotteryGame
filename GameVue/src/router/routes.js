import Login from "pages/Login";

const routes = [
  {
    path: '/Results',
    name: 'Results',
    component: () => import('pages/Results.vue'),
  },
  {
    path: '/TxnDetails',
    name: 'TxnDetails',
    component: () => import('pages/TxnDetails.vue'),
  },
  {
    path: '/MoreDraws',
    name: 'MoreDraws',
    component: () => import('pages/MoreDraws.vue'),
  },
  {
    path: '/MyAccounts',
    name: 'MyAccounts',
    component: () => import('pages/MyAccounts.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Results.vue') },
      { path: 'SelectionTable/:set',name:'SelectionTable', component: () => import('pages/SelectionTable.vue') ,props: true },
      // { path: 'TransactionDetails/',name:'TransactionDetails', component: () => import('pages/TransactionDetails.vue') ,props: true }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component :Login
  },

  // Always leave this as last one,
  // but you can also remove it

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
